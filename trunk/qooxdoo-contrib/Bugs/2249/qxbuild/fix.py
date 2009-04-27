#!/usr/bin/env python

import os
import shutil

# Remove all ".meta" files
# for root, dirs, files in os.walk("."):
#     for f in files:
#         if f.lower().endswith(".meta"):
#             path = os.path.join(root, f)
#             print "Removing meta file: " + path
#             os.remove(path)

# Correct generated files
fileNames = ["./build/script/qx-build.js", "./build/script/qx-debug.js"]

for fileName in fileNames:
  print "    - Fixing: " + fileName

  # Read the file
  fileHandle = open(fileName, "rb")
  fileData = fileHandle.read()
  fileHandle.close()

  # Modify
  fileData = fileData.replace('"/QOOXDOO_BUILD_PATH', 'qxsettings["qx.path"] + "')

  # Save
  fileHandle = open(fileName, "wb")
  fileHandle.truncate()
  fileHandle.write(fileData)
  fileHandle.close()

print "    - Adding ScriptLoader.js"
shutil.copyfile("./helpers/ScriptLoader.js", "./build/script/ScriptLoader.js")