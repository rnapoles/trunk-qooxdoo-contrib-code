package type;

interface ifc {
    public static final int a = 3;
    long b = 4;
    int foo();
}

class user implements ifc {
    int A = ifc.a;
    long B = ifc.b;
    int AA = a;
    long BB = b;
    
    public int foo() {
        return foo();
    }
    public boolean instanceOf() {
        return this instanceof ifc;
    }
}