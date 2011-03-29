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

import org.json.JSONException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.*;

public class TestJsonSerializer {
    JSONSerializer serializer = null;

    @Before
    public void createSerializer() {
        serializer = new JSONSerializer();
    }

    @Test
    public void unserializeEmptyObject() {
        String jsonObject = "{}";
        Map<String, Object> map = null;

        try {
            map = serializer.unserializeObject(jsonObject);
        } catch (JSONException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(map);
        Assert.assertEquals(0, map.size());
    }

    @Test
    public void unserializeEmptyArray() {
        String jsonArray = "[]";
        List<Object> list = null;

        try {
            list = serializer.unserializeArray(jsonArray);
        } catch (JSONException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(list);
        Assert.assertEquals(0, list.size());
    }

    @Test
    public void unserializeSimpleObject() {
        String jsonObject = "{ \"svc\":\"testsvc\", \"method\" : \"testmethod\", \"id\": 1}";
        Map<String, Object> map = null;

        try {
            map = serializer.unserializeObject(jsonObject);
        } catch (JSONException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(map);
        Assert.assertEquals(3, map.size());
        Assert.assertEquals("testsvc", map.get("svc"));
        Assert.assertEquals("testmethod", map.get("method"));
        Assert.assertEquals(1, map.get("id"));
    }

    @Test
    public void unserializeSimpleArray() {
        String jsonArray = "[\"one\", 2, true]";

        List<Object> list = null;

        try {
            list = serializer.unserializeArray(jsonArray);
        } catch (JSONException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(list);
        Assert.assertEquals(3, list.size());
        Assert.assertEquals("one", list.get(0));
        Assert.assertEquals(2, list.get(1));
        Assert.assertEquals(true, list.get(2));
    }

    @Test
    public void unserializedComplexObject() {
        String jsonObject = "{\"service\":\"novlog.composer.ApplicationController\",\"method\":\"getApplicationForCheckRunById\",\"id\":42,\"params\":[53,\"http://localhost:8080/composer/source/\"]}";
        Map<String, Object> map = null;

        try {
            map = serializer.unserializeObject(jsonObject);
        } catch (JSONException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(map);
        Assert.assertEquals(4, map.size());

        Assert.assertEquals("novlog.composer.ApplicationController", map.get("service"));
        Assert.assertEquals("getApplicationForCheckRunById", map.get("method"));
        Assert.assertEquals(42, map.get("id"));

        Assert.assertTrue(map.get("params") instanceof List);
        List<Object> params = (List<Object>) map.get("params");
        Assert.assertEquals(2, params.size());
        Assert.assertEquals(53, params.get(0));
        Assert.assertEquals("http://localhost:8080/composer/source/", params.get(1));
    }

    @Test
    public void unserializeComplexArray() {
        String jsonArray = "[ 42, \"forty-two\", null, { \"animal\": \"dog\", \"name\": \"Rooky\", \"color\": \"brawn\" } ]";
        List<Object> list = null;

        try {
            list = serializer.unserializeArray(jsonArray);
        } catch (JSONException e) {
            Assert.fail(e.getMessage());
        }

        Assert.assertNotNull(list);
        Assert.assertEquals(4, list.size());

        Assert.assertEquals(42, list.get(0));
        Assert.assertEquals("forty-two", list.get(1));
        Assert.assertEquals(null, list.get(2));

        Assert.assertTrue(list.get(3) instanceof Map);
        Map<String, Object> animal = (Map<String, Object>) list.get(3);
        Assert.assertEquals(3, animal.size());
        Assert.assertEquals("dog", animal.get("animal"));
        Assert.assertEquals("Rooky", animal.get("name"));
        Assert.assertEquals("brawn", animal.get("color"));
    }

    @Test
    public void serializeEmptyMap() {
        Map<String, Object> map = new HashMap<String, Object>();
        String jsonObject = serializer.serialize(map);

        Assert.assertEquals("{}", jsonObject);
    }

    @Test
    public void serializeEmptyCollection() {
        Collection<Object> collection = new ArrayList<Object>();
        String jsonArray = serializer.serialize(collection);

        Assert.assertEquals("[]", jsonArray);
    }

    @Test
    public void serializeSimpleMap() {
        Map<String, Object> map = new LinkedHashMap<String, Object>(); // LinkedHashMap to preserve insertion order.
        map.put("number", 42);
        map.put("string", "toto");
        map.put("boolean", false);

        String jsonObject = serializer.serialize(map);

        Assert.assertEquals("{\"number\":42,\"string\":\"toto\",\"boolean\":false}", jsonObject);
    }

    @Test
    public void serializeSimpleCollection() {
        List<Object> list = new ArrayList<Object>();
        list.add(42);
        list.add("toto");
        list.add(false);

        String jsonArray = serializer.serialize(list);

        Assert.assertEquals("[42,\"toto\",false]", jsonArray);
    }

    @Test
    public void serializeComplexMap() {
        Map<String, Map<String, Integer>> mapOfMap = new LinkedHashMap();
        Map<String, Integer> map = new LinkedHashMap();
        map.put("forty-two", 42);
        mapOfMap.put("map", map);

        // TODO: finish the test
    }

    @Test
    public void serializeComplexCollection() {
        List<Object> list = new ArrayList<Object>();
        list.add("toto");
        list.add(null);

        Map<String, Object> animal = new LinkedHashMap<String, Object>();
        animal.put("animal", "fox");
        animal.put("name", "Rox");
        animal.put("color", "red");
        list.add(animal);

        String jsonArray = serializer.serialize(list);

        Assert.assertEquals("[\"toto\",null,{\"animal\":\"fox\",\"name\":\"Rox\",\"color\":\"red\"}]", jsonArray);
    }

    @Test
    public void unserializeSpecialCases() {
        String json = "{\"\":\"empty attribute\"}";
        String json2 = "{null:\"null attribute\"}";
        String jsonDate = "{\"date\":new Date(Date.UTC(2010,0,14,9,28,11,652))}";

        try {
            Object unser = serializer.unserialize(json);
        } catch (JSONException e) {
            Assert.fail(e.getMessage());
        }

        try {
            Object unser = serializer.unserialize(json2);
        } catch (JSONException e) {
            Assert.fail(e.getMessage());
        }

        try {
            Object unser = serializer.unserialize(jsonDate);
            Assert.assertTrue(unser instanceof Map);
            Assert.assertTrue(((Map) unser).get("date") instanceof Date);
        } catch (JSONException e) {
            Assert.fail(e.getMessage());
        }
    }
}
