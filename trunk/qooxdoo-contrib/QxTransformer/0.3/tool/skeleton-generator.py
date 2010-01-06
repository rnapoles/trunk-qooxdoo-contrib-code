#!/usr/bin/env python

import os
import sys
import errno
import shutil

SKELETON_TEMPLATES_FOLDER = "./tool/skeleton-templates/"
MAKEFILE_TEMPLATE = SKELETON_TEMPLATES_FOLDER+"Makefile.template"
APPLICATION_TEMPLATE = SKELETON_TEMPLATES_FOLDER+"Application.qxml.template"
INDEXHTML_TEMPLATE = SKELETON_TEMPLATES_FOLDER+"index.html.template"

APPLICATION_FILES_BY_DEFAULT = "index.html"

CLASS_FOLDER = "frontend/source/class";
FOLDERS = [
    "backend",
    "frontend",
    "frontend/source",
    CLASS_FOLDER,
    "frontend/source/resource",
    "frontend/source/translation",
    "frontend/source/xml",
] 
MAIN_PROPERTIES_NAMES = [
	"QOOXDOO_PATH",
	"QOOXDOO_URI",
	"QXTRANSFORMER_PATH",
	"APPLICATION_NAMESPACE"
]
ADD_PROPERTIES_NAMES = [
	"APPLICATION_LOCALES",
	"APPLICATION_FILES",
	"ECHO_ON"
]	

MAIN_PROPERTIES_SECTION  = "$$MAIN_PROPERTIES$$"
CUSTOM_PROPERTIES_SECTION  = "$$CUSTOM_PROPERTIES$$"
NATIVE_PROPETIES_SECTION  = "$$NATIVE_PROPETIES$$"

QOOXDOO_VERSION = "$$QOOXDOO_VERSION$$"
NAMESPACE_NAME = "$$NAMESPACE_NAME$$"

def mkdirs(newdir, mode=0777):
    try: os.makedirs(newdir, mode)
    except OSError, err:
        # Reraise the error unless it's about an already existing directory 
        if err.errno != errno.EEXIST or not os.path.isdir(newdir): 
            raise

def printWithIndention(width,str):
		print "".ljust(width)+str
		
def showApplicationStructureTree(pathToApplication, applicationNamespace):
	print "Root: " + pathToApplication
	printWithIndention(2,"-backend")
	printWithIndention(4,"* define your folders under if you need")
	printWithIndention(2,"-frontend")
	printWithIndention(4,"-source")
	printWithIndention(6,"-class")
	printWithIndention(8," "+applicationNamespace)
	printWithIndention(8," * define your packages under if you need")
	printWithIndention(6,"-resource")
	printWithIndention(6,"-translation")
	printWithIndention(6,"-xml")
	printWithIndention(8,"* add additional folders if you need")
	printWithIndention(6," index.html")
	printWithIndention(4," Makefile")

def createMainPropertiesStructure(mainProps):
	props = mainProps[1:5]
	propsStr = ""
	for i in range(len(props)):
		propsStr += MAIN_PROPERTIES_NAMES[i]+" = "+props[i]+"\n\r"

	return propsStr

def createAdditionalPropertiesStructure(addProps):
	propsStr = ""
	for i in range(len(addProps)):
		if(addProps[i].strip()!='-'):
			propsStr += ADD_PROPERTIES_NAMES[i]+" = "+addProps[i]+"\n\r"
	
	return propsStr

def createNativePropertiesStructure(nativeProps):
	propsStr = ""
	for prop in nativeProps:
		propsStr += prop+"\n\r"
	
	return propsStr
	
def createMakeFile(filePath, mainProps, additionalProps, nativeProps):
	output = open(filePath, "w+")
	input = open(MAKEFILE_TEMPLATE,"r")
	
	output.write(input.read().replace(MAIN_PROPERTIES_SECTION,createMainPropertiesStructure(mainProps)).replace(CUSTOM_PROPERTIES_SECTION,createAdditionalPropertiesStructure(additionalProps)).replace(NATIVE_PROPETIES_SECTION,createNativePropertiesStructure(nativeProps)))
	
	output.close()
	input.close()
	
def createAppXmlFile(filePath, mainProps, additionalProps, nativeProps):
	output = open(filePath, "w+")
	input = open(APPLICATION_TEMPLATE,"r")
	
	output.write(input.read().replace(QOOXDOO_VERSION,mainProps[5]).replace(NAMESPACE_NAME,mainProps[4]))
	
	output.close()
	input.close()

