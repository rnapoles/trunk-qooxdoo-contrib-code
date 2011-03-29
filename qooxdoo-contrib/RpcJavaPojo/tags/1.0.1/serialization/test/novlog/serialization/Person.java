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

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

class Person extends Being {
    enum Country {
        us, france
    }

    public String name = null;
    private boolean married = false;
    protected Integer numberOfChildren = 0;
    private List<Person> children = new LinkedList<Person>();
    private Country[] countries = Country.values();

    public Person() {
    }

    Person(String name, boolean married, Integer numberOfChildren) {
        this.name = name;
        this.married = married;
        this.numberOfChildren = numberOfChildren;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isMarried() {
        return married;
    }

    public void setMarried(boolean married) {
        this.married = married;
    }

    public Integer getNumberOfChildren() {
        return numberOfChildren;
    }

    public void setNumberOfChildren(Integer numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
    }

    public List<Person> getChildren() {
        return children;
    }

    public void addChild(Person child) {
        this.children.add(child);
    }

    public void setChildren(List<Person> children) {
        this.children = children;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Person person = (Person) o;

        if (married != person.married) return false;
        if (children != null ? !children.equals(person.children) : person.children != null) return false;
        if (name != null ? !name.equals(person.name) : person.name != null) return false;
        if (numberOfChildren != null ? !numberOfChildren.equals(person.numberOfChildren) : person.numberOfChildren != null)
            return false;

        return true;
    }


    /* ***************
     * Serialization *
     *************** */

    public String getNameForSerialization() {
        return name;
    }

    public void setNameForSerialization(String name) {
        this.name = name;
    }

    public boolean getMarriedForSerialization() {
        return married;
    }

    public void setMarriedForSerialization(boolean married) {
        this.married = married;
    }

    public Integer getNumberOfChildrenForSerialization() {
        return numberOfChildren;
    }

    public void setNumberOfChildrenForSerialization(Integer numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
    }

    public Person[] getChildrenForSerialization() {
        if (children != null) {
            Person[] childrenArray = new Person[children.size()];
            return children.toArray(childrenArray);
        } else {
            return null;
        }
    }

    public void setChildrenForSerialization(Person[] children) {
        this.children = Arrays.asList(children);
    }
}
