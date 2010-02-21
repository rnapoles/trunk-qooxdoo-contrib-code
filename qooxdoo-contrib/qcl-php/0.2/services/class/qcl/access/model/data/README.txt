This folder contains sample data for the user, role and permission models
and the link data which joins the models. If you want to use the data to
test your setup, you have two choices:

1) Extend the classes and add a class variable
   var $importDataPath = "qcl/access/model/data/(User|Role|Permission).data.xml";

2) Manually load the data in the start method of your application