def createIndexHtmlFile(filePath, mainProps, additionalProps, nativeProps):
	output = open(filePath, "w+")
	input = open(INDEXHTML_TEMPLATE,"r")
	
	output.write(input.read().replace(NAMESPACE_NAME,mainProps[4]))
	
	output.close()
	input.close()
	
def createApplicationFiles(mainProps, additionalProps, nativeProps):
	pathToApplication = mainProps[0]
	absPathToMakefile = os.path.abspath(pathToApplication)+"/frontend/Makefile"
	absPathToAppliactionFile = os.path.abspath(pathToApplication)+"/"+FOLDERS[6]+"/"+mainProps[4]+".Application.qxml"
	absPathToIndexFile = os.path.abspath(pathToApplication)+"/"+FOLDERS[2]+"/index.html"
	
	needToCreateMakefile = True
	if(os.path.exists(absPathToMakefile)):
		if(os.path.isfile(absPathToMakefile)):
			print "File with name 'Makefile' already exists by path "+absPathToMakefile+" ."
			needReplace = raw_input( "Replace this file (y/n)?: ")
			if(needReplace=='n' or needReplace=='N'):
				needToCreateMakefile = False;
		elif(os.path.isdir(absPathToMakefile)):
			print "Unable to create file with name 'Makefile'. Directory with this name already exists by path "+absPathToMakefile+" ."
	
	if(needToCreateMakefile):
		createMakeFile(absPathToMakefile, mainProps, additionalProps, nativeProps)
		
	needToCreateAppFile= True
	if(os.path.exists(absPathToAppliactionFile)):
		if(os.path.isfile(absPathToAppliactionFile)):
			print "File with name '"+mainProps[4]+".Application.qxml"+"' already exists by path "+absPathToAppliactionFile+" ."
			needReplace = raw_input( "Replace this file (y/n)?: ")
			if(needReplace=='n' or needReplace=='N'):
				needToCreateAppFile = False;
		elif(os.path.isdir(absPathToAppliactionFile)):
			print "Unable to create file with name '"+mainProps[4]+".Application.qxml"+"'. Directory with this name already exists by path "+absPathToAppliactionFile+" ."
	
	if(needToCreateAppFile):
		createAppXmlFile(absPathToAppliactionFile, mainProps, additionalProps, nativeProps)	
		
	needToCreateIndexFile= True
	if(os.path.exists(absPathToIndexFile)):
		if(os.path.isfile(absPathToIndexFile)):
			print "File with name 'index.html' already exists by path "+absPathToIndexFile+" ."
			needReplace = raw_input( "Replace this file (y/n)?: ")
			if(needReplace=='n' or needReplace=='N'):
				needToCreateIndexFile = False;
		elif(os.path.isdir(absPathToIndexFile)):
			print "Unable to create file with name 'index.html'. Directory with this name already exists by path "+absPathToIndexFile+" ."
	
	if(needToCreateIndexFile):
		createIndexHtmlFile(absPathToIndexFile, mainProps, additionalProps, nativeProps)		
	
	
def createFoldersStructure(properties):
	pathToApplication = properties[0]
	applicationNamespace = properties[4]
	
	print "-------------------------------------------------------------------------------"
	print "Generate following folder's structure:"
	showApplicationStructureTree(pathToApplication,applicationNamespace)
	print "-------------------------------------------------------------------------------"
	
	absPathToApplication = os.path.abspath(pathToApplication)
	mkdirs(absPathToApplication);
	absPrefix = absPathToApplication+"/"
	
	for folder in FOLDERS:
		mkdirs(absPrefix+folder)
	
	# TODO need to add checking applicationNamespace for incorrect symbols
	defaultClassPackage = CLASS_FOLDER +"/"+ applicationNamespace
	mkdirs(absPrefix+defaultClassPackage)

def resolveQooxdooUri(pathToQooxdoo):
	qooxdooUri = pathToQooxdoo
	if(pathToQooxdoo[:10]=="/cygdrive/"):
		qooxdooUri = pathToQooxdoo[10:]
		qooxdooUri = "file:///%s:%s" % (qooxdooUri[0],qooxdooUri[1:])
	elif(pathToQooxdoo[:3]=="../"):
		qooxdooUri = "../"+qooxdooUri
	return qooxdooUri
	
