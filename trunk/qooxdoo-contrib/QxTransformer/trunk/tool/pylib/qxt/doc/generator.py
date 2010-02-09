from mako.template import Template
import os
import pprint
import re

class DocGenerator(object):
    """docstring for DocGenerator"""
    def __init__(self, classInfoDict, tagsConfig):
        super(DocGenerator, self).__init__()
        self.__classInfoDict = classInfoDict
        self.__tagsConfig = tagsConfig
        self.api_viewer_url = ''
    
    def generate(self, folder):
        data = []
        pp = pprint.PrettyPrinter(indent=4)
        for tagName, tagConf in self.__tagsConfig.getConfig().iteritems():
            tag = self.__parse_tag_name(tagName)
            if tag[0]:
                
                dataEntry = {}
                dataEntry['ns'] = tag[0]
                dataEntry['localName'] = tag[1]
                dataEntry['tagName'] = tagName
                dataEntry['tagConf'] = tagConf
                dataEntry['tagConfigCode'] = pp.pformat(tagConf)
                
                className = tagConf.get('data',{}).get('props',{}).get('class')
                if className:
                    dataEntry['className'] = className
                    classInfo = self.__classInfoDict.get(className, {})
                    dataEntry['classInfo'] = classInfo
                    
                    if dataEntry['classInfo'].has_key('info'):
                        dataEntry['classInfo']['info'] = self.__process_links(dataEntry['classInfo']['info'], className)
                    
                    if classInfo and classInfo.get('properties'):
                        dataEntry['properties'] = {}
                        for name, prop in classInfo.get('properties').iteritems():
                            if prop.has_key('info'):
                                prop['info'] = self.__process_links(prop['info'], className)
                                
                            dataEntry['properties'][name] = prop
                
                data.append(dataEntry)
        
        tmpl = Template(filename='../pylib/qxt/doc/templates/index.mako', input_encoding='utf-8', output_encoding='utf-8', encoding_errors='replace')
        
        for dataEntry in data:
            doc_folder = os.path.join(folder, dataEntry.get('ns'))
            doc_file = os.path.join(doc_folder, dataEntry.get('localName')+".html")
            
            if not os.path.exists(doc_folder):
                os.mkdir(doc_folder)
                
            if os.path.exists(doc_folder) and os.path.isdir(doc_folder):
                print "Generating file %s ..." %doc_file
                #TODO proper error handling
                f = open(doc_file,'w')
                f.write(tmpl.render(tags=data, current=dataEntry, 
                                    properties = dataEntry.get('properties'),
                                    api_viewer_url = self.api_viewer_url))
                f.close()
            else:
                print "[ERROR]: Can't write docs to %s" %doc_file
                
        
        #print index.render(data=data)
    
    def __parse_tag_name(self, tagName):
        """Parses tag name and returns it as tuple."""

        if not tagName:
            return None

        parts = tagName.split(':')

        if len(parts)==2:
            return (parts[0],parts[1])
        elif len(parts)==1:
            return (None,tagName)
        else:
            return None
            
    def __process_links(self, info, currentClass):
        """Replaces {@link} construction to a html tag."""
        if not info or not currentClass:
            return info
        
        currentPackage = currentClass[:currentClass.rfind('.')]
        
        #replaces {@link} with appropriate A tag
        def replace(m):
            link_value = m.group(1)

            a_tag = "<a href='" + self.api_viewer_url + "%s'>%s</a>"
            
            #link to class with specified package
            if link_value.startswith('qx.'):
                return a_tag %(link_value, link_value)
            #link to property/method
            elif link_value.startswith('#'):
                return a_tag %(currentClass + '~' + link_value[1:], currentClass + link_value)
            #link to class in the same package
            else:
                return a_tag %(currentPackage + "." + link_value, currentPackage + "." + link_value)

        return re.sub("{@link (.*?)}", replace, info)
        