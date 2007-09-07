touchPackage("type");
type.enm=function() {
}
defineClass(type.enm, 'type.enm', java.lang.Enum);
type.enm.A = new type.enm();
type.enm.B = new type.enm();
type.enm.cinit = function() {
{
    var x;
    x = type.enm.A;
    if (x === type.enm.B) {
        x = type.enm.A;
    }
}
}
touchPackage("type");
type.enm2=function() {
}
defineClass(type.enm2, 'type.enm2', java.lang.Enum);
type.enm2.A = new type.enm2(1);
type.enm2.B = new type.enm2(2);
type.enm2.prototype.a = 0;
type.enm2.init2 = function(a) {
    this.a = a;
}
type.enm2.prototype.getA = function() {
    return this.a;
}
