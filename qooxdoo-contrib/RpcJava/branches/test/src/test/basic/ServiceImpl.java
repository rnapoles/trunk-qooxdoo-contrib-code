package test.basic;

public class ServiceImpl
{
    public String hello()
    {
        return "Hello World";
    }
    public String hello(String name)
    {
        return "Hello "+name;
    }
    
    public void testVoid()
    {
    }
    public int echoPrimitiveInt(int value)
    {
        return value;
    }
    public double echoPrimitiveDouble(double value)
    {
        return value;
    }
    public float echoPrimitiveFloat(float value)
    {
        return value;
    }
    public byte echoPrimitiveByte(byte value)
    {
        return value;
    }
    public long echoPrimitiveLong(long value)
    {
        return value;
    }
    public char echoPrimitiveChar(char value)
    {
        return value;
    }
    public boolean echoPrimitiveBoolean(boolean value)
    {
        return value;
    }
}
