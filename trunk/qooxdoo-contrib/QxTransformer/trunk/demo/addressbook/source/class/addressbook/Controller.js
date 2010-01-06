/* ************************************************************************

   qxtransformer - xml->javascript converter
   
   Address Book Sample Application

   http://qxtransformer.org
   http://qooxdoo.org

   Copyright:
     2008 Siarhei Barysiuk and Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Siarhei Barysiuk (sbarysiuk)

************************************************************************ */

/**
* This class contains all event and message handlers.
* Init method registers all event handlers.
*/
qx.Mixin.define("addressbook.Controller",
{
  members :
  {
    /**
     * Registers all message subscribers and prepares DAO layer.
     *
     * @return {void} 
     */
    init : function()
    {
      // create database connector
      var c = new addressbook.dao.DBConnector();

      // store necessary object in local variables
      this._groupDAO = new addressbook.dao.GroupDAO(c);
      this._contactDAO = new addressbook.dao.ContactDAO(c);

      this.__currentGroup = null;
      this.__currentContact = null;

      this.__emptyContact =
      {
        id       : null,
        group_id : null,
        name     : "----- -----",
        phone    : "-----",
        email    : "-----",
        website  : "-----"
      };

      var bus = qx.event.message.Bus.getInstance();
      this.__bus = bus;

      // -------- contact actions --------
      // shows form for new entity
      bus.subscribe("ab.add.contact.mode.new", this.showContactNewForm, this);

      // shows form for edit
      bus.subscribe("ab.add.contact.mode.edit", this.showContactEditForm, this);

      // gets information from form and adds it to the database
      bus.subscribe("ab.add.contact.ok", this.addContact, this);

      // cancels any actons
      bus.subscribe("ab.add.contact.cancel", this.addContactCancel, this);

      bus.subscribe("ab.show.contacts", this.showContacts, this);

      bus.subscribe("ab.select.contact", this.selectContact, this);
      bus.subscribe("ab.delete.contact", this.deleteContact, this);

      // ----- group actions -------
      // loads all groups from the database
      bus.subscribe("ab.load.group", this.loadGroups, this);

      // shows gourps
      bus.subscribe("ab.show.group", this.showGroup, this);

      // deletes groups
      bus.subscribe("ab.delete.group", this.deleteGroup, this);

      // adds group
      bus.subscribe("ab.add.group", this.addGroup, this);
      bus.subscribe("ab.edit.group", this.editGroup, this);

      bus.subscribe("ab.select.group", this.selectGroup, this);
    },


    /**
     * Loads groups from the database and dispatches
     * message to show them.
     *
     * @return {void} 
     */
    loadGroups : function()
    {
      this.debug("Loading groups ...");
      var data = this._groupDAO.getAll();

      var bus = qx.event.message.Bus.getInstance();
      bus.dispatch("ab.show.group", data);
    },


    /**
     * Shows an array of groups in list components.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    showGroup : function(message)
    {
      this.debug("Showing groups...");
      var data = message.getData();

      for (var i in data)
      {
        this.debug(data[i]);
        var li = new qx.ui.form.ListItem(data[i].name);
        li.setUserData("data", data[i]);
        this.groupList.add(li);
      }
    },


    /**
     * Extracts information from message and creates
     * record in database. Then, sends notification
     * to show newly created group.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    addGroup : function(message)
    {
      var rawValue = this.groupNameTF.getValue();
      var value = rawValue ? rawValue : "Undefined";

      // is it a new group?
      var isNew = this.groupNameTF.getUserData("id") ? false : true;

      // prepare an object
      var obj =
      {
        id   : this.groupNameTF.getUserData("id"),
        name : value
      };

      // update or create opration
      var data = this._groupDAO.update(obj);

      if (isNew)
      {
        // new object, add group to th group list
        var bus = qx.event.message.Bus.getInstance();
        bus.dispatch("ab.show.group", [ data ]);
      }
      else
      {
        // existing object. update an existing list item
        var li = this.__getSelectedGroupLI();
        li.setLabel(data.name);
      }

      this.groupNameTF.setUserData("id", null);
    },


    /**
     * Edits group.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    editGroup : function(message)
    {
      var group = this.__getSelectedGroup();

      if (group)
      {
        this.groupNameTF.setValue(group.name);
        this.groupNameTF.setUserData("id", group.id);

        this.groupNameTF.setVisibility("visible");
      }
    },


    /**
     * Toggle (show/hide) group text field.
     * Event handler.
     *
     * @param e {Event} Data Event Handler
     * @return {void} 
     */
    toggleGroupForm : function(e)
    {
      if (this.groupNameTF.isVisible()) {
        this.groupNameTF.setVisibility("hidden");
      } else {
        this.groupNameTF.setVisibility("visible");
      }
    },


    /**
     * Deletes group specified in message.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    deleteGroup : function(message)
    {
      var selectedItem = this.groupList.getSelectedItem();
      var group = selectedItem.getUserData("data");
      this.debug("Deleting group with id=" + group.id);
      this._groupDAO.remove(group.id);
      this.groupList.remove(selectedItem);

      // select fist child in the list
      var children = this.groupList.getChildren();

      if (children.length > 0) {
        this.groupList.select(children[0]);
      }
    },


    /**
     * Select a group message subscriber.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    selectGroup : function(message)
    {
      this.debug("Select group ..");

      // setting current group
      this.__currentGroup = this.__getSelectedGroup();

      // get selected items, and get the first one
      // multiselection is off, probably it could be
      // achieved with more elegant way
      var selectedItems = message.getData().getData();
      var selectedItem = null;
      if (selectedItems) selectedItem = selectedItems[0];

      var contacts = null;

      // selected item is not null
      if (selectedItem)
      {
        var group = selectedItem.getUserData("data");
        this.debug(".. group with id=" + group.id);

        // get all contacts for group with id
        contacts = this._contactDAO.getAllByGroup(group.id);

        // dispatch message to show loaded contacts
        var bus = qx.event.message.Bus.getInstance();
        bus.dispatch("ab.show.contacts", contacts);
      }

      // select the first group if it exists
      // or don't select anything
      else
      {
        var children = this.groupList.getChildren();

        if (children.length > 0)
        {
          this.debug(".. the first group");
          this.groupList.select(children[0]);
        }
        else
        {
          this.debug("...nothing to select ...");
          this.contactList.removeAll();
        }
      }
    },


    /**
     * Show contacts specified in message. 
     * addressbook.Controller.selectGroup dispatches message to show contacts.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    showContacts : function(message)
    {
      this.debug("Show contacts...");

      // clearing selection for contact list
      this.contactList.clearSelection();

      // clean contact list
      this.contactList.removeAll();

      var data = message.getData();

      for (var i in data)
      {
        // create a new list item
        var li = new qx.ui.form.ListItem(data[i].name);

        // set data object by "data" key in user data
        li.setUserData("data", data[i]);
        this.contactList.add(li);
      }

      // select fist child in the list
      var children = this.contactList.getChildren();

      if (children.length > 0) {
        this.contactList.select(children[0]);
      }
    },


    /**
     * Adds or updates(if contact object has id) contact specified in message.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    addContact : function(message)
    {
      this.debug("Add contact...");

      var contact = this.__getContactFormData();
      var isNew = contact.id ? false : true;
      contact = this._contactDAO.update(contact);

      var li = null;

      if (isNew) {
        li = this.__addContactLI(contact);
      }
      else
      {
        li = this.__getSelectedContactLI();
        li.setLabel(contact.name);
        li.setUserData("data", contact);
      }

      // select created or updated contact
      if (li)
      {
        this.debug("Selecting....");
        this.contactList.select(li);
      }

      this.__currentContact = contact;

      // go to normal mode (hide the form), the same as cancel
      this.addContactCancel();
    },


    /**
     * Exits from edit mode, hides the form.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    addContactCancel : function(message)
    {
      if (this.__currentContact) this.__fillContactView(this.__currentContact);
      else this.__fillContactView(this.__emptyContact);

      this.addContactBtn.setEnabled(true);
      this.addGroupBtn.setEnabled(true);
      this.stack.previous();
    },


    /**
     * Shows edit form for a new contact (with dashes, empty).
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    showContactNewForm : function(message)
    {
      this.addContactBtn.setEnabled(false);
      this.addGroupBtn.setEnabled(false);

      this.__fillContactForm(null);
      this.stack.next();
    },


    /**
     * Shows edit form for a existing contact with filled fields.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    showContactEditForm : function(message)
    {
      if (this.__currentContact)
      {
        this.addContactBtn.setEnabled(false);
        this.addGroupBtn.setEnabled(false);

        this.__fillContactForm(this.__currentContact);
        this.stack.next();
      }
    },


    /**
     * Shows contacts information when user selects it.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    selectContact : function(message)
    {
      this.debug("Selecting a contact ...");

      // setting current group
      this.__currentContact = this.__getSelectedContact();

      // get selected item
      var selectedItems = message.getData().getData();
      var selectedItem = null;
      if (selectedItems) selectedItem = selectedItems[0];

      if (selectedItem)
      {
        var contact = selectedItem.getUserData("data");
        this.debug(contact);
        this.__fillContactView(contact);
      }
      else
      {
        this.__fillContactView(null);
      }
    },


    /**
     * Deletes contact.
     *
     * @param message {qx.event.message.Message} Message object
     * @return {void} 
     */
    deleteContact : function(message)
    {
      var selectedItem = this.contactList.getSelectedItem();
      var contact = selectedItem.getUserData("data");
      this.debug("Deleting contact with id=" + contact.id);
      this._contactDAO.remove(contact.id);
      this.contactList.remove(selectedItem);

      // select fist child in the list
      var children = this.contactList.getChildren();

      if (children.length > 0) {
        this.contactList.select(children[0]);
      }
    },

    // --------- PRIVATE METHODS -----------
    /**
     * Returns selected group list item.
     *
     * @return {var} Selected group list item.
     */
    __getSelectedGroupLI : function() {
      return this.groupList.getSelectedItem();
    },


    /**
     * Returns selected contact list item.
     *
     * @return {var} Selected contact list item.
     */
    __getSelectedContactLI : function() {
      return this.contactList.getSelectedItem();
    },


    /**
     * Returns selected group business object.
     *
     * @return {var} Selected group business object.
     */
    __getSelectedGroup : function()
    {
      var li = this.__getSelectedGroupLI();
      return li ? li.getUserData("data") : null;
    },


    /**
     * Retruns selected contact business object.
     *
     * @return {var} Selected business object.
     */
    __getSelectedContact : function()
    {
      var li = this.__getSelectedContactLI();
      return li ? li.getUserData("data") : null;
    },


    /**
     * Adds new contact list item to contact list.
     *
     * @param contact {var} Contact business object.
     * @return {var} Created list item.
     */
    __addContactLI : function(contact)
    {
      var li = new qx.ui.form.ListItem(contact.name);
      li.setUserData("data", contact);
      this.contactList.add(li);
      return li;
    },


    /**
     * Adds new group list item to group list.
     *
     * @param group {var} Group business object.
     * @return {var} Created list item.
     */
    __addGroupLI : function(group)
    {
      var li = new qx.ui.form.ListItem(group.name);
      li.setUserData("data", group);
      this.groupList.add(li);
      return li;
    },


    /**
     * Fills contact form with data.
     *
     * @param contact {var} Contact business object.
     * @return {void} 
     */
    __fillContactForm : function(contact)
    {
      contact = contact ? contact : {};
      this.nameTF.setValue(contact.name ? contact.name : "----- -----");

      // store id for an existing contact (edit mode)
      if (contact.id) this.nameTF.setUserData("id", contact.id);
      else this.nameTF.setUserData("id", null);

      this.phoneTF.setValue(contact.phone ? contact.phone : "-----");
      this.emailTF.setValue(contact.email ? contact.email : "-----");
      this.webSiteTF.setValue(contact.website ? contact.website : "-----");
    },


    /**
     * Extracts and retruns data from contact form.
     *
     * @return {var} Contact business object.
     */
    __getContactFormData : function()
    {
      var contact = {};
      contact.group_id = this.__currentGroup ? this.__currentGroup.id : null;
      contact.id = this.nameTF.getUserData("id") ? this.nameTF.getUserData("id") : null;
      contact.name = this.nameTF.getValue();
      contact.phone = this.phoneTF.getValue();
      contact.email = this.emailTF.getValue();
      contact.website = this.webSiteTF.getValue();

      return contact;
    },


    /**
     * Fills contact view with data.
     *
     * @param contact {var} Contact business object.
     * @return {void} 
     */
    __fillContactView : function(contact)
    {
      contact = contact ? contact : {};
      this.nameLb.setContent(contact.name ? contact.name : "----- -----");
      this.phoneLb.setContent(contact.phone ? contact.phone : "-----");
      this.emailLb.setContent(contact.email ? contact.email : "-----");
      this.webSiteLb.setContent(contact.website ? contact.website : "-----");
    }
  }
});