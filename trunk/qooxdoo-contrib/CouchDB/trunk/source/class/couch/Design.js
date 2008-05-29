qx.Class.define("couch.Design",{
extend: couch.Document,

////////////////////////////////////////
construct:function( vName, vDatabase ){
////////////////////////////////////////

  this.base( arguments, '_design/' + vName, vDatabase );
  this.setKey( 'views', {} );
  this._setDesign( vName );

//////////////
},properties:{
//////////////

 _design: {check: 'String', nullable: false}

///////////
},members:{
///////////

  /** add a view to this design-document.
    @param vName {String} name of the view.
    @param fMap  {Function} function to execute for each document.
    @param fReduce {Function} function to execute for each key.    
  **/
  addView:function( vName, fMap, fReduce ){
    var v = this.getKey('views');
    if( !v ){ v = {}; this.setKey('views',v); }        
    v[vName] = {map: fMap + "" };
    if( fReduce ) v[vName].reduce = fReduce + "";
  },
  
  _fetch:function( vName, vNormal, vJSON ){
    return this.getRequest( '_view/' + this._getDesign() + '/' + vName, vNormal, vJSON );
  },


  /** fetch rows for a specified view in this design.
    @param vFunc1 {Function} called with the row-data as only parameter
    @param vFunc2 {Function} called with the total-rows-count as only parameter
    @param vTarget {Object} target of execution
    @param vName  {String} name of the view
    @param vNormal {Map} map of normally escaped parameters
    @param vJSON {Map} map of json escaped parameters
  **/
  fetchRows:function( vFunc1, vFunc2, vTarget, vName, vNormal, vJSON ){
    var req = this._fetch( vName, vNormal, vJSON );
    req.when('received', function( d ){
     if( vFunc1 ) vFunc1.call(vTarget, d.rows.map( function(e){
       e.value.id = e.id; return e.value
     }));
     if( vFunc2 ) vFunc2.call(vTarget, d.total_rows);
    });
    req.send();
  },
  
  /** fetch only the total row count for a specified view in this design.
    @param vFunc {Function} called with the total-rows-count as only parameter
    @param vTarget {Object} target of execution
    @param vName  {String} name of the view
  **/

  fetchTotal:function( vFunc, vTarget, vName ){
    this.fetchRows( null, vFunc, vTarget, vName, {count: 0} );
  },
  
  /** fetch a selection of rows for a specified view in this design.
    @param vFunc {Function} called with the row-data as only parameter
    @param vFunc2 {Function} called with the total-rows-count as only parameter
    @param vTarget {Object} target of execution
    @param vName  {String} name of the view
    @param vFrom   {Integer} first row to return
    @param vTo    {Integer} last row to return
    @param vDesc  {Boolean} wether the result should be descending
  **/  

  fetchLimit:function( vFunc, vFunc2, vTarget, vName, vFrom, vTo, vDesc ){
    var options = {skip: vFrom, count: vTo - vFrom};
    if( vDesc ) options['descending'] = true;
    this.fetchRows( vFunc, vFunc2, vTarget, vName, options, {}, vFunc2 );
  },
  
  /** fetch all rows associated with a key for a specified view in this design.
    @param vFunc1 {Function} called with the row-data as only parameter
    @param vFunc2 {Function} called with the total-rows-count as only parameter
    @param vTarget {Object} target of execution
    @param vName  {String} name of the view
    @param vKey  {Object} the associated key
  **/  

  fetchKey:function( vFunc1, vFunc2, vTarget, vName, vKey ){
    this.fetchRows( vFunc1, vFunc2, vTarget, vName, {}, {key: vKey} );
  }


////
}});
////
