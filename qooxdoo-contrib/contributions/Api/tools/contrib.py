import os
import simplejson

def getContribDb(contribPath):
	db = {}
	basePath = os.path.join(contribPath, "contributions")
	for dir in os.listdir(basePath):
		if dir[0] == ".":
			continue
		manifest = os.path.join(basePath, dir, "Manifest.js")
		if not os.path.exists(manifest):
			continue

		manifestData = simplejson.load(open(manifest))
		db[manifestData["name"]] = manifestData

	return db
	
print getContribDb("../../..")