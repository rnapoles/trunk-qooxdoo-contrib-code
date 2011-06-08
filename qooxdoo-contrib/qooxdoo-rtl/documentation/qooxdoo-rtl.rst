====== qooxdoo-rtl ======
===== RTL language support for qooxdoo =====

<note>
This information refers to releases from 1.4.x. It will be developed following the trunk. The first locked tag will be qooxdoo version 1.5
</note>


===== Background =====

Mainly there are two types of text directions for modern languages; left-to-right (LTR) and right-to-left (rtl). Typical LTR languaes are the main Western languages. Typical RTL languages are amongst others Arabic.

Many software packages published, commercial as well as open source, do not support RTL languages in full extent. As will be understood from this document, it is necessary to make changes to the user interface itself too and not only mirror the text and the alignment of the text from right to left instead of left to right.

As RTL languages were not supported by qooxdoo, this contribution was developed.


===== The RTL language user interface =====

To support an RTL language the following changes are necessary:

  * **Extracting cldr data**: The extraction of cldr data of the defined locales is done at generation time.
  * **Detecting RTL language**: The detection of a chosen language to be an RTL language is done at runtime by integrating it into the qx.locale.Manager class and test it by:
<code javascript>
(qx.locale.Manager.getInstance().getDirection() == "right-to-left")
</code>

The other way is that the UI after testing if it is an RTL language the state of ´´rtl´´ is added or removed:
<code javascript>
(qx.locale.Manager.getInstance().getDirection() == "right-to-left") ? this.addState("rtl") : this.removeState("rtl");
</code>

The state is used in the theme handling routines.

  * **Text direction**: Text direction from ´´left-to-right´´ to ´´right-to-left´´. This is done by changing the dir attribute of the content element:
<code javascript>
this.getContentElement().setStyle("direction", rtl ? "rtl" : "ltr");
</code>
  * **Text alignment**: Text alignment from ´´left´´ to ´´right´´. This is done by setting the attribute of a widget:
<code javascript>
widget.setTextAlign("<left | right>");
</code>
  * **Mirrored layout**: Reversing layout is necessary as all text is read from right to left. Reversing is done by changing the layout classes to automatically detect for rtl languages. The reverse function is not affected, i.e. you can reverse an rtl language UI too. Reverse is not the same mirror a UI.
  * **Theme handling**: By using the state ´´rtl´´ the the theme handling routines can detect an rtl language and change necessary decorations and attributes for a mirrored UI.
  * **Icons**: Appropriate icons are mirrored horizontally. Pure images are kept as they are.

The above changes makes it easy to use without coding anything to support rtl languages.

===== The changeLocale event ====

All UI actions are triggered when you change language by the changeLocale event. Previously qooxdoo was designed such that only UI classes with text strings to be translated were triggered by firing the changeLocale event. No changes, more than space corrections, were done by the underlying layout managers.

In the qooxdoo-rtl we have made all UI classes including the layout classes triggered by the changeLocale event. A change of the UI is dependent on text strings and/or layout to be able to support both ltr as well as rtl languages.

There is a base function of the qx.ui.core.Widget class needed to be called by overriding functions:

<code javascript>
_onChangeLocale : qx.core.Environment.select("qx.dynlocale",
{
  "true" : function(e)
  {
    this.base(arguments);

    ...custom code...
  },

  "false" : null
}),
</code>

else the state ´´rtl´´ will not be added or removed.

===== The Demo Browser =====

We have changed the Demo Browser by localising it and added a selectbox to be able to choose between different languages of rtl and ltr to demonstrate how it works.

===== Custom integration =====

More complicated applications where you:

  * **use custom icons**: You have to make two different icons. We have chosen the ending ´´-rtl´´ of all rtl icons.
  * **make custom classes**: If you have custom classes, probably, most of the rtl functionality is already in place, at least as long as you use the qooxdoo framework layout classes. If you develop your own layout class then you have to make the necessary changes.
  * **use/develop custom themes**: YOu have to make necessary changes. Look at the Classic, Modern and Simple themes to see how it is integrated.
