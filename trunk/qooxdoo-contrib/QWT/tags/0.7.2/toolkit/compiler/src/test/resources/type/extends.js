touchPackage("type");
type.Base=function() {
}
defineClass(type.Base, 'type.Base', java.lang.Object);
type.Base.prototype.b = 0;
type.Base.prototype.getB = function() {
    return this.b;
}
type.Base.prototype.fn = function() {
    return this.b * this.b;
}
touchPackage("type");
type.Ext=function() {
}
defineClass(type.Ext, 'type.Ext', type.Base);
type.Ext.prototype.e = 0;
type.Ext.init = function() {
    type.Ext.init1.call(this, 0);
}
type.Ext.init1 = function(e) {
    type.Base.call(this);
    this.e = e;
}
type.Ext.prototype.get = function() {
    return this.getB();
}
type.Ext.prototype.fn = function() {
    return this.constructor.superclass.prototype.fn.call(this) + 5;
}
type.Ext.create = function() {
    return newObject(type.Ext, type.Ext.init, []);
}
