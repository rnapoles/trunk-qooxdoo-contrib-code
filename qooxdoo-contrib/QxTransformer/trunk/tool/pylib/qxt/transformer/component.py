import re
import os
import lxml.etree as etree
from qxt.settings import settings
from qxt.xml import utils

class ComponentLookup(object):
    """docstring for ComponentLookup"""
    
    def __init__(self):
        """docstring for __init_"""
        self.pattern = re.compile('^((\w+)\.)*\*$')
        
        
    def lookup(self, nsmap):
        """docstring for lookup"""
        gs = settings.GlobalSettings()
        ds = settings.DialectSettings()
        tagConfig = ds.getTagsConfig()
        #tags configuration for each component in namespace (dict format is ns:[{component dict},...])
        configs = {}
                
        #looking for user defined namespaces
        for ns in nsmap.keys():
            result = self.pattern.match(nsmap[ns])
            #matched to pattern and was not previously processed
            if result and not tagConfig.isComponentNSProcessed(ns):
                #adding an empty array for tags definitions
                configs[ns] = []
                
                package = nsmap[ns].split('.')
                package_path = os.sep.join(package[:-1])
                #getting an abs path for pakage in namespace
                abs_package_path = os.path.join(gs.props[settings.GlobalSettings.XML_SOURCE_DIR], package_path)
                
                #walking through all xml files in this diretory and get necessary information from components
                if os.path.exists(abs_package_path) and os.path.isdir(abs_package_path):
                    target = self.ComponentTarget()
                    target.ns = nsmap[ns]
                    parser = etree.XMLParser(target=target)
                    
                    for xml_file_path in self.__xmlfiles__(abs_package_path):
                        tagName = os.path.splitext(os.path.split(xml_file_path)[1])[0]
                        target.tagName = tagName
                        component_definition = etree.parse(xml_file_path, parser)
                        
                        if component_definition:
                            configs[ns].append(component_definition)
                        
                        target.counter = 1
        
        tagConfig.extendWithComponents(configs)
        
        return configs
    
    
    def __xmlfiles__(self, rootpath):
        dirwalker = os.walk(rootpath)
        
        for (path, dirlist, filelist) in dirwalker:
            for filename in filelist:
                if not re.search(r'.*\.xml$', filename):
                    continue
                yield os.path.join(path,filename)
    
    
    class ComponentTarget(object):
        """docstring for ComponentTarget"""
        component = None
        tagName = ''
        ns = ''
        
        def __init__(self):
            """docstring for __init__"""
            self.qxt_ns = utils.XMLUtils.getNsUrlByPrefix("qxt")
            self.qxt_component_tag = "{%s}component" %self.qxt_ns
            
            self.counter = 1
            
        def start(self, tag, attrib):
            """docstring for start"""
            if self.counter==1 and tag==self.qxt_component_tag:
                self.component = {}
                self.component['tag'] = "{%s}%s" %(self.ns, attrib.get('tagName', self.tagName))
                self.component['class'] = attrib.get("className")
            
            #second tag desicribing behavior of base tag
            if self.counter==2 and self.component:
                self.component['extends'] = tag
            
            self.counter+=1
                        
        def close(self):
            """docstring for end"""
            return self.component
            