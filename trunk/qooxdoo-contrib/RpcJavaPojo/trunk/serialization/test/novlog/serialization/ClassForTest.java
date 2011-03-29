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

import java.util.*;

public class ClassForTest {

    public int primitiveInt = 1;
    public Integer objectInt = 2;
    public NB number = NB.three;

    public float primitiveFloat = 4f;
    public Float objectFloat = 5f;

    public LinkedHashSet<String> stringSet;
    public Collection<String> stringList;
    public Map<String, String> stringsMap;

    public ClassForTest[] selfArray;
    public Collection<ClassForTest> selfList;

    transient double d = 1010d;
    static String staticString = "static";

    public ClassForTest() {
        stringSet = new LinkedHashSet<String>();
        stringSet.add("one");
        stringSet.add("two");
        stringSet.add("three");

        stringList = new LinkedList<String>();
        stringList.add("blabla");

        stringsMap = new HashMap<String, String>();
        stringsMap.put("key1", "value1");
        stringsMap.put("key2", "value2");
    }

    public void setSelfArray(ClassForTest[] selfArray) {
        this.selfArray = selfArray;
    }

    public void setSelfList(Collection<ClassForTest> selfList) {
        this.selfList = selfList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ClassForTest that = (ClassForTest) o;

        if (Double.compare(that.d, d) != 0) return false;
        if (Float.compare(that.primitiveFloat, primitiveFloat) != 0) return false;
        if (primitiveInt != that.primitiveInt) return false;
        if (stringsMap != null ? !stringsMap.equals(that.stringsMap) : that.stringsMap != null) return false;
        if (number != that.number) return false;
        if (objectFloat != null ? !objectFloat.equals(that.objectFloat) : that.objectFloat != null) return false;
        if (objectInt != null ? !objectInt.equals(that.objectInt) : that.objectInt != null) return false;
        if (!Arrays.equals(selfArray, that.selfArray)) return false;
        if (selfList != null ? !selfList.equals(that.selfList) : that.selfList != null) return false;
        if (stringList != null ? !stringList.equals(that.stringList) : that.stringList != null) return false;
        if (stringSet != null ? !stringSet.equals(that.stringSet) : that.stringSet != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = primitiveInt;
        result = 31 * result + (objectInt != null ? objectInt.hashCode() : 0);
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (primitiveFloat != +0.0f ? Float.floatToIntBits(primitiveFloat) : 0);
        result = 31 * result + (objectFloat != null ? objectFloat.hashCode() : 0);
        result = 31 * result + (stringSet != null ? stringSet.hashCode() : 0);
        result = 31 * result + (stringList != null ? stringList.hashCode() : 0);
        result = 31 * result + (stringsMap != null ? stringsMap.hashCode() : 0);
        result = 31 * result + (selfArray != null ? Arrays.hashCode(selfArray) : 0);
        result = 31 * result + (selfList != null ? selfList.hashCode() : 0);
        temp = d != +0.0d ? Double.doubleToLongBits(d) : 0L;
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }
}
