package services;

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006-2007 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Andreas Junghans (lucidcake)

************************************************************************ */

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TestController implements Remote {

    public String echo(String input) throws RemoteException {
        return "Client said: " + input;
    }

    public String sleep(String seconds) throws RemoteException {
        try {
            Thread.sleep(Integer.parseInt(seconds) * 1000);
        } catch (InterruptedException e) {
            // ignore
        }
        return seconds;
    }

    public Map getCurrentTimestamp() throws RemoteException {
        Map retVal = new HashMap();
        retVal.put("now", new Long(System.currentTimeMillis()));
        retVal.put("json", new Date());
        return retVal;
    }

    public int getInteger() throws RemoteException {
        return 1;
    }

    public boolean isInteger(int param) throws RemoteException {
        return true;    // if we get here, we are guaranteed to have
        // an integer
    }

    public String getString() throws RemoteException {
        return "Hello world";
    }

    public boolean isString(String param) throws RemoteException {
        return (param != null);
    }

    public Object getNull() throws RemoteException {
        return null;
    }

    public boolean isNull(Object param) throws RemoteException {
        return (param == null);
    }

    public int[] getArrayInteger() throws RemoteException {
        return new int[]{1, 2, 3, 4};
    }

    public String[] getArrayString() throws RemoteException {
        return new String[]{"one", "two", "three", "four"};
    }

    public boolean isArray(Object[] array) throws RemoteException {
        return true;    // if we get here, we are guaranteed to have an
        // array
    }

    public double getFloat() throws RemoteException {
        return 1.0 / 3;
    }

    public boolean isFloat(double param) throws RemoteException {
        return true;
    }

    public boolean getTrue() throws RemoteException {
        return true;
    }

    public boolean getFalse() throws RemoteException {
        return false;
    }

    public boolean isBoolean(boolean param) throws RemoteException {
        return true;
    }

    public Object getParam(Object param) throws RemoteException {
        return param;
    }

    public Object[] getParams(Object param1, Object param2, Object param3,
                              Object param4, Object param5, Object param6,
                              Object param7, Object param8) throws RemoteException {

        return new Object[]{param1, param2, param3, param4, param5, param6,
                param7, param8};
    }

    public Object[] getParams(Object param1) throws RemoteException {
        return new Object[]{param1};
    }

    public Object[] getParams(Object param1, Object param2) throws RemoteException {
        return new Object[]{param1, param2};
    }

    public void getError() throws RemoteException {
        throw new RemoteException("Demo error");
    }

    public Object getObject() throws RemoteException {
        return new Object();    // an arbitrary object
    }

    public boolean isObject(Object param) throws RemoteException {
        return (param != null);
    }

}
