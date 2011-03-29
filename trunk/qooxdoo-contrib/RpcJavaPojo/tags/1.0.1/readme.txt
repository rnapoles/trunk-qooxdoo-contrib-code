Java JSON RPC
RPC Java POJO by Novlog
http://www.novlog.com

This library is dual-licensed under the GNU Lesser General Public License (LGPL) and the Eclipse Public License (EPL).
Check http://qooxdoo.org/license

This library is also licensed under the Apache license.
Check http://www.apache.org/licenses/LICENSE-2.0

Contribution:
This contribution is provided by Novlog company.
http://www.novlog.com

Authors (alphabetical order):
Loic BRESSON
Jean-Baptiste BRIAUD

----------------------------------------------------------------

What is it for and how to use it ?
This Java library contains 2 differents sub library (could be used and packaged separately if needed).
One for Java -> JSON serialization and JSON -> Java deserialization.
One for RPC from Qooxdoo JSON RPC. See http://qooxdoo.org/documentation/1.0/rpc

Serialization compile without RPC but RPC need serialization as a dependency.

The serialization process is based on attributes introspection.
No need to add extra getter/setter only for serialization.
Keep your classes as clean as possible.

To forbid serialization of an atribute, just use the Java transient standard keyword where needed for the classes.
http://en.wikibooks.org/wiki/Java_Programming/Keywords/transient

Important note : you may not have access to the source code of classes you want to serialize.
In that case, transient keyword is not a solution for you but see later for a way to do that.

This serialization had been designed in a context where data come from a DB, then to a qooxdoo screen and then to a DB,
in other words, a business application.

You can have a getAge() method that doesn't correspond to an attribute and serialization ill not call it wasting CPU time.
In that case, if you still want to pass the age even if it is not an attribute, use the dynamic mechanism explained later.

Serialization works in 2 steps :
1.1. from Java to a Map of attribute name / attribute value.
1.2. from that map to JSON

This is also true for deserialization :
2.1. from JSON to a Map of attribute name / attribute value.
2.2. from that map to Java

You can have access to that process and hook it up so you can add/remove or even rename attributes in the map.

Why is it powerful ?

Adding an attribute at step 2.1 is really powerful.
You can add a Java technical attribute that won't be seen on client side.
For example, you can use that to pass a persistent context to all the controller's method.
This will allow you to manage at a Java generic level all the persistence order like commit,
rollback in case of error and even to call several controller's method passing away the context,
in order to ensure all theses calls are in the same DB transaction.

Removing an attribute at step 2.1 can be powerful too.
Depending on the persistence framework you are using (we, at Novlog, are using OpenJPa),
it can be very important not to serialize unretreived attributes.
By "unretreived" I mean attribute that was not read from DB.
No need to consume network bandwidth with all that null values
(attribute name take one byte each letter before an optional gz compression).
So, coupled with your persistence framework, you can remove all unretreived attributes from serialization.

Another usage of removing attribute at step 2.1 is when you don't have access to the source code of the class you want to serialize.
Instead of using transient very efficient (compile-time) way to ell witch attribute you don't want,
you can do it at the expense of the CPU (run-time) by removing attribute in the map.

No need to give example of a class to serialize, there absolutly nothing to do,
except transient keyword, but you could had used it without using our lib.

How to code a Controller ?
A Controller is a class that hodl methods to called remotly.
Like OO design advice you to do so or web services or even SOA magic powder,
a Controller allow you to group RPC method by business common point. CustomerController for example.

import java.rmi.Remote;
import java.rmi.RemoteException;

public class CustomerController implements Remote {

   public Customer[] methodTemplate(final ControllerContext cc, ANY OTHER PARAM YOU WANT) throws RemoteException {}
}


Now some config :
Ammend web.xml for the novlog.rpc.JsonRpcServlet.

Nothing more to do if you don't need the dynamic way of filtering attributes.

If you want to dynamically filter map of attributes, you'll have to subclass novlog.rpc.JsonRpcServlet.

In that subclass, one way to always exclude some attribute is to override the doGetJavaSerializer() method.
This method is a factory for the Java serializer.

   @Override
   protected JavaSerializer doGetJavaSerializer() {
       final List<String> excludeFromSerialization = new ArrayList<String>() {
           {
               add("pcInheritedFieldCount");
               add("pcFieldNames");
               add("pcFieldTypes");
               add("pcFieldFlags");
               add("pcPCSuperclass");
               add("pcVersionInit");
               add("serialVersionUID");
               add("READ_WRITE_OK");
               add("LOAD_REQUIRED");
               add("READ_OK");
               add("CHECK_READ");
               add("MEDIATE_READ");
               add("CHECK_WRITE");
               add("MEDIATE_WRITE");
               add("SERIALIZABLE");
               add("DESERIALIZED");
           }
       };

       return  new JavaSerializer(excludeFromSerialization, "^class\\$L.*", null, null);
   }

Here we asked to always remove READ_OK attribute for example.
We also ask to always remove attributes that match the following regex : "^class\\$L.*".

Note : we ask (at run-time) to *always* remove thoses attributes. This method is called only once by the lib.

Then, there is also a way to ask for some removal but not always. Here how to do it.
You have to override the handleRPC method.
Here is an example.

   @Override
   protected String handleRPC(final HttpServletRequest request, final String requestString) throws ServletException {

       final ControllerContext cc = new ControllerContext();

       String result = null;
       try {
           final Map<String, Object> requestMap = extractRequestMap(requestString);
           // Here is the intermediate map you can modfy as you want before Controller's execution

           Map<String, Object> responseIntermediateObject;

           try {
           	// You can pass as many parameters as you want on this method. Only requestMap is requested.
           	// The rest represent any other extra parameter on the controller's method.
           	// So, here, ControllerContext is pass to the controller's method but doesn't came from JSON.
               final Object methodResult = executeRequest(requestMap, cc);

               responseIntermediateObject = buildResponse(requestMap, methodResult, cc.getAllFields());
           } catch (RpcException e) {
               responseIntermediateObject = buildResponse(requestMap, e);
           } catch (RemoteException e) {
               responseIntermediateObject = buildResponse(requestMap, e);
           }

           result = jsonSerializer.serialize(responseIntermediateObject);

       } finally {
           cc.close();
       }
       return result;
   }