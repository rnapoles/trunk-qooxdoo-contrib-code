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

  addView:function( vName, vFunc ){
    var v = this.getKey('views');
    if( !v ){ v = {}; this.setKey('views',v); }
    v[vName] = vFunc + "";
  },

  addSort:function( vKey, vType ){
    var f = "function( doc ){";
    if( vType ) f = f + "if( doc.type == '" + vType + "') ";
    f = f + " map(doc." + vKey + " ? doc." + vKey + ":null, doc); }";
    this.addView( vKey, f );
  },

  _fetch:function( vName, vNormal, vJSON ){
    return this.getRequest( '_view/' + this._getDesign() + '/' + vName, vNormal, vJSON );
  },

  fetchInstances:function( vFunc, vTarget, vName, vConstructor ){
    var req = this._fetch( vName );
    req.when('received', function( d ){
      var result = {};
      var rows = d.rows;
      var rowsl = rows.length;
      for( var i=0; i<rowsl; i++ ){
        var row = rows[i];
        if( vConstructor ){
          var rcv = row.value['clazz'];
          if( rcv ){
            rcv = row.value.type + '.' + qx.lang.String.toFirstUp( rcv );
          }else{
            rcv = qx.lang.String.toFirstUp( row.value.type );
          }
          var c = eval(vConstructor + '.' + rcv);
          if( c instanceof Function )
            result[row.id] = new c( row.id, couch.Document.cleanMap( row.value ) );
          else
            this.warn(vConstructor + '.' + rcv + ' is not a valid class!');
        }else{
           result[row.id] = row.value;
        }
      }
      vFunc.call( vTarget, result );
    },this);
    req.send();
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
