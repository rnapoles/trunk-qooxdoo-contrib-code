// this shows the problem through the variant optimizer, through
// compile.py -n $0
// "childNodes" is replaced in the accessor expression
(function () 
{
  var childNodes = [];
  var hugo = this._doc.getDomElement().childNodes[0];
})();
