import os
import simplejson


def filterKey(contribIterator, key, value):
	for contrib in contribIterator:
		if contrib.has_key(key) and contrib[key] == value:
			yield contrib

def filterArrayItem(contribIterator, key, item):
	for contrib in contribIterator:
		if contrib.has_key(key) and item in contrib[key]:
			yield contrib

def filterByQooxdooVersion(contribIterator, qooxdooVersion):
	return filterArrayItem(contribIterator, "qooxdoo-versions", qooxdooVersion)

def filerByKeyword(contribIterator, keyword):
	return filterArrayItem(contribIterator, "keyword", keyword)		


def loadContribDb(contribPath):
	db = []
	
	basePath = os.path.join(contribPath, "contributions")
	for dir in os.listdir(basePath):
		if dir[0] == ".":
			continue
		
		for versionDir in os.listdir(os.path.join(basePath, dir)):
			manifest = os.path.join(basePath, dir, versionDir, "Manifest.js")
			if not os.path.exists(manifest):
				continue

			print "loading manifest file '%s' ..." % manifest
			manifestData = simplejson.load(open(manifest))
			manifestData["path"] = os.path.join(basePath, dir, versionDir)
			db.append(manifestData)
		
	return db
	

def getGeneratorFlags(contrib):
	flags = "--class-path %s/source/class " % contrib["path"]
	flags += "--class-uri ../%s/source/class " % contrib["path"]
	
	sourceFlags = flags
	sourceFlags += "--use-setting %s.resourceUri:../$(APPLICATION_HTML_TO_ROOT_URI)/%s/source/resource " % (contrib["namespace"], contrib["path"])

	buildFlags = flags
	buildFlags += "--copy-resources "
	buildFlags += "--resource-input %s/source/resource" % contrib["path"]
	buildFlags += "--resource-output $(APPLICATION_BUILD_PATH)/resource/%s" % contrib["path"]
	buildFlags += "--use-setting %s.resourceUri:$(APPLICATION_HTML_TO_ROOT_URI)/resource/%s" % (contrib["namespace"], contrib["namespace"])
	return (sourceFlags, buildFlags)

def getGeneratorSourceFlags(contrib):
	return getGeneratorFlags(contrib)[0]

def getGeneratorBuildFlags(contrib):
	return getGeneratorFlags(contrib)[1]
	
db = loadContribDb("../../..")
for contrib in filterKey(filterByQooxdooVersion(iter(db), "0.7"), "name", "UploadWidget"):
	print contrib["name"]
	
htmlArea = [ contrib for contrib in filterKey(filterKey(iter(db), "name", "HtmlArea"), "version", "0.1")][0]
print getGeneratorSourceFlags(htmlArea)
