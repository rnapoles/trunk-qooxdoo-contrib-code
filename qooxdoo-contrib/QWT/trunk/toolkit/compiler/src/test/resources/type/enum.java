package type;

enum enm {
    A, B;
    
    static {
        enm x;
        
        x = A;
        if (x == enm.B) {
            x = A;
        }
    }
}

enum enm2 {
    A(1), B(2);

    private int a;
    
    private enm2(int a) {
        this.a = a;
    }

    public int getA() {
        return a;
    }
}
