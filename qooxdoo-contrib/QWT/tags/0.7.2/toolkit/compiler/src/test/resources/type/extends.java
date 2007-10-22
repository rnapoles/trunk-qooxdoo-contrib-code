package type;

class Base {
    int b;
    
    public int getB() {
        return b;
    }
    public int fn() {
        return b * b;
    }
}

class Ext extends Base {
    long e;
    
    public Ext() {
        this(0);
    }
    public Ext(long e) {
        super();
        this.e = e;
    }
    public int get() {
        return getB();
    }
    
    public int fn() {
        return super.fn() + 5;
    }
    public static Ext create() {
        return new Ext();
    }
}