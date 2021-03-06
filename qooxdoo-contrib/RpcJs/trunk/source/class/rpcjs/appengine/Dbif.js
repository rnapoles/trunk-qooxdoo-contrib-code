/**
 * Copyright (c) 2011 Derrell Lipman
 * Copyright (c) 2011 Reed Spool
 * 
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html 
 *   EPL : http://www.eclipse.org/org/documents/epl-v10.php
 */

qx.Class.define("rpcjs.appengine.Dbif",
{
  extend  : qx.core.Object,
  type    : "abstract",

  statics :
  {
    /**
     * The remote procedure code server for App Engine
     */
    __rpcHandler : null,

    /** 
     * The next value to use for an auto-generated key for an entity
     */
    __nextKey : 1,

    /*
     * Build a composite key.
     *
     * By default, this separates the key values using ASCII value 31, which
     * is "Unit Separator". Applications that require that value to be
     * allowable in key component values may replace this method with one that
     * builds the key differently.
     */
    _buildCompositeKey : function(keyArr)
    {
      return keyArr.join(String.fromCharCode(31));
    },

    
    /**
     * Query for all entities of a given class/type, given certain criteria.
     *
     * @param classname {String}
     *   The name of the class, descended from rpcjs.dbif.Entity, of
     *   the object type which is to be queried in the database.
     *
     * @param criteria
     *   See {@link rpcjs.dbif.Entity#query} for details.
     *
     * @return {Array}
     *   An array of maps, i.e. native objects (not of Entity objects!)
     *   containing the data resulting from the query.
     */
    query : function(classname, searchCriteria, resultCriteria)
    {
      var             i;
      var             Datastore;
      var             datastore;
      var             Query;
      var             query;
      var             preparedQuery;
      var             options;
      var             type;
      var             fields;
      var             fieldName;
      var             dbResult;
      var             dbResults;
      var             result;
      var             results;
      var             propertyTypes;
      var             resultLimit;
      var             resultOffset;
      
      // Get the entity type
      type = rpcjs.dbif.Entity.entityTypeMap[classname];
      if (! type)
      {
        throw new Error("No mapped entity type for " + classname);
      }
      
      // Get the field names for this entity type
      propertyTypes = rpcjs.dbif.Entity.propertyTypes;
      fields = propertyTypes[type].fields;

      // Initialize our results array
      results = [];

      // Get the datastore service
      Datastore = Packages.com.google.appengine.api.datastore;
      datastore = Datastore.DatastoreServiceFactory.getDatastoreService();

      // If we've been given a key (single field or composite), just look up
      // that single entity and return it.
      switch(qx.lang.Type.getClass(searchCriteria))
      {
      case "Array":
        // Build the composite key
        searchCriteria = 
          rpcjs.appengine.Dbif._buildCompositeKey(searchCriteria);

        // fall through

      case "Number":
      case "String":
        // We've been given a key. Try to retrieve the specified entity.
        try
        {
          result =
            datastore.get(Datastore.KeyFactory.createKey(type, searchCriteria));
        }
        catch(e)
        {
          // Entity not found
          return [];
        }
        
        dbResults = [];
        dbResults.push(result);

        // Make dbResults look like a Java array, so we can convert its
        // contents to JavaScript types in code which is common with a Query
        // result set.
        dbResults.hasNext = function() { return this.length > 0; };
        dbResults.next = function() { return this.shift(); };
        break;

      default:
        // Create a new query
        Query = Datastore.Query;
        query = new Query(type);

        // If they're not asking for all objects, build a criteria predicate.
        if (searchCriteria)
        {
            (function(criterion)
              {
                var             filterOp;

                switch(criterion.type)
                {
                case "op":
                  switch(criterion.method)
                  {
                  case "and":
                    // Generate the conditions specified in the children
                    criterion.children.forEach(arguments.callee);
                    break;

                  default:
                    throw new Error("Unrecognized criterion method: " +
                                    criterion.method);
                  }
                  break;

                case "element":
                  // Map the specified filter operator to the db's filter ops.
                  filterOp = criterion.filterOp || "=";
                  switch(filterOp)
                  {
                  case "<=":
                    filterOp = Query.FilterOperator.LESS_THAN_OR_EQUAL;
                    break;

                  case "<":
                    filterOp = Query.FilterOperator.LESS_THAN;
                    break;

                  case "=":
                    filterOp = Query.FilterOperator.EQUAL;
                    break;

                  case ">":
                    filterOp = Query.FilterOperator.GREATER_THAN;
                    break;

                  case ">=":
                    filterOp = Query.FilterOperator.GREATER_THAN_OR_EQUAL;
                    break;

                  case "!=":
                    filterOp = Query.FilterOperator.NOT_EQUAL;
                    break;

                  default:
                    throw new Error("Unrecognized comparison operation: " +
                                    criterion.filterOp);
                  }

                  // Add a filter using the provided parameters
                  if (fields[criterion.field] == "Integer" ||
                      fields[criterion.field] == "Key")
                  {
                    query.addFilter(criterion.field, 
                                    filterOp,
                                    java.lang.Integer(criterion.value));
                  }
                  else
                  {
                    query.addFilter(criterion.field, 
                                    filterOp,
                                    criterion.value);
                  }
                  break;

                default:
                  throw new Error("Unrceognized criterion type: " +
                                  criterion.type);
                }
              })(searchCriteria);
        }
        
        
        // Assume the default set of result criteria (no limits, offset=0)
        options = Datastore.FetchOptions.Builder.withDefaults();
        
        // If there are any result criteria specified...
        if (resultCriteria)
        {
          // ... then go through the criteria list and handle each.
          resultCriteria.forEach(
            function(criterion)
            {
              switch(criterion.type)
              {
              case "limit":
                options.limit(criterion.value);
                break;

              case "offset":
                options.offset(criterion.value);
                break;

              case "sort":
                query.addSort(criterion.field,
                              {
                                "asc"  : Query.SortDirection.ASCENDING,
                                "desc" : Query.SortDirection.DESCENDING
                              }[criterion.order]);
                break;
                
              default:
                throw new Error("Unrecognized result criterion type: " +
                criterion.type);
              }
            });
        }

        // Prepare to issue a query
        preparedQuery = datastore.prepare(query);

        // Issue the query
        dbResults = preparedQuery.asIterator(options);
        break;
      }
      
      // Process the query results
      while (dbResults.hasNext())
      {
        // Initialize a map for the result data
        result = {};
        
        // Get the next result
        dbResult = dbResults.next();
        
        // Pull all of the result properties into the entity data
        for (fieldName in fields)
        {
          // Map the Java field data to appropriate JavaScript data
          result[fieldName] =
            (function(value, type)
             {
               var             ret;
               var             Text;
               var             iterator;

               switch(type)
               {
               case "String":
                 return value ? String(value) : null;

               case "Date":
                 return value ? Number(value) : null;

               case "LongString":
                 return value ? String(value.getValue()) : null;

               case "Key":
               case "Integer":
               case "Float":
                 return(Number(value));

               case "KeyArray":
               case "StringArray":
               case "LongStringArray":
               case "NumberArray":
                 if (value)
                 {
                   // Initialize the return array
                   ret = [];

                   // Determine the type of the elements
                   var elemType = type.replace(/Array/, "");
                   
                   // Convert the elements to their proper types
                   iterator = value.iterator();
                   while (iterator.hasNext())
                   {
                     // Call ourself with this element
                     ret.push(arguments.callee(iterator.next(), elemType));
                   }
                   
                   return ret;
                 }
                 else
                 {
                   return [];
                 }

               default:
                 throw new Error("Unknown property type: " + type);
               }
             })(dbResult.getProperty(fieldName), fields[fieldName]);
        }

        // Save this result
        results.push(result);
      }
      
      // Give 'em the query results!
      return results;
    },


    /**
     * Put an entity to the database. If the key field is null or undefined, a
     * key is automatically generated for the entity.
     *
     * @param entity {rpcjs.dbif.Entity}
     *   The entity to be made persistent.
     */
    put : function(entity)
    {
      var             dbKey;
      var             dbEntity;
      var             datastoreService;
      var             Datastore;
      var             entityData = entity.getData();
      var             keyProperty = entity.getEntityKeyProperty();
      var             type = entity.getEntityType();
      var             propertyName;
      var             propertyType;
      var             fields;
      var             fieldName;
      var             data;
      var             key;
      var             keyRange;
      var             keyFields = [];
      
      // Gain access to the datastore service
      Datastore = Packages.com.google.appengine.api.datastore;
      datastoreService = 
        Datastore.DatastoreServiceFactory.getDatastoreService();


      // Are we working with a composite key?
      if (qx.lang.Type.getClass(keyProperty) == "Array")
      {
        // Yup. Build the composite key from these fields
        keyProperty.forEach(
          function(fieldName)
          {
            keyFields.push(entityData[fieldName]);
          });
        key = rpcjs.appengine.Dbif._buildCompositeKey(keyFields);
      }
      else
      {
        // Retrieve the (single field) key
        key = entityData[keyProperty];
      }

      // Ensure that there's either a real key or no key; not empty string
      if (key == "")
      {
        throw new Error("Found disallowed empty key");
      }

      // Get the field names for this entity type
      fields = entity.getDatabaseProperties().fields;

      // If there's no key yet...
      dbKey = null;
      
      // Note: Rhino (and thus App Engine which uses Rhino-compiled code)
      // causes "global" to returned by qx.lang.Type.getClass(key) if key is
      // null or undefined. Without knowing whether it returns "global" in any
      // other case, we test for those two cases explicitly.
      switch(key === null || key === undefined
             ? "Null"
             : qx.lang.Type.getClass(key))
      {
      case "Null":
      case "Undefined":         // Never occurs due to explicit test above
        // Generate a new key. Determine what type of key to use.
        switch(fields[keyProperty])
        {
        case "Key":
        case "Number":
          // Obtain a unique key that no other running instances will obtain.
          keyRange =
            datastoreService.allocateIds(entity.getEntityType(), 1);
          
          // Get its numeric value
          dbKey = keyRange.getStart();
          key = dbKey.getId();
          break;
          
        case "String":
          // Obtain a unique key that no other running instances will obtain.
          keyRange =
            datastoreService.allocateIds(entity.getEntityType(), 1);
          
          // Get its numeric value
          dbKey = keyRange.getStart();
          key = dbKey.getName();
          break;
          
        default:
          throw new Error("No way to autogenerate key");
        }
        
        // Save this key in the key field
        entityData[keyProperty] = key;
        break;
        
      case "Number":
        // Save this key in the key field
        entityData[entity.getEntityKeyProperty()] = key;
        break;
        
      case "Array":
        // Build a composite key string from these key values
        key = rpcjs.appengine.Dbif._buildCompositeKey(key);
        break;
        
      case "String":
        // nothing special to do
        break;
        
      default:
        break;
      }

      // If we didn't auto-generate one, ...
      if (dbKey === null)
      {
        // ... create the database key value
        dbKey = Datastore.KeyFactory.createKey(entity.getEntityType(), key);
      }

      // Create an App Engine entity to store in the database
      dbEntity = new Packages.com.google.appengine.api.datastore.Entity(dbKey);

      // Add each property to the database entity
      for (fieldName in fields)
      {
        // Map the Java field data to appropriate JavaScript data
        data =
          (function(value, type)
           {
             var             i;
             var             v;
             var             conv;
             var             jArr;

             switch(type)
             {
             case "String":
             case "Float":
               return value;

             case "Key":
             case "Integer":
               // Convert JavaScript Number to Java Long to avoid floating point
               return java.lang.Long(String(value));

             case "Date":
               // If non-null, convert to a Java Long as with Integer;
               // otherwise return null.
               return value !== null ? java.lang.Long(String(value)) : null;

             case "LongString":
               var Text = Packages.com.google.appengine.api.datastore.Text;
               return value ? new Text(value) : value;

             case "KeyArray":
             case "StringArray":
             case "LongStringArray":
             case "IntegerArray":
             case "FloatArray":
               if (type == "IntegerArray")
               {
                 // integer Numbers must be converted to Java longs to avoid
                 // having them saved as floating point values.
                 conv = function(val)
                 {
                   return java.lang.Long(String(val));
                 };
               }
               else
               {
                 conv = function(val)
                 {
                   return val;
                 };
               }

               jArr = new java.util.ArrayList();
               for (i = 0; value && i < value.length; i++)
               {
                 jArr.add(arguments.callee(conv(value[i]),
                                           type.replace(/Array/, "")));
               }
               return jArr;

             default:
               throw new Error("Unknown property type: " + type);
             }
           })(entityData[fieldName], fields[fieldName]);

        // Save this result
        dbEntity.setProperty(fieldName, data);
      }

      // Save it to the database
      datastoreService.put(dbEntity);
    },
    

    /**
     * Remove an entity from the database
     *
     * @param entity {rpcjs.dbif.Entity}
     *   An instance of the entity to be removed.
     */
    remove : function(entity)
    {
      var             entityData = entity.getData();
      var             keyProperty = entity.getEntityKeyProperty();
      var             type = entity.getEntityType();
      var             propertyName;
      var             fields;
      var             key;
      var             keyFields = [];
      var             dbKey;
      var             datastore;
      var             Datastore;
      
      // Are we working with a composite key?
      if (qx.lang.Type.getClass(keyProperty) == "Array")
      {
        // Yup. Build the composite key from these fields
        keyProperty.forEach(
          function(fieldName)
          {
            keyFields.push(entityData[fieldName]);
          });
        key = rpcjs.sim.Dbif._buildCompositeKey(keyFields);
      }
      else
      {
        // Retrieve the (single field) key
        key = entityData[keyProperty];
      }

      // Create the database key value
      Datastore = Packages.com.google.appengine.api.datastore;
      dbKey = Datastore.KeyFactory.createKey(type, key);

      // Remove this entity from the database
      datastore = Datastore.DatastoreServiceFactory.getDatastoreService();
      datastore["delete"](dbKey);
    },
    
    /**
     * Add a blob to the database.
     *
     * @param blobData {LongString}
     *   The data to be written as a blob
     *
     * @return {String}
     *   The blob ID of the just-added blob
     * 
     * @throws {Error}
     *   If an error occurs while writing the blob to the database, an Error
     *   is thrown.
     */
    putBlob : function(blobData)
    {
      var             key;
      var             file;
      var             fileService;
      var             writeChannel;
      var             printWriter;
      var             segment;
      var             segmentSize;
      var             FileServiceFactory;
      var             Channels;
      var             PrintWriter;
      
      FileServiceFactory = 
        Packages.com.google.appengine.api.files.FileServiceFactory;
      Channels = java.nio.channels.Channels;
      PrintWriter = java.io.PrintWriter;
      
      // Get a file service
      fileService = FileServiceFactory.getFileService();
      
      // Create a new blob file with mime type "text/plain"
      file = fileService.createNewBlobFile("text/plain");
      
      // Open a write channel, with lock=true so we can finalize it
      writeChannel = fileService.openWriteChannel(file, true);
      
      // Get a print writer for this channel, so we can write a string
      printWriter = new PrintWriter(Channels.newWriter(writeChannel, "UTF8"));

      // Write our blob data as a series of 32k writes
      printWriter.write(blobData);
      printWriter.close();
      
      // Finalize the channel
      writeChannel.closeFinally();
      
      // Retrieve the blob key for this file
      key = fileService.getBlobKey(file).getKeyString();
      
      // Give 'em the blob id
      return String(key);
    },
    
    /**
     * Retrieve a blob from the database
     *
     * @param blobId {Key}
     *   The blob ID of the blob to be retrieved
     * 
     * @return {LongString}
     *   The blob data retrieved from the database. If there is no blob with
     *   the given ID, undefined is returned.
     */
    getBlob : function(blobId)
    {
      var             blob;
      var             blobstoreService;
      var             blobKey;
      var             blobInfoFactory;
      var             blobInfo;
      var             size;
      var             maxFetchSize;
      var             segmentSize;
      var             startIndex;
      var             endIndex;
      var             BlobstoreService;
      var             BlobstoreServiceFactory;
      var             BlobKey;
      var             BlobInfoFactory;
      
      BlobstoreService =
        Packages.com.google.appengine.api.blobstore.BlobstoreService;
      BlobstoreServiceFactory = 
        Packages.com.google.appengine.api.blobstore.BlobstoreServiceFactory;
      BlobKey = Packages.com.google.appengine.api.blobstore.BlobKey;
      BlobInfoFactory = com.google.appengine.api.blobstore.BlobInfoFactory;
      
      // Get a blobstore service
      blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
      
      // Convert the (string) blobId to a blob key
      blobKey = new BlobKey(blobId);

      // Load the information about this blob
      blobInfoFactory = new BlobInfoFactory();
      blobInfo = blobInfoFactory.loadBlobInfo(blobKey);
      size = blobInfo.getSize();

      // Retrieve the blob
      blob = [];
      maxFetchSize = 1015808;
      startIndex = 0;
      while (size > 0)
      {
        // Determine how much to fetch. Use largest available size within limit.
        segmentSize = Math.min(size, maxFetchSize);
        endIndex = startIndex + segmentSize - 1;

        // Fetch a blob segment and convert it to a Java string.
        blob.push(
          String(
            new java.lang.String(
              blobstoreService.fetchData(blobKey, startIndex, endIndex))));
        
        // Update our start index for next time
        startIndex += segmentSize;

        // We've used up a bunch of the blob. Update remaining size.
        size -= segmentSize;
      }
      
      // Join all of the parts together.
      blob = blob.join("");
      
      // Give 'em what they came for
      return blob;
    },
    
    /**
     * Remove a blob from the database
     *
     * @param blobId {Key}
     *   The blob ID of the blob to be removed. If the specified blob id does
     *   not exist, this request fails silently.
     */
    removeBlob : function(blobId)
    {
      var             blobstoreService;
      var             blobKey;
      var             BlobstoreServiceFactory;
      var             BlobKey;
      
      BlobstoreServiceFactory = 
        Packages.com.google.appengine.api.blobstore.BlobstoreServiceFactory;
      BlobKey = Packages.com.google.appengine.api.blobstore.BlobKey;
      
      // Get a blobstore service
      blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
      
      // Convert the (string) blobId to a blob key
      blobKey = new BlobKey(blobId);

      // Delete the blob
      blobstoreService["delete"](blobKey);
    }
  },

  defer : function()
  {
    // Register our put, query, and remove functions
    rpcjs.dbif.Entity.registerDatabaseProvider(
      rpcjs.appengine.Dbif.query,
      rpcjs.appengine.Dbif.put,
      rpcjs.appengine.Dbif.remove);
  }
});
