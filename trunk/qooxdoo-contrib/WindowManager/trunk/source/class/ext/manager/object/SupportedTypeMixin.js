/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * This class is intended to be used as a mixin by subclasses of qx.manager
 * .object.ObjectManager.
 * 
 * It enables an object manager to handle instances of supported types only.
 * 
 * It will not allow instances of non-supported types to be added.
 * 
 * ObjectManagers that use this mixin then enable clients to access existing
 * instances of specfic types via the getAllOfType() method.
 */
qx.Class.define("ext.manager.object.SupportedTypeMixin",
{
  extend : qx.core.Target,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vSupportedTypes)
  {
    qx.core.Target.call(this);

    // ************************************************************************
    //   SUPPORTED TYPE DEFS
    // ************************************************************************
    this._supportedTypes = vSupportedTypes;

    // ************************************************************************
    //   MANAGED INSTANCES BY TYPE
    // ************************************************************************
    this._objectsOfType = {};

    // ************************************************************************
    //   ALL MANAGED INSTANCES
    // ************************************************************************
    this._allObjects = [];
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /*
    ---------------------------------------------------------------------------
      CONSTANTS
    ---------------------------------------------------------------------------
    */

    /*
    ---------------------------------------------------------------------------
      UTILITY
    ---------------------------------------------------------------------------
    */

    /*
      Objs are indexed in this._allObjects by their hashcodes, so this
      ._allObjects is mostly empty elements.  Thus its length is not
      a meaningful value.  Count the non-empty elements:
    
      @param  vArray An Array to inspect.
    
      @return The number of non-null elements in vArray.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vArray {var} TODOC
     * @return {var} TODOC
     */
    getArraySize : function(vArray)
    {
      var size = 0;

      for (var i=0; i<vArray.length; i++)
      {
        if (vArray[i] != null) {
          size++;
        }
      }

      return size;
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getSupportedTypeDefs : function() {
      return this._supportedTypes;
    },




    /*
    ---------------------------------------------------------------------------
      API FOR QX.MANAGER.OBJECT.OBJECTMANAGER
    ---------------------------------------------------------------------------
    
      These methods are implemented here so that all subclasses of qx.manager
      .object.ObjectManager which include this mixin Object can delegate calls
      to ObjectManager methods to this mixin Object.
    
    */

    /*
      Add an Object to the local collection of Objects of its type -- only if the
      Object is of a supported type.
    
      @param vObject An Object instance to add.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vObject {var} TODOC
     * @return {void | boolean} TODOC
     */
    add : function(vObject)
    {
      if (this.getDisposed()) {
        return;
      }

      var classname = vObject.classname;

      if (this.supportsType(classname))
      {
        // Add vObject to this._objectsOfType
        if (!this._objectsOfType[classname]) {
          this._objectsOfType[classname] = [];
        }

        this._objectsOfType[classname][vObject.toHashCode()] = vObject;

        // Add vObject to this._allObjects
        this._allObjects[vObject.toHashCode()] = vObject;
      }
      else
      {
        this.error("Can't add unsupported type of classname=" + classname);
      }

      return true;
    },

    /*
      Remove an Object from the local collection of Objects of its type -- only if
      the Object is of a supported type and is in the local collection.
    
      @param vObject An Object instance to remove.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vObject {var} TODOC
     * @return {void | boolean} TODOC
     */
    remove : function(vObject)
    {
      if (this.getDisposed()) {
        return;
      }

      if (this.supportsType(vObject.classname))
      {
        // Remove vObject from this._objectsOfType
        var classname = vObject.classname;

        if (this._objectsOfType[classname])
        {
          var hash = vObject.toHashCode();
          this._objectsOfType[classname][hash] = null;
          delete this._objectsOfType[classname][hash];
        }

        // Remove reference from this._allObjects
        this._allObjects[vObject.toHashCode()] = null;
        delete this._allObjects[vObject.toHashCode()];
      }
      else
      {
        this.error("Can't remove unsupported type of classname=" + vObject.classname);
      }

      return true;
    },

    /*
      Determine this mixin is managing an Object.
    
      @param vObject An Object instance to check.
    
      @return true if vObject is managed by this mixin, else false.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vObject {var} TODOC
     * @return {var} TODOC
     */
    has : function(vObject) {
      return this._allObjects[vObject.toHashCode()] != null;
    },

    /*
      It is not clear why this method exists; however it is implemented so that all
      methods of qx.util.manager.Object are supported.
    
      Get an Object from the local collection of Objects of its type -- only if
      the Object is of a supported type and is in the local collection.
    
      @param vObject An Object instance to get.
    
      @return An Object instance. May be null.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vObject {var} TODOC
     * @return {var} TODOC
     */
    get : function(vObject) {
      return this._allObjects[vObject.toHashCode()];
    },

    /*
      Get an Array of all managed Objects.
    
      @return An Array containing all managed Objects.  May be empty.
              Objects are indexed by their hashcodes.  Almost certainly contains
              many more null elements than non-null elements.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getAll : function() {
      return this._allObjects;
    },

    /*
      Get an Array of all managed Objects.
    
      @return An Array containing all managed Objects.  May be empty.
              Contains no empty elements.
    
              NOTE: Objects are not indexed by their hashcodes.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getTrimmedAll : function()
    {
      var vAll = [];

      for (var i=0; i<this._allObjects.length; i++)
      {
        if (this._allObjects[i] != null) {
          vAll.push(this._allObjects[i]);
        }
      }

      return vAll;
    },

    /*
      Invoke setEnabled(true) on all managed Objects.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    enableAll : function()
    {
      for (var vHashCode in this._allObjects) {
        this._allObjects[vHashCode].setEnabled(true);
      }
    },

    /*
      Invoke setEnabled(false) on all managed Objects.
    */

    /**
     * TODOC
     *
     * @type member
     * @return {void} 
     */
    disableAll : function()
    {
      for (var vHashCode in this._allObjects) {
        this._allObjects[vHashCode].setEnabled(false);
      }
    },




    /*
    ---------------------------------------------------------------------------
      ADDITIONAL API FOR SUPPORTED TYPES
    ---------------------------------------------------------------------------
    */

    /*
      Find and return the type definition for a specific type.
    
      @param classname {String} The classname of the type we want.
    
      @return {qx.core.Object[]} An Objects that contains metadata describing the
              requested type.  Null if this mixin does not support the requested
              type.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vClassname {var} TODOC
     * @return {var} TODOC
     */
    getTypeDef : function(vClassname)
    {
      var vDef = null;

      for (var i=0; i<this._supportedTypes.length; i++)
      {
        var typeDef = this._supportedTypes[i];

        if (typeDef != null && typeDef.classname != null && typeDef.classname == vClassname)
        {
          vDef = typeDef;
          break;
        }
      }

      return vDef;
    },

    /*
      Find and return all managed Objects of a specific type.
    
      @param classname {String} The classname of the type we want.
    
      @return {qx.core.Object[]} All objects of type classname.  Will be null
              if vClassname is not a supported type, or an empty Array if no
              objects of type vClassname are being managed.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vClassname {var} TODOC
     * @return {var} TODOC
     */
    getAllOfType : function(vClassname)
    {
      var allObjs = null;

      if (this.supportsType(vClassname))
      {
        allObjs = this._objectsOfType[vClassname];

        if (allObjs == null) {
          allObjs = [];
        }
      }
      else
      {
        this.warn("Can't getAllOfType for unsupported classname=" + vClassname);
      }

      return allObjs;
    },

    /*
      Find and return all managed Objects of a specific type.
    
      @param classname {String} The classname of the type we want.
    
      @return {qx.core.Object[]} All objects of type classname.  Will be empty
              if no objects of type vClassname are being managed.  Will contain
              no empty elements.
    
              NOTE: Returned Objects are not indexed by their hashcodes.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vClassname {var} TODOC
     * @return {var} TODOC
     */
    getTrimmedAllOfType : function(vClassname)
    {
      var vAll = null;
      var vTrimmed = [];

      if (this.supportsType(vClassname))
      {
        vAll = this._objectsOfType[vClassname];

        if (vAll == null) {
          vAll = [];
        }

        for (var i=0; i<vAll.length; i++)
        {
          if (vAll[i] != null) {
            vTrimmed.push(vAll[i]);
          }
        }
      }
      else
      {
        this.warn("Can't getTrimmedAllOfType for unsupported classname=" + vClassname);
      }

      return vTrimmed;
    },

    /*
      @param {string} vClassname The fully qualified name of a class.
    
      @return {Boolean} True is this SupportedTypeMixin supports
                        vClassname, else fase.
    */

    /**
     * TODOC
     *
     * @type member
     * @param vClassname {var} TODOC
     * @return {String} TODOC
     */
    supportsType : function(vClassname)
    {
      var s = false;

      if (this.getTypeDef(vClassname) != null) {
        s = true;
      }

      return s;
    },




    /*
    ---------------------------------------------------------------------------
      DISPOSER
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {boolean | var} TODOC
     */
    dispose : function()
    {
      if (this.getDisposed()) {
        return true;
      }

      if (this._supportedTypes) {
        this._supportedTypes = null;
      }

      if (this._objectsOfType) {
        this._objectsOfType = null;
      }

      return qx.core.Target.prototype.dispose.call(this);
    }
  }
});
