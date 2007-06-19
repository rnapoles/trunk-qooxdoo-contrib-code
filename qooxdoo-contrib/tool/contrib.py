import os
import optparse
from types import *

import simplejson
import optparseext


def filterKey(contribIterator, key, value):
	for contrib in contribIterator:
		if not contrib.has_key(key):
			continue
			
		if type(contrib[key]) is ListType:
			if value in contrib[key]:
				yield contrib
		else:
			if contrib[key] == value:
				yield contrib

def filterByQooxdooVersion(contribIterator, qooxdooVersion):
	return filterKey(contribIterator, "qooxdoo-versions", qooxdooVersion)

def filerByKeyword(contribIterator, keyword):
	return filterKey(contribIterator, "keyword", keyword)		


def loadContrib(manifestPath):
	""" load a contribution description from a manifest file """
	manifestData = simplejson.load(open(manifestPath))
	manifestData["path"] = os.path.dirname(manifestPath)
	return manifestData
	
	
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
			
			db.append(loadContrib(manifest))
		
	return db
	
def getClassPathFlags(contrib):
	flags = "--class-path %s/source/class " % contrib["path"]
	flags += "--class-uri ../%s/source/class " % contrib["path"]
	return flags

def getGeneratorFlags(contrib):
	flage = getClassPathFlags(contrib)
	
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
	

def main():
	parser = optparse.OptionParser(
		"usage: %prog [options] [ContribNames]",
		option_class=optparseext.ExtendAction
	)

	parser.add_option(
		"-m", "--manifest", metavar="MANIFEST", action="extend", dest="manifests", default=[], type="string",
		help="File name of a 'Manifest.js' file to load."
	)

	parser.add_option(
		"--contrib-path", metavar="PATH", dest="contrib_path", default="",
		help="Path to the qooxdoo-contrib repository."
	)

	parser.add_option(
		"--build-flags", action="store_true", default=False, dest="build_flags",
		help="Print build flags for the selected packages to stdout."
	)

	parser.add_option(
		"--source-flags", action="store_true", default=False, dest="source_flags",
		help="Print source flags for the selected packages to stdout."
	)
	
	parser.add_option(
		"--class-path-flags", action="store_true", default=False, dest="class_path_flags",
		help="Print class path and class URI flags for the selected packages to stdout."
	)	
	
	parser.add_option(
		"-k", "--key", default="", type="string", dest="key",
		help="Get the value of the given key from all selected contrributions."
	)	
	
	parser.add_option(
		"--filter", action="extend", default=[], dest="filters", metavar="KEY:VALUE", type="string",
		help="Only use contributions with the given key value pair."
	)
	
	(options, args) = parser.parse_args()
	
	# load contributions
	contribs = []

	if options.contrib_path != "":
		contribs.extend(loadContribDb(options.contrib_path))
		
	for manifest in options.manifests:
		contribs.append(loadContrib(manifest))
		
	# filter contributiuons
	contribIterator = iter(contribs)
	
	for filter in options.filters:
		(key, value) = filter.strip().split(":")
		contribIterator = filterKey(contribIterator, key, value)
		
	if options.key:
		print "\n".join([contrib[options.key] for contrib in contribIterator])
	
	if options.class_path_flags:
		print "".join([getClassPathFlags(contrib) for contrib in contribIterator])

	if options.build_flags:
		print "".join([getGeneratorBuildFlags(contrib) for contrib in contribIterator])

	if options.source_flags:
		print "".join([getGeneratorSourceFlags(contrib) for contrib in contribIterator])
	

if __name__ == '__main__':
	main()
