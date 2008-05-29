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

//////////
},events:{
//////////

  'rows': 'qx.type.DataEvent',
  'offset': 'qx.type.DataEvent',
  'data': 'qx.type.DataEvent',
  'total': 'qx.type.DataEvent'

///////////
},members:{
///////////

  addView:function( vName, fMap, fReduce ){
    var v = this.getKey('views');
    if( !v ){ v = {}; this.setKey('views',v); }        
    v[vName] = {map: fMap + "" };
    if( fReduce ) v[vName].reduce = fReduce + "";
  },

  _fetch:function( vName, vNormal, vJSON ){
    return this.getRequest( '_view/' + this._getDesign() + '/' + vName, vNormal, vJSON );
  },


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

  fetchTotal:function( vFunc, vTarget, vName ){
    this.fetchRows( null, vFunc, vTarget, vName, {count: 0} );
  },

  fetchLimit:function( vFunc, vFunc2, vTarget, vName, vFrom, vTo, vDesc ){
    var options = {skip: vFrom, count: vTo - vFrom};
    if( vDesc ) options['descending'] = true;
    this.fetchRows( vFunc, vFunc2, vTarget, vName, options, {}, vFunc2 );
  },

  fetchKey:function( vFunc1, vFunc2, vTarget, vName, vKey, vFrom, vTo ){
    this.fetchRows( vFunc1, vFunc2, vTarget, vName, {skip: vFrom, count: vTo - vFrom }, {key: vKey} );
  }


////
}});
////
