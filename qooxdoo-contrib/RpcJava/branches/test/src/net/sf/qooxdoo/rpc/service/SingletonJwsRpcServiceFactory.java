package net.sf.qooxdoo.rpc.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.jws.WebService;

/**
 * Service factory that has a list of service implementations that implement
 * exactly one interface containing a WebService annotation. The WebService's name
 * will be used as service name.
 *   
 * @author mwyraz
 */
public class SingletonJwsRpcServiceFactory extends AbstractJwsRpcServiceFactory {
    protected Map<String, Object> serviceImplementations;

    public void setServiceImplementations(Set<Object> serviceImplementations) {
	this.serviceImplementations = new HashMap<String, Object>();
	for (Object impl : serviceImplementations) {
	    Class<?> wsInterface = getServiceClass(impl);
	    String serviceName = wsInterface.getAnnotation(WebService.class)
		    .name();
	    if (serviceName.length() == 0)
		throw new IllegalArgumentException(
			"No service name on interface " + wsInterface.getName());
	    this.serviceImplementations.put(serviceName, impl);
	}
    }

    @Override
    public Object getServiceImplementation(String serviceName) {
	if (serviceImplementations == null)
	    return null;
	return serviceImplementations.get(serviceName);
    }
}
