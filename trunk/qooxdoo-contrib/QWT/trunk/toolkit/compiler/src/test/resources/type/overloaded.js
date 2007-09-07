touchPackage("type");
type.overloaded=function() {
}
defineClass(type.overloaded, 'type.overloaded', java.lang.Object);
type.overloaded.init = function() {
}
type.overloaded.init1 = function(x) {
}
type.overloaded.prototype.method = function(c) {
}
type.overloaded.prototype.method1 = function(i) {
}
type.overloaded.x = function() {
}
type.overloaded.x1 = function(a) {
}
type.overloaded.prototype.x2 = function(a) {
    newObject(type.overloaded, type.overloaded.init, []);
    newObject(type.overloaded, type.overloaded.init1, [1]);
    this.method(99);
    this.method1(1);
    type.overloaded.x();
    type.overloaded.x1(1);
    this.x2(null);
}
