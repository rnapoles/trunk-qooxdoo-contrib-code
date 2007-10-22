touchPackage("type");
type.ifc=function() {
}
defineClass(type.ifc, 'type.ifc', null);
type.ifc.a = 0;
type.ifc.b = 0;
type.ifc.prototype.foo = ABSTRACT;
type.ifc.cinit = function() {
type.ifc.a = 3;
type.ifc.b = 4;
}
touchPackage("type");
type.user=function() {
}
defineClass(type.user, 'type.user', java.lang.Object, type.ifc);
type.user.prototype.A = 0;
type.user.prototype.B = 0;
type.user.prototype.AA = 0;
type.user.prototype.BB = 0;
type.user.prototype.foo = function() {
    return this.foo();
}
type.user.prototype.instanceOf = function() {
    return instanceofInterface(this, type.ifc);
}
type.user.cinit = function() {
type.user.prototype.A = type.ifc.a;
type.user.prototype.B = type.ifc.b;
type.user.prototype.AA = type.ifc.a;
type.user.prototype.BB = type.ifc.b;
}
