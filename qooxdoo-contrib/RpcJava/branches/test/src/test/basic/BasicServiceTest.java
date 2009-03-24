package test.basic;

import junit.framework.TestCase;
import net.sf.qooxdoo.rpc.RpcHandler;
import net.sf.qooxdoo.rpc.json.JSONArray;
import net.sf.qooxdoo.rpc.json.JSONObject;
import net.sf.qooxdoo.rpc.log.RpcConsoleLogger;

public class BasicServiceTest extends TestCase
{
    protected RpcHandler rpcHandler;
    
    public BasicServiceTest()
    {
        rpcHandler=new RpcHandler();
        
        RpcConsoleLogger logger=new RpcConsoleLogger();
        logger.setLogRequestText(true);
        logger.setLogResponseText(true);
        rpcHandler.setLogger(logger);
        
        rpcHandler.setServiceFactory(new ServiceFactory());
    }
    
    protected JSONObject request(String method, Object... args) throws Exception
    {
        JSONObject req=new JSONObject();
        req.put("service", "testService");
        req.put("method", method);
        req.put("id", 42);
        
        JSONArray array=new JSONArray();
        for (Object o: args)
        {
            array.put(o);
        }
        req.put("params", array);
        
        return new JSONObject(rpcHandler.handleRequest(req.toString()));
    }
    
    protected void assertResult(Object expected, JSONObject result)
    {
        if (expected==null) expected=JSONObject.NULL;
        assertEquals(expected, result.opt("result"));
    }
    protected void assertError(JSONObject result)
    {
        assertNotNull(result.opt("error"));
    }
    
    public void testHello() throws Exception
    {
        assertResult("Hello World", request("hello"));
        assertResult("Hello Tester", request("hello","Tester"));
    }
    
    public void testBasicTypes() throws Exception
    {
        assertResult(null, request("testVoid"));
        assertResult(42, request("echoPrimitiveInt",42));
        assertResult(42.42d, request("echoPrimitiveDouble",42.42));
        assertResult(42.42d, request("echoPrimitiveFloat",42.42f));
        assertResult(42.42d, request("echoPrimitiveFloat",42.42d));
        assertResult(42, request("echoPrimitiveFloat",42));
        assertResult(42, request("echoPrimitiveByte",42));
        assertResult("x", request("echoPrimitiveChar",'x'));
        assertResult(true, request("echoPrimitiveBoolean",true));

        // longs are strings because the precision in js will cause data loss otherwise
        assertResult("42", request("echoPrimitiveLong",42));
        assertResult(""+Long.MIN_VALUE, request("echoPrimitiveLong",""+Long.MIN_VALUE));
        
        assertError(request("echoPrimitiveInt",(Object) null));
        assertError(request("echoPrimitiveDouble",(Object) null));
        assertError(request("echoPrimitiveFloat",(Object) null));
        assertError(request("echoPrimitiveByte",(Object) null));
        assertError(request("echoPrimitiveChar",(Object) null));
        assertError(request("echoPrimitiveBoolean",(Object) null));
    }

    public void testEnums() throws Exception
    {
	// TODO: implement this test!
	fail("test not implemented!");
    }

    public void testArrays() throws Exception
    {
	// TODO: implement this test!
	fail("test not implemented!");
    }

    public void testMaps() throws Exception
    {
	// TODO: implement this test!
	fail("test not implemented!");
    }
    
    public void testCollections() throws Exception
    {
	// TODO: implement this test!
	fail("test not implemented!");
    }
    
    public void testObjectsNormalMode() throws Exception
    {
	// TODO: implement this test!
	fail("test not implemented!");
    }
    public void testObjectsStrictMode() throws Exception
    {
	// TODO: implement this test!
	fail("test not implemented!");
    }

    public void testGenericCollectionsAndMaps() throws Exception
    {
	// TODO: implement this test!
	fail("test not implemented!");
    }
}
