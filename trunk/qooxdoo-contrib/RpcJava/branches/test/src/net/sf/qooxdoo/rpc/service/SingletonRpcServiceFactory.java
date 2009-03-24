package net.sf.qooxdoo.rpc.service;

import java.util.Map;

/**
 * Service factory that has a map of service implementations. The map keys is used
 * as service name, the value as implementation.
 *   
 * @author mwyraz
 */
public class SingletonRpcServiceFactory extends AbstractRpcServiceFactory {
    protected Map<String, Object> serviceImplementations;

    public void setServiceImplementations(
	    Map<String, Object> serviceImplementations) {
	this.serviceImplementations = serviceImplementations;
    }

    @Override
    public Object getServiceImplementation(String serviceName) {
	if (serviceImplementations == null)
	    return null;
	return serviceImplementations.get(serviceName);
    }
}
