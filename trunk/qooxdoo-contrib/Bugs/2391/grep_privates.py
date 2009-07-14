#!/usr/bin/env python

# check for privates in a build file which are multiply defined
# syntax: $0 build/script/<app>.js
# will output all privates with their number of *additional* definitions (so
# it's silent for privates that are defined just once).
# (thron7, 14jul09)

import os, sys, re, string, types, codecs

def findpriv(buff):
    # find optimized privates in build version
    return re.findall(r'[^.]\b(__[a-zA-Z]+):', buff)

def getmult(map):
    # return map items with value > 0
    return [(x, map[x]) for x in map.keys() if map[x]>0]

def makemap(map,arr):
    # make a map from array, counting instances
    for i in arr:
        if i in map:
            map[i]+=1
        else:
            map[i]=0
    return map


def main():
    build_buffer = codecs.open(sys.argv[1], "r", "utf-8").read()
    priv_all     = findpriv(build_buffer)
    priv_map     = makemap({}, priv_all)
    priv_mult    = getmult(priv_map)
    if priv_mult:
        print "%r" % priv_mult
        sys.exit(1)

if __name__ == "__main__":
    main()
