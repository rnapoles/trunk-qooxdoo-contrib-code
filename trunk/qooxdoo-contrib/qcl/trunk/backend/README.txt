
Backend for qcl
---------------

Currently, there is only a php backend for qcl. It can be found in 
sampe_app/backend/php, since the backend can only meaningfully be
developed in the context of a real application. the general classes
are contained in sample_app/backend/php/services/qcl, the application-
specific classes (which extend the qcl_... classes and make their 
methods available as services) are located in 
sample_app/backend/php/services/sample_app. 

There is doxygen documentation available in sample_app/backend/php/docs.
More documentation to follow as the project evolves. 