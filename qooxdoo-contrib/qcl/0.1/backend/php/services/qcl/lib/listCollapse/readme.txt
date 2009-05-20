/***************************************************************************************
        Nested list collapsing script written by Mark Wilton-Jones - 21/11/2003
Version 2.3.0 - this script takes existing HTML nested UL or OL lists, and collapses them
            Updated 13/02/2004 to allow links in root of expanding branch
                  Updated 09/09/2004 to allow state to be saved
          Updated 07/10/2004 to allow page address links to be highlighted
Updated 28/11/2004 to allow you to force expand/collapse links to use just the extraHTML
Updated 23/09/2006 to add expandCollapseAll and to allow selfLink to locate custom links
****************************************************************************************

Please see http://www.howtocreate.co.uk/jslibs/ for details and a demo of this script
Please see http://www.howtocreate.co.uk/jslibs/termsOfUse.html for terms of use
_________________________________________________________________________

You can put as many lists on the page as you like, each list may have a different format.

To use:
_________________________________________________________________________

Inbetween the <head> tags, put:

  <script src="PATH TO SCRIPT/listCollapse.js" type="text/javascript" language="javascript1.2"></script>
_________________________________________________________________________

Define the HTML. Note that to correctly nest lists, child OLs or ULs should be children of an LI element,
not direct descendents of their parent OL/UL. The text used to expand the branch should be written
between the <li> tag and the <UL/OL/A> tag, and should only contain HTML that is permitted inside an 'A'
element. Note; Opera 7 will lose any style attributes you define in this text - use classes instead.

<ul id="someID">
  <li>Book 1
    <ul>
      <li><a href="someHref">Chapter 1</a></li>
      <li><a href="someHref">Chapter 2</a></li>
    </ul>
  </li>
  <li><a href="elsewhere.html">Book 2</a>
    <ul>
      <li><a href="someHref">Chapter 1</a></li>
      <li><a href="someHref">Chapter 2</a></li>
    </ul>
  </li>
  <li>Book 3
    <ul>
      <li><a href="someHref">Chapter 1</a></li>
      <li>Cha<span class="doMore">pt</span>er 2
        <ul>
          <li><a href="someHref">Sub 1</a></li>
          <li><a href="someHref">Sub 2</a></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
________________________________________________________________________
Now you need to trigger the collapsing, using <body onload, window.onload or by putting the collapse
commands in a script just before the </body> tag. If using either onload technique, you must not use
any other scripts that rely on the onload event.

compactMenu(theRootID,shouldAutoCollapse,extraHTML[,useMinimalLink]);
  oID = string: ID of root nest element, must be a UL or OL; this will not be collapsed, but any child
  UL/OLs will be (note, if the root nest element is a UL, all child lists should be ULs - the same is
  true for OLs; if the root nest element is OL, all child lists should be OLs)
  shouldAutoCollapse = bool: auto-collapse unused branches
  extraHTML = string: HTML to insert to collapsible branches - usually '&plusmn; '
  useMinimalLink = bool: normally the expand/collapse link will use both extraHTML and the original list
  item text - if the list item text is already a link, this will not be included - set this option to
  true to force the script to use only the extraHTML as the link, even if the rest of the list item is
  not a link - this option will only be respected if you also provide some extraHTML

eg 1.
<body onload="compactMenu('someID',true,'&plusmn; ');">

eg 2.
<script type="text/javascript" language="javascript1.2"><!--
window.onload = function () { compactMenu('someID',false,'&plusmn; '); }
//--></script>

eg 3.
<script type="text/javascript" language="javascript1.2"><!--
compactMenu('someID',true,'&plusmn; ');
//--></script>
</body>

stateToFromStr(theRootID);
  oID = string: ID of root nest element, must be a UL or OL; returns a string representing all expanding
  branches - can be used with my cookie script to save state when unloading the page
stateToFromStr(theRootID,stringRepresentation);
  oID = string: ID of root nest element, must be a UL or OL;
  stringRepresentation = string: string representation of expanded branches, as created above
  must be called _after_ collapsing the list - values can be recovered from cookies using my cookie script
note: this facility will not be able to take changes in the list structure into account - use session cookies
or short-term cookies to avoid longer term structure change problems

selfLink(theRootID,newClass,shouldExpandBranch[,linkHref]);
  theRootID = string: ID of root nest element, must be a UL or OL;
  newClass = string: new class name to add to any existing class names
  shouldExpandBranch = bool: expand branches to show the first matching link
  linkHref = string: by default, it will try to locate links to the current page address - you can
  override that here by giving a specific address that it should look for.
  Allows you to highlight links to the current page that appear in the list
  must be called _after_ collapsing the list
  address hash and port are not included in the comparison - links containing href="#" are always ignored

expandCollapseAll(theRootID,shouldExpand);
  theRootID = string: ID of root nest element, must be a UL or OL that has been collapsed using compactMenu
  shouldExpand = bool: says if it should expand all branches (true) or collapse all branches (false)
  Expands/collapses all branches in a collapsed list. Must not be used with auto-collapsing lists.

My cookie script is available on http://www.howtocreate.co.uk/jslibs/
  <body onload="compactMenu('someID',true,'&plusmn; ');stateToFromStr(theRootID,retrieveCookie('menuState'));"
  onunload="setCookie('menuState',stateToFromStr(theRootID),31536000);">
____________________________________________________________________________________________________*/