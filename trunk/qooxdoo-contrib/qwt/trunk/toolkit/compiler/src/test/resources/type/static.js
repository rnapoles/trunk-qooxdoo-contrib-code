touchPackage("type");
type.Foo=function() {
}
defineClass(type.Foo, 'type.Foo', java.lang.Object);
type.Foo.a = 0;
type.Foo.cinit = function() {
type.Foo.a = 3;
{
    type.Foo.a = 0;
}
}
