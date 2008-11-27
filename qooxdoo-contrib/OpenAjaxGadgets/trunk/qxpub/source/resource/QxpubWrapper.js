/**
 * The constructor of this wrapper class is called by the mashup manager once
 * the gadget is added to the mashup application. Since qooxdoo apps initialize
 * themselves, we only use it to expose the wrapper object (which includes the
 * message hub connection handle) to our app.
 */

function QxpubWrapper(id, wrapper) {
  this.id = id;
  this.wrapper = wrapper;
  qxpubwrapper = this;
}
