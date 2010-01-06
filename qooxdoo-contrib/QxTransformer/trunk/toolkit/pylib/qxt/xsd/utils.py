import lxml.etree as etree

class ApiDataParser(object):
    """ This class extractes information from qooxdoo XML Api data and returns it as python dictionary. 
    It includes only classes which are used in tag config for specific dialect. 
    """
    
    
    def __init__(self, dialectSettings, xml_file_path):
        """
            Constructs ApiDataParser instance.
            
            @param   dialectSettings  dialect settings dictionary. You can get it as qxt.settins.DialectSettins().
            @param   xml_file_path    path to file with XML Api data
        """
        self.__ds = dialectSettings
        self.__xmlFilePath = xml_file_path
        self.__processedClasses = set([])
    
    def parseApiData(self):
        """
            Parses API xml data and returns it as python dictionary.
            Includes classes defined in tag configuration for given dialect.
        """
        # getting classes defined in tag config
        classDict = self.__prepareComponentClassDict(self.__ds.getTagsConfig())
        # set of classes for processing
        self.__processedClasses |= set(classDict.keys()) 
        
        classInfoDict, superClasses = self.__parseApiDataStep(classDict)
        
        return classInfoDict
        
    def __parseApiDataStep(self, classDict):
        """
            Parses API data. 
            
            Parses API in N steps.
            1. Step N. Processes list of classes. Gets super class of each processing class.
            2. If super class is not in list for processing, it includes in separate set of classes for processing for step N+1.
            3. Returns tuple with processed classes dict and classes for further processing.
            4. If there are classes for further processing, call Step 1 recursively.
            
            N step processing is used because parser uses SAX to parse XML.
            
            Returns tuple with processed classes dictionary and new set of classes for further processing.
            
            ClassInfoDict structure:
            {
                'className' : {
                    'tagName' : 'tag name for this class',
                    'superClass' : 'super class name',
                    'info' : 'description from API for this class',
                    'properties' : {
                        'propName' : {
                            'info' : 'Description of the property',
                            'defaultValue': 'Default value of property.',
                            'check': 'Check defines type of property or validation expression for the property.',
                            'possibleValues': 'Possible values for the property.',
                            'overriddenFrom': 'Class name which property is overriden from.'
                        }
                    }
                }
            }
        """
        target = ApiDataTarget(classDict)
        parser = etree.XMLParser(target=target)
        
        # gets processed classes and classes for further processing
        classInfoDict, superClasses = etree.parse(self.__xmlFilePath, parser)
        
        # process only classes which have not been processed yet
        classesToProcess = superClasses - self.__processedClasses
        # add processed classes to general set
        self.__processedClasses |= superClasses
        
        # we have not processed classes
        if len(classesToProcess):
            classesToProcessDict = {}
            # super classes have no according xml tag, process them only to get properties
            for name in classesToProcess:
                classesToProcessDict[name] = None
            
            classSuperInfoDict, superClasses = self.__parseApiDataStep(classesToProcessDict)
            
            # adding processed classes to main dict
            if len(classSuperInfoDict):
                classInfoDict.update(classSuperInfoDict)
                
        return (classInfoDict, superClasses)
    
    def __prepareComponentClassDict(self, tagConfig):
        """ Prepares dict structure from tag configuration file with necessary fields."""
        
        classDict = {}
        for tagName in tagConfig.getConfig().keys():
            className = tagConfig.getPropByNameForTag(tagName, 'data.props.class')
            if className:
                classDict[className] = tagName
                
        return classDict

class ApiDataTarget(object):
    """Specific XMLParser target to parse XML Api data."""
    
    def __init__(self, classDict):
        super(ApiDataTarget, self).__init__()
        
        # dict with all information on classes ({className: tagName})
        self.__classDict = classDict
        # classes names
        self.__classes = self.__classDict.keys()
        self.__superClasses = set([])
        
        self.__isClassInProcess = False
        self.__classesApiInfo = {}
        self.__currentClassInfo = None
        self.__currentClassName = None
        self.__currentPropertyName = None
        
        self.__tagStack = []
    
    def start(self, tag, attrib):
        # store each tag in stack to understand where is processing in specific moment
        # there are xml tags with the same names in different places in XML
        self.__tagStack.append(tag)
        #process tag class
        if tag == 'class':
            self.__currentClassName = attrib.get('fullName')
            # process class only if it's in self.__classes set
            if self.__currentClassName and (self.__currentClassName in self.__classes):
                self.__isClassInProcess = True
                self.__currentClassInfo = {}
                self.__classesApiInfo[self.__currentClassName] = self.__currentClassInfo
                self.__currentClassInfo['tagName'] = self.__classDict[self.__currentClassName]
                
                # getting super class
                superClass = attrib.get('superClass')
                self.__currentClassInfo['superClass'] = superClass
                # class has super class and we don't have it in self.__classes
                # we should process in on the next step to get properties info
                # add it to self.__superClasses for further processing
                if superClass and (superClass not in self.__classes):
                    self.__superClasses.add(superClass)
                    
        # class info section
        elif self.__isClassInProcess and len(self.__tagStack)>3 \
            and self.__tagStack[-3]=='class'  and self.__tagStack[-2]=="desc":
            # actuall data will be filled in data() call
            self.__currentClassInfo['info'] = ''
        
        # process properties of class
        elif self.__isClassInProcess and tag == 'properties':
            # preparing dict for properties
            self.__currentClassInfo['properties'] = {}
        
        # process individual property
        elif self.__isClassInProcess and tag == 'property':
            
            self.__currentPropertyName = attrib.get('name')
            self.__currentClassInfo['properties'][self.__currentPropertyName] = {
                'defaultValue': attrib.get('defaultValue',''),
                'check': attrib.get('check',''),
                'possibleValues': attrib.get('possibleValues',''),
                'overriddenFrom': attrib.get('overriddenFrom')
            }
        
        # information on individual property
        elif self.__isClassInProcess and len(self.__tagStack)>3  and self.__tagStack[-3]=='property'\
            and self.__tagStack[-2]=="desc" and self.__tagStack[-1]=="text":
            
            # actuall data will be filled in data() call
            self.__currentClassInfo['properties'][self.__currentPropertyName]['info'] = ''
    
    def data(self, data):
        """
            Fills text information.
        """
        # only for class in processing
        if self.__isClassInProcess:
            # information for class
            if len(self.__tagStack)>3 and self.__tagStack[-3]=='class' \
                and self.__tagStack[-2]=="desc" and self.__tagStack[-1]=="text":
                
                self.__currentClassInfo['info'] += data
            
            # information for property
            elif len(self.__tagStack)>3  and self.__tagStack[-3]=='property'\
                and self.__tagStack[-2]=="desc" and self.__tagStack[-1]=="text":

                    self.__currentClassInfo['properties'][self.__currentPropertyName]['info'] += data
    
    def end(self, tag):
        # controls tag stack
        self.__tagStack.pop()
        if tag == 'class':
            self.__isClassInProcess = False
            
    
    def close(self):
        """Returns processed classes info and classes to be processed on next step"""
        return (self.__classesApiInfo, self.__superClasses)
            
        