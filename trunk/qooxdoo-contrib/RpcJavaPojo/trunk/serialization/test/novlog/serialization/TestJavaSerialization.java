/*
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
 */

package novlog.serialization;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.*;

public class TestJavaSerialization {
    JavaSerializer serializer = null;

    @Before
    public void createSerializer() {
        serializer = new JavaSerializer();
        serializer.setFieldNamesToExcludeFromSerialization(new ArrayList<String>(1) {
            {
                add("age");
            }
        });
        //serializer.setFieldPatternToExcludeFromSerialization("coun.*");
    }


    @Test
    public void serializeNull() {
        Object res = new Object();
        try {
            res = serializer.serialize(null);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNull(res);
    }

    @Test
    public void unserializeNull() {
        Object res = null;
        try {
            res = serializer.unserialize(null, Person.class);
        } catch (UnserializationException e) {
            Assert.fail(e.getMessage());
        }
        Assert.assertNull(res);


        try {
            res = serializer.unserialize(null, Integer.TYPE);
            Assert.fail("An expected UnserializationException was not raised");
        } catch (UnserializationException e) {
            if (e.getMessage().startsWith("Cannot assign null to primitive type")) {
                // Intended exception. Nothing to do.
            } else {
                Assert.fail(e.getMessage());
            }
        }
    }

    @Test
    public void serializePrimitive() {
        int i = 42;
        char c = 'w';

        Object iser = null;
        Object cser = null;
        try {
            iser = serializer.serialize(i);
            cser = serializer.serialize(c);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertTrue(iser instanceof Integer);
        Assert.assertEquals(42, iser);
        Assert.assertEquals('w', cser);
        Assert.assertTrue(cser instanceof Character);

    }

    @Test
    public void serialization() {
        String s = ""; // TODO cas tordus ...
        Object sser = null;

        try {
            sser = serializer.serialize(s);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }
        Assert.assertTrue(sser instanceof String);
        Assert.assertTrue("".equals(sser));
    }

    @Test
    public void unserializePrimitive() {
        int i = 42;
        boolean b = false;

        Integer iUnser = 53;
        boolean bUnser = true;

        try {
            iUnser = serializer.unserialize(i, Integer.class);
            bUnser = serializer.unserialize(b, Boolean.TYPE);
        } catch (UnserializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertTrue(iUnser instanceof Integer);
        Assert.assertEquals(iUnser, (Integer) 42);
        Assert.assertEquals(bUnser, false);

    }

    @Test
    public void serializeArray() {
        Object[] array = new Object[3];
        array[0] = "elt1";
        array[1] = null;
        array[2] = 42;

        Object res = null;
        try {
            res = serializer.serialize(array);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(res);
        Assert.assertTrue(res instanceof List);
        List resList = (List) res;
        Assert.assertEquals(3, resList.size());
        Assert.assertEquals("elt1", resList.get(0));
        Assert.assertEquals(null, resList.get(1));
        Assert.assertEquals(42, resList.get(2));
    }

    @Test
    public void unserializeArray() {
        List<Object> toUnsrlz = new ArrayList<Object>();
        toUnsrlz.add(42);
        toUnsrlz.add(53);

        Double[] res = null;
        try {
            res = serializer.unserialize(toUnsrlz, Double[].class);
        } catch (UnserializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(res);
        Assert.assertEquals(2, res.length);
        Assert.assertEquals((Double) 42d, res[0]);
        Assert.assertEquals((Double) 53d, res[1]);
    }

    @Test
    public void serializeObject() {
        Person homer = new Person("Homer", true, 3);

        Person bart = new Person("Bart", false, 0);
        Person lisa = new Person("Lisa", false, 0);
        Person maggie = new Person("Maggie", false, 0);

        homer.addChild(bart);
        homer.addChild(lisa);
        homer.addChild(maggie);


        Object res = null;
        try {
            res = serializer.serialize(homer);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertTrue(res instanceof Map);
        Map mapRes = (Map) res;
        Assert.assertEquals("Homer", mapRes.get("name"));
        Assert.assertEquals(true, mapRes.get("married"));
        Assert.assertEquals(3, mapRes.get("numberOfChildren"));

        Assert.assertTrue(mapRes.get("children") instanceof List);
        List children = (List) mapRes.get("children");
        Assert.assertTrue(children.size() == 3);

        Assert.assertTrue(children.get(0) instanceof Map);
        Map bartMap = (Map) children.get(0);
        Assert.assertEquals("Bart", bartMap.get("name"));
        Assert.assertEquals(false, bartMap.get("married"));
        Assert.assertEquals(0, bartMap.get("numberOfChildren"));
        Assert.assertNotNull(bartMap.get("children"));
        Assert.assertTrue(bartMap.get("children") instanceof List);
        List bartChildren = (List) (bartMap.get("children"));
        Assert.assertTrue(bartChildren.size() == 0);

        Assert.assertTrue(children.get(1) instanceof Map);
        Map lisaMap = (Map) children.get(1);
        Assert.assertEquals("Lisa", lisaMap.get("name"));
        Assert.assertEquals(false, lisaMap.get("married"));
        Assert.assertEquals(0, lisaMap.get("numberOfChildren"));
        Assert.assertNotNull(lisaMap.get("children"));
        Assert.assertTrue(lisaMap.get("children") instanceof List);
        List lisaChildren = (List) (lisaMap.get("children"));
        Assert.assertTrue(lisaChildren.size() == 0);

        Assert.assertTrue(children.get(2) instanceof Map);
        Map maggieMap = (Map) children.get(2);
        Assert.assertEquals("Maggie", maggieMap.get("name"));
        Assert.assertEquals(false, maggieMap.get("married"));
        Assert.assertEquals(0, maggieMap.get("numberOfChildren"));
        Assert.assertNotNull(maggieMap.get("children"));
        Assert.assertTrue(maggieMap.get("children") instanceof List);
        List maggieChildren = (List) (maggieMap.get("children"));
        Assert.assertTrue(maggieChildren.size() == 0);

        System.out.println(mapRes);
    }

    @Test
    public void unserializeObject() {
        Map<String, Object> homer = new HashMap<String, Object>();
        homer.put("name", "Homer");
        homer.put("numberOfChildren", 3);
        homer.put("married", true);

        Map<String, Object> bart = new HashMap<String, Object>();
        bart.put("name", "Bart");
        bart.put("numberOfChildren", 0);
        bart.put("married", false);

        Map<String, Object> lisa = new HashMap<String, Object>();
        lisa.put("name", "Lisa");
        lisa.put("numberOfChildren", 0);
        lisa.put("married", false);

        Map<String, Object> maggie = new HashMap<String, Object>();
        maggie.put("name", "Maggie");
        maggie.put("numberOfChildren", 0);
        maggie.put("married", false);

        List<Object> childrenList = new LinkedList<Object>();
        childrenList.add(bart);
        childrenList.add(lisa);
        childrenList.add(maggie);
        homer.put("children", childrenList);

        Person p = null;
        try {
            p = serializer.unserialize(homer, Person.class);
        } catch (UnserializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(p);
        Assert.assertEquals("Homer", p.getName());
        Assert.assertEquals(true, p.isMarried());
        Assert.assertEquals(3, (int) p.getNumberOfChildren());
        Assert.assertNotNull(p.getChildren());
        Assert.assertTrue(p.getChildren().size() == 3);

        Person child1 = p.getChildren().get(0);
        Assert.assertEquals("Bart", child1.getName());
        Assert.assertEquals(false, child1.isMarried());
        Assert.assertTrue(child1.getNumberOfChildren() == 0);
        Assert.assertNotNull(child1.getChildren());
        Assert.assertTrue(child1.getChildren().size() == 0);

        Person child2 = p.getChildren().get(1);
        Assert.assertEquals("Lisa", child2.getName());
        Assert.assertEquals(false, child2.isMarried());
        Assert.assertTrue(child2.getNumberOfChildren() == 0);
        Assert.assertNotNull(child2.getChildren());
        Assert.assertTrue(child2.getChildren().size() == 0);

        Person child3 = p.getChildren().get(2);
        Assert.assertEquals("Maggie", child3.getName());
        Assert.assertEquals(false, child3.isMarried());
        Assert.assertTrue(child3.getNumberOfChildren() == 0);
        Assert.assertNotNull(child3.getChildren());
        Assert.assertTrue(child3.getChildren().size() == 0);
    }

    @Test
    public void serializeList() {
        List<Object> list = new ArrayList<Object>();
        Object res = null;

        try {
            res = serializer.serialize(list);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(res);
        Assert.assertTrue(res instanceof List);
        List resList = (List) res;
        Assert.assertEquals(0, resList.size());

        list.add("elt1");
        list.add(2);
        try {
            res = serializer.serialize(list);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(res);
        Assert.assertTrue(res instanceof List);
        resList = (List) res;
        Assert.assertEquals(2, resList.size());
        Assert.assertEquals("elt1", resList.get(0));
        Assert.assertEquals(2, resList.get(1));
    }

    @Test
    public void serializeSet() {
        Set<Object> set = new HashSet<Object>();
        Object res = null;

        try {
            res = serializer.serialize(set);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(res);
        Assert.assertTrue(res instanceof List);
        List resList = (List) res;
        Assert.assertEquals(0, resList.size());

        set.add("elt1");
        set.add(2);
        try {
            res = serializer.serialize(set);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(res);
        Assert.assertTrue(res instanceof List);
        resList = (List) res;
        Assert.assertEquals(2, resList.size());
        Assert.assertTrue(resList.contains("elt1"));
        Assert.assertTrue(resList.contains(2));
    }

    @Test
    public void serializeMap() {
        Map<String, Person> map = new HashMap<String, Person>();
        Person homer = new Person("Homer", true, 3);
        map.put("Homer", homer);

        Object res = null;
        try {
            res = serializer.serialize(map);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(res);
        Assert.assertTrue(res instanceof Map);
        Map<String, Object> mapRes = (Map<String, Object>) res;
        Assert.assertEquals(1, mapRes.size());
        Assert.assertNotNull(mapRes.get("Homer"));
        Assert.assertTrue(mapRes.get("Homer") instanceof HashMap);
        HashMap<String, Object> mapHomer = (HashMap<String, Object>) mapRes.get("Homer");
        Assert.assertEquals("Homer", mapHomer.get("name"));
        Assert.assertEquals(true, mapHomer.get("married"));
        Assert.assertEquals(3, mapHomer.get("numberOfChildren"));
    }

    @Test
    public void serializeAndDeserializeClassForTestInstance() {
        serUnser(null);

        final ClassForTest t2 = new ClassForTest();
        serUnser(t2);

        ClassForTest t = new ClassForTest();
        serUnser(t);

        t.number = null;
        serUnser(t);
        t.number = NB.one;
        serUnser(t);
        t.number = NB.three;
        serUnser(t);

        t.primitiveInt = -1;
        serUnser(t);
        t.primitiveInt = Integer.MIN_VALUE;
        serUnser(t);
        t.primitiveInt = Integer.MAX_VALUE;
        serUnser(t);

        t.objectInt = null;
        serUnser(t);
        t.objectInt = -1;
        serUnser(t);
        t.objectInt = Integer.MIN_VALUE;
        serUnser(t);
        t.objectInt = Integer.MAX_VALUE;
        serUnser(t);

        t.objectFloat = null;
        serUnser(t);
        t.objectFloat = -1f;
        serUnser(t);
        t.objectFloat = Float.MIN_VALUE;
        serUnser(t);
        t.objectFloat = Float.MAX_VALUE;
        serUnser(t);

        t.primitiveFloat = -1f;
        serUnser(t);
        t.primitiveFloat = Float.MIN_VALUE;
        serUnser(t);
        t.primitiveFloat = Float.MAX_VALUE;
        serUnser(t);

        t.stringSet = null;
        serUnser(t);
        t = new ClassForTest();

        t.stringList = null;
        serUnser(t);
        t = new ClassForTest();

        t.stringsMap = null;
        serUnser(t);
        t = new ClassForTest();

        t.selfArray = null;
        serUnser(t);
        t = new ClassForTest();

        t.selfList = null;
        serUnser(t);
        t = new ClassForTest();

        ClassForTest.staticString = null;
        serUnser(t);
        ClassForTest.staticString = "";
        serUnser(t);
        ClassForTest.staticString = "Novlog !";
        serUnser(t);
    }

    private void serUnser(final ClassForTest originalInstance) {
        Object ser = null;
        try {
            ser = serializer.serialize(originalInstance);
        } catch (SerializationException e) {
            Assert.fail(e.getMessage());
        }
        if (originalInstance != null) {
            Assert.assertNotNull(ser);
        }
        ClassForTest unser = null;
        try {
            unser = serializer.unserialize(ser, ClassForTest.class);
        } catch (UnserializationException e) {
            Assert.fail(e.getMessage());
        }
        Assert.assertEquals(originalInstance, unser);
    }
}