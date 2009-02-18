(function ({
    add : function(o)
    {
        var t = new qx.ui.tree.TreeFolder(o.getLabel());
        var te=o.getMenuTree();

        for (a in te)
        {
            var tf = new qx.ui.tree.TreeFile( te[a][0] );
            tf.setUserData("theobj",undefined);//o);
            tf.setUserData("ownersId",te[a][1]);
            tf.setUserData("ownerObjRef",this.__getObjRef(o));
            t.add( tf );
        }
    }
}){})();
