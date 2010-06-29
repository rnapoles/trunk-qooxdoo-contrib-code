====================================
===  svg (qooxdoo contribution)  ===
====================================

This file contains an unorganized list of todo's, ideas and improvements.



[= ViewPort and ViewBox =]

   Resizing the Svg Widget changes the size of the ViewPort. In some cases,
   you'll want the image to be stretched to fit the new ViewPort size. In
   other cases, you want to display more (or less) of the image.
  
   This behaviours should be implemented in the renderLayout method of the
   svg.ui.embed.Svg class.    

   (a) stretch/shrink the image to fit the new size
    > no change to the viewBox attribute
    
   (b) see more/less of the image
    > viewBox attribute must be multiplied by the same factor
      as the widget's size has changed  
  
   Another consideration is that the current aspect ratio may need to be preserved.
   Some additional intellegence is needed here. Attribute "preserveAspectRatio"
   probably plays a role there too.

  
  
[= Referencing elements =]

    Some attributes can refer to another element using an URI reference. For
    example a <circle fill="url(#myPattern)" /> where #myPattern is a pattern
    element defined in a defs section.

      var pattern = new svg.Pattern({id: "myPattern"});
      var circle = new svg.Circle();

    Current way to add the reference:
      circle.setFill("url(#myPattern)");
      
    A better way to do this should be implemented:
      circle.setFill(pattern);


[= Check incoming values =]

   Incoming attribute values should, at least when the "debug" variant is set,
   be checked if they comply with the SVG 1.1 standard.
   
   If not, a warning should be given.
    
    
[= Add features =]

     Add support for...
     - text
     - text on a path
     - gradients
     - transformations
     - filters
     - animation

    
[= Adding behaviour to elements =]

     Some types of behaviour could be useful on several occasions. An example
     would be to be able to drag. For windows, this behaviour is added through
     qx.ui.core.MMovable.
     
     Idea: encapsulate behaviour (such as "movable") in special objects which
     can then be applied to compatible svg elements (for example, a circle) at
     runtime.


[= Better readable API documentation =]

     Most of the current API documentation is copied directly from the
     W3 SVG 1.1 specification. The text tends to be a bit verbose.
     It should be replaced by something more human-readable, with hyperlinks to
     the W3 spec for when more details are needed.      
