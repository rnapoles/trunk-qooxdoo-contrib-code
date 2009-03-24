package net.sf.qooxdoo.rpc.servlet;

/**
 * Container interface that holds a service instance.
 * This is to separate the factory from HttpServletSession
 *  
 * @author mwyraz
 */
public interface IServiceInstanceContainer {
    public Object getServiceInstance(String name);
    public void putServiceInstance(String name, Object instance);
}
