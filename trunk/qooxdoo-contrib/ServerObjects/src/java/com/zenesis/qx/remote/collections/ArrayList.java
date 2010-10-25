package com.zenesis.qx.remote.collections;

/*
import com.zenesis.qx.event.EventManager;
import com.zenesis.qx.remote.CommandId;
import com.zenesis.qx.remote.CommandQueue;
import com.zenesis.qx.remote.ProxyManager;
import com.zenesis.qx.remote.ProxyProperty;
import com.zenesis.qx.remote.ProxySessionTracker;
import com.zenesis.qx.remote.ProxyType;
import com.zenesis.qx.remote.ProxyTypeManager;
import com.zenesis.qx.remote.RequestHandler;
*/

/**
 * Provides an implementation of ArrayList which monitors changes to the array
 * and queues them for serialisation to the client via ProxyManager 
 * 
 * @author John Spackman
 */
public class ArrayList extends java.util.ArrayList {

	/*
	private void change(ArrayChanges.Type changeType, Object change) {
		ProxySessionTracker tracker = ProxyManager.getTracker();
		if (tracker == null)
			return;
		CommandQueue queue = tracker.getQueue();
		RequestHandler handler = tracker.getRequestHandler();
		if (handler != null && handler.isEditingCollection(this))
			return;
		ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(keyObject.getClass());
		ProxyProperty property = type.getProperty(propertyName);
		if (property.isOnDemand())
			queue.queueCommand(CommandId.CommandType.EXPIRE, keyObject, propertyName, null);
		else
			queue.queueCommand(CommandId.CommandType.SET_VALUE, keyObject, propertyName, newValue);
		if (property.getEvent() != null)
			EventManager.getInstance().fireDataEvent(keyObject, property.getEvent().getName(), newValue);
	}
	*/
}
