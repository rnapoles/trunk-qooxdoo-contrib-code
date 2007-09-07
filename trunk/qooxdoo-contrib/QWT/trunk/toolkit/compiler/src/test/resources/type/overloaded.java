package type;

class overloaded {
    public overloaded() {
    }
    public overloaded(int x) {
    }
    public void method(char c) {
    }
    public void method(int i) {
    }
    public static void x() {
    }
    public static void x(int a) {
    }
    public void x(Object a) {
		new overloaded();
		new overloaded(1);

        method('c');
        method(1);

        x();
        x(1);
        x(null);

    }
}
