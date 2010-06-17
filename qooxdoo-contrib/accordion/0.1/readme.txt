qooxdoo Contribution - Accordion Widget
=========================

The accordion contribution allows one to have an accordion menu one may know 
from MS Outlook or similar programms.
Basically it consists of an array of buttons and content to be displayed once
a button get clicked.
In order to create an accordion menu you will have to create an object first.
Then you need to add a button to the accordion object and an associated widget
which will be displayed once the button gets clicked.
The clicked button will be displayed on top of the accordion menu maintaining
the order of buttons .

Please have a look at the demo app under http://training.simply-notes.de/demo

A sample with a tree of menu choices can be found at 
http://training.simply-notes.de

Important Info!
The accordion constructur expects the Window the accordion will be displayed
in as parameter. This is used to determin the size available to display the 
content under a button.
Therefore a minHeight must be set for the Window in order to size the accordion
correctly when the Window appears for the first time.

If you want to use the accordion on a full page and not inside a window - as
on http://training.simply-notes.de - than you need to proide the viewport to 
the constructor (qx.bom.Viewport).

