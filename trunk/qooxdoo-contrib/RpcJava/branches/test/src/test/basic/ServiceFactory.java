package test.basic;

import net.sf.qooxdoo.rpc.service.AbstractRpcServiceFactory;

public class ServiceFactory extends AbstractRpcServiceFactory
{
    protected ServiceImpl impl=new ServiceImpl();
    
    public Object getServiceImplementation(String serviceName)
    {
        if ("testService".equals(serviceName)) return impl;
        return null;
    }
}
