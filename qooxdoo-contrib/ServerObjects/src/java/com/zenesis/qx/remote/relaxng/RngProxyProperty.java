package com.zenesis.qx.remote.relaxng;

import org.relaxng.datatype.Datatype;

import com.sun.msv.datatype.xsd.XSDatatype;
import com.zenesis.qx.remote.AbstractProxyProperty;
import com.zenesis.qx.remote.MetaClass;
import com.zenesis.qx.remote.Proxied;
import com.zenesis.qx.remote.ProxyEvent;
import com.zenesis.qx.remote.annotations.Remote;

public class RngProxyProperty extends AbstractProxyProperty {
	
	private final Datatype datatype;
	private final RngProxyType proxyType;
	
	public RngProxyProperty(String name, Datatype datatype) {
		super(name);
		this.datatype = datatype;
		proxyType = null;
		Class clazz = null;
		if (datatype instanceof XSDatatype) {
			XSDatatype xsdt = (XSDatatype)datatype;
			clazz = xsdt.getJavaObjectType();
		}
		if (clazz == null)
			clazz = String.class;
		
		propertyClass = new MetaClass(clazz);
	}

	public RngProxyProperty(String name, RngProxyType proxyType) {
		super(name);
		this.proxyType = proxyType;
		datatype = null;
		propertyClass = new MetaClass(Instance.class, proxyType);
	}

	/* (non-Javadoc)
	 * @see com.zenesis.qx.remote.ProxyProperty#getValue(com.zenesis.qx.remote.Proxied)
	 */
	@Override
	public Object getValue(Proxied proxied) {
		Object value = ((Instance)proxied).getValue(getName());
		return value;
	}

	/* (non-Javadoc)
	 * @see com.zenesis.qx.remote.ProxyProperty#setValue(com.zenesis.qx.remote.Proxied, java.lang.Object)
	 */
	@Override
	public void setValue(Proxied proxied, Object value) {
		((Instance)proxied).setValue(getName(), value);
	}

	/* (non-Javadoc)
	 * @see com.zenesis.qx.remote.ProxyProperty#expire(com.zenesis.qx.remote.Proxied)
	 */
	@Override
	public void expire(Proxied proxied) {
		// Nothing
	}

	/**
	 * @param sync the sync to set
	 */
	public void setSync(Remote.Sync sync) {
		this.sync = sync;
	}

	/**
	 * @param onDemand the onDemand to set
	 */
	public void setOnDemand(boolean onDemand) {
		this.onDemand = onDemand;
	}

	/**
	 * @param event the event to set
	 */
	public void setEvent(ProxyEvent event) {
		this.event = event;
	}

	/**
	 * @param nullable the nullable to set
	 */
	public void setNullable(boolean nullable) {
		this.nullable = nullable;
	}

	/**
	 * @param sendExceptions the sendExceptions to set
	 */
	public void setSendExceptions(Boolean sendExceptions) {
		this.sendExceptions = sendExceptions;
	}

	/**
	 * @param readOnly the readOnly to set
	 */
	public void setReadOnly(Boolean readOnly) {
		this.readOnly = readOnly;
	}

	/**
	 * @param propertyClass the propertyClass to set
	 */
	public void setPropertyClass(MetaClass propertyClass) {
		this.propertyClass = propertyClass;
	}

	/**
	 * @return the datatype
	 */
	public Datatype getDatatype() {
		return datatype;
	}

	/**
	 * @return the proxyType
	 */
	public RngProxyType getProxyType() {
		return proxyType;
	}


}
