package net.sf.qooxdoo.rpc;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import net.sf.qooxdoo.rpc.convert.DefaultJavaJsonConverter;
import net.sf.qooxdoo.rpc.convert.IJavaJsonConverter;
import net.sf.qooxdoo.rpc.json.JSONArray;
import net.sf.qooxdoo.rpc.json.JSONObject;
import net.sf.qooxdoo.rpc.log.IRpcLogger;
import net.sf.qooxdoo.rpc.log.RpcLogType;
import net.sf.qooxdoo.rpc.log.RpcNullLogger;
import net.sf.qooxdoo.rpc.service.IRpcServiceFactory;

public class RpcHandler implements IRpcLogger {
    
    protected static int ERROR_ORIGIN_SERVER = 1;
    protected static int ERROR_ORIGIN_APPLICATION = 2;

    protected IRpcServiceFactory serviceFactory;
    protected IRpcLogger logger = new RpcNullLogger();
    protected IJavaJsonConverter converter = new DefaultJavaJsonConverter();

    public void setServiceFactory(IRpcServiceFactory serviceFactory) {
	this.serviceFactory = serviceFactory;
    }

    public void setLogger(IRpcLogger logger) {
	this.logger = logger;
    }

    protected boolean inited = false;

    protected void init() {
	if (inited)
	    return;
	if (serviceFactory == null)
	    throw new IllegalArgumentException(
		    "RpcHandler.serviceFactory is null.");
	if (logger == null)
	    throw new IllegalArgumentException("RpcHandler.logger is null.");
	if (converter == null)
	    throw new IllegalArgumentException("RpcHandler.converter is null.");

	inited = true;
    }

    protected Map<String, Method> serviceMethodCache = new HashMap<String, Method>();

    public String handleRequest(String jsonRequestString) throws Exception {
	if (!inited)
	    init();
	JSONObject res = new JSONObject();
	log(RpcLogType.REQUEST_TEXT, jsonRequestString, null);

	JSONObject req = new JSONObject(jsonRequestString);
	Object serviceNameObject = req.get("service");
	String serviceName = null;
	if (!serviceNameObject.equals(null)) {
	    serviceName = serviceNameObject.toString();
	}

	String callId = req.getString("id");
	if (callId != null) {
	    res.put("id", callId);
	}

	try {
	    String methodName = req.getString("method");
	    JSONArray args = req.getJSONArray("params");

	    res.put("result", callCompatibleMethod(serviceName, methodName,
		    args));

	} catch (Throwable e) {
	    log(RpcLogType.RPC_ERROR, "Error handling RPC request", e);
	    res.put("error", convertException(e));
	}

	String jsonResponseString = res.toString();
	log(RpcLogType.RESPONSE_TEXT, jsonResponseString, null);
	return jsonResponseString;
    }

    protected String createServiceMethodCacheKey(String serviceName,
	    String methodName, JSONArray args) {
	StringBuilder sb = new StringBuilder();
	if (serviceName != null)
	    sb.append(serviceName);
	sb.append('.');
	sb.append(methodName);
	final int length = args.length();
	sb.append('(');
	for (int i = 0; i < length; i++) {
	    Object arg = args.get(i);
	    if (i > 0)
		sb.append(',');
	    sb.append(arg == null ? null : arg.getClass().getName());
	}
	sb.append(')');
	return sb.toString();
    }

    protected Object callCompatibleMethod(String serviceName,
	    String methodName, JSONArray args) throws Exception {
	Object serviceImplementation = serviceFactory
		.getServiceImplementation(serviceName);

	String cacheKey = createServiceMethodCacheKey(serviceName, methodName,
		args);
	Method m = serviceMethodCache.get(cacheKey);
	if (m != null)
	    return m;

	Throwable lastError = null;

	final int argCount = args.length();
	final Object[] convertedArgs = new Object[argCount];
	for (Method method : serviceFactory.getServiceMethodCandidates(
		serviceName, methodName, args)) {
	    try {
		for (int i = 0; i < argCount; i++) {
		    convertedArgs[i] = converter.toJava(args.opt(i), method
			    .getParameterTypes()[i], method
			    .getGenericParameterTypes()[i], method
			    .getParameterAnnotations()[i]);
		}
	    } catch (Exception ex) {
		lastError = ex;
		continue;
	    }

	    // conversion ok -> use this method
	    Object result = method.invoke(serviceImplementation, convertedArgs);

	    return converter.fromJava(result, method.getReturnType(), method
		    .getGenericReturnType(), method.getAnnotations());

	}

	if (lastError == null) {
	    throw new NoSuchMethodException(cacheKey);
	}
	throw new IllegalArgumentException(cacheKey + " - "
		+ lastError.getMessage(), lastError);
    }

    /**
     * Generates a JSONObject from an exception (for returning it to the
     * client).
     * 
     * @param error
     *            the exception to convert.
     * 
     * @return the converted exception.
     */
    protected JSONObject convertException(Throwable error) {
	int origin = ERROR_ORIGIN_SERVER;
	if (error instanceof InvocationTargetException) {
	    error = ((InvocationTargetException) error).getTargetException();
	    origin = ERROR_ORIGIN_APPLICATION;
	}
	JSONObject ex = new JSONObject();
	ex.put("origin", origin);
	ex.put("code", 500); // 500: internal server error
	// (executing the method generated
	// an exception)
	// TODO: properly detect common errors
	// like "method not found" and
	// return appropriate codes
	ex.put("message", error.getClass().getName() + ": "
		+ error.getMessage());
	ex.put("class", error.getClass().getName());
	ex.put("origMessage", error.getMessage());
	Throwable cause = error.getCause();
	if (cause != null) {
	    ex.put("cause", convertException(cause));
	}
	return ex;
    }

    ////////////////////////////////////////////////////////////////////////////////
    /////
    ///// Logger delegates
    /////
    ////////////////////////////////////////////////////////////////////////////////

    public boolean isLogEnabled(RpcLogType type) {
	return logger.isLogEnabled(type);
    }

    public void log(RpcLogType type, String message, Throwable exception) {
	logger.log(type, message, exception);
    }

}
