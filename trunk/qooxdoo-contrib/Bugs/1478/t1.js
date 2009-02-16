// this shows the problem through ecmalint, through
// ecmalint.py $0
// "childNodes" is complained about as global identifier
this.assertIdentical(this._doc.getDomElement().childNodes[0], el1.getDomElement());