def collectMainProperties():
	mainProperties = []
	print "\n-----------------------MAIN PROPERTIES-----------------------------------------"
	print "Please define main properties."
	print "Current dir:"+os.getcwd()
	print "-------------------------------------------------------------------------------"
	
	#TODO validate pathToApplication
	pathToApplication = raw_input( "  1)Path to new application: ")
	mainProperties.append(pathToApplication);
	
	pathToQooxdoo = raw_input( "  2)Path to qooxdoo: ")
	if(os.path.exists(pathToQooxdoo)):
		pathToQooxdoo  = os.path.abspath(pathToQooxdoo)
		if(not(os.path.isdir(pathToQooxdoo))):
			print "   * Unable to find directory by path "+pathToQooxdoo
	else:
		print "   * Unable to find directory by path "+pathToQooxdoo

	mainProperties.append(pathToQooxdoo);

	mainProperties.append(resolveQooxdooUri(pathToQooxdoo))
	
	mainProperties.append(os.path.abspath(os.getcwd()));
	
	applicationNamespace = raw_input("  3)Application namespace: ")
	applicationNamespace = applicationNamespace.strip()
	applicationNamespace = applicationNamespace.lower()
	if(applicationNamespace.isalnum() and applicationNamespace[0].isalpha()):
		mainProperties.append(applicationNamespace)
	else:
		print "   * Incorrect application namespace"
		sys.exit(1)
	
	#TODO need to check
	qooxdooVersion = raw_input("  4)qooxdoo version: ")
	mainProperties.append(qooxdooVersion)
	
	return mainProperties
	
def collectAdditionalProperties():
	additionalProperties = []
	print "\n-------------------------ADDITIONAL PROPERTIES---------------------------------"
	print "Please define additional properties. \nIf you want to skip any property(will be used default value) input '-'."
	print "-------------------------------------------------------------------------------"
	
	#TODO validate applicationLocales
	applicationLocales = raw_input( "  1)Application's locales (separated by space): ")
	if(applicationLocales.strip()=="-"):
		additionalProperties.append("en");
	else:
		additionalProperties.append(applicationLocales);
	
	#TODO validate applicationFiles
	applicationFiles = raw_input( "  2)Application's files (separated by space): ")
	if(applicationFiles.strip()=="-"):
		additionalProperties.append(APPLICATION_FILES_BY_DEFAULT);
	else:	
		additionalProperties.append(applicationFiles);
	
	#TODO validate echo
	echo = raw_input( "  3)Enable QxTransformer logging (y/n): ")
	if(echo=='y' or echo=='Y'):
		additionalProperties.append('true');
	else:
		additionalProperties.append('false');
	
	return additionalProperties

	
def collectNativeProperties():
	nativeProps = []
	print "\n-------------------------NATIVE PROPERTIES-------------------------------------"
	print "Please define custom pairs PROPERTY_NAME=value. \nThis properties will be added to generated Makefile."
	print "For exit type ':q'."
	print "-------------------------------------------------------------------------------"
	property = ""
	while (property!=":q"):
		property = raw_input( "  Enter PROPERTY_NAME=value : ")
		#TODO add check for property
		if(property!=':q'):
			nativeProps.append(property)

	return nativeProps
	
def main():
	mainProps = collectMainProperties()
	createFoldersStructure(mainProps)
	
	additionalProps = []
	defineAddProps = raw_input( "\nDo you want define additional properties? (y/n):")
	if(defineAddProps=='y' or defineAddProps=='Y'):
		additionalProps = collectAdditionalProperties()
	
	nativeProps = []
	defineNativeProps = raw_input( "\nDo you want define custom pairs PROPERTY_NAME=value? (y/n):")
	if(defineNativeProps=='y' or defineNativeProps=='Y'):
		nativeProps = collectNativeProperties()
	
	createApplicationFiles(mainProps, additionalProps, nativeProps)
	
	print '\nSkeleton of application was successfully generated.'
 
if __name__ == '__main__':
	try:
		if(len(sys.argv)<1):
			print "Pass path to $QXTRANSFORMER_PATH in script"
			sys.exit(1)
		pathToTool = sys.argv[1];
		absPathToTool = os.path.abspath(pathToTool)
		os.chdir(absPathToTool)
		main()
		
	except KeyboardInterrupt:
		print
		print "  * Keyboard Interrupt"
		sys.exit(1)
