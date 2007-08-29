#!/usr/bin/env python

import sys, os, re
import cgi
#import cgitb; cgitb.enable()

config = {
    'debug': 0,
    'makefile': "Makefile",
}


def invoke_external(cmd):
    import subprocess
    p = subprocess.Popen(cmd, shell=True,
                         stdout=sys.stdout,
                         stderr=sys.stderr)
    return p.wait()

def invoke_piped(cmd):
    import subprocess
    p = subprocess.Popen(cmd, shell=True,
                         stdout=subprocess.PIPE,
                         stderr=subprocess.PIPE,
                         universal_newlines=True)
    output, errout = p.communicate()
    rcode = p.returncode

    return (rcode, output, errout)

def do_make(form):
    # our output is text/plain
    print "Content-type: text/plain"
    print
    sys.stdout.flush()
    #os.chdir("/tmp/qx-bbb/qooxdoo-0.8-pre-sdk/frontend/application/demobrowser/")
    #cmd = form['cygwin'].value + "\\\\bin\\\\bash.exe" + " -c make source"
    if not 'make' in form:
        print "Missing parameter 'make'; aborting..."
        return -1
    else:
        makecmd = "make " + form['make'].value
    if 'cygwin' in form:
        parts = form['cygwin'].value.split('\\')
        bashpath = os.path.join(*parts)
        bashpath = os.path.join(bashpath,'bin','bash.exe')
        cmd = bashpath + " -c 'export PATH=/usr/bin; " + makecmd + "'"
    else:
        cmd = makecmd
    rc = invoke_external(cmd)
    #os.chdir(olddir)

    return rc

def do_save(form):
    # our output is text/plain
    print "Content-type: text/plain"
    print
    # get parms - JSON string?
    json  = form['makvars'].value
    makvars = eval(json)
    # get Makefile.in
    # fill in parms
    # write Makefile
    #for line in makefile_in.read():
    #    if line.match(INTRO):
    #        inIntro = True
    #    while inIntro == True:
    #        makefile_out.write(line)
    #        if line.match(INTRO_END):
    #            inIntro = False
    #    if line.match(PARAM):
    #        makefile_out.write(param, lookup(param,parms))
    #    if line.match(FOOTER):
    #        # write rest of template
    #        pass
    if config['debug']:
        print "dumping json map:"
        for item in makvars:
            print item['lab']+"="+item['dat']
    save_makvars(json)
    rc = gen_makefile(makvars)
    print "Return code of saving Makefile: %d" % rc

    return rc

def do_getmakvars(form):
    print "Content-type: text/plain"
    print
    rc = 0
    makvars = read_makefile()
    print makvars

    return rc

def save_makvars(json):
    "Saves makvars in a js file (for later editing sessions)"
    f = open("makvars.js","w")
    f.write(json)
    f.close()

    return

def gen_makefile(makvars):
    "Generate Makefile from the passed makvars"
    import shutil
    rc = 0
    mkfile=config['makefile']
    mkback=mkfile+".bak"
    # make a list of the config keywords
    makkeys = []
    for item in makvars:
        makkeys.append(item['lab'])
    # backup copy
    shutil.copy(mkfile, mkback)
    infile = open(mkback,'rU')
    f = open(mkfile,'w')

    # Processing
    # copy prolog
    #for s in infile:
        #if kvpat.match(s):
            #fkey = kvpat.match(s)[0]
            #if fkey in makkeys:
                #item = finditem(makvars,fkey)
                #writeitem(f,item)
                #item['written']=True
                #continue

        #f.write(s)
    
    # dump the remaining settings
    #for item in makvars:
        #if not 'written' in item:
            #writeitem(f,item)

    # Entire File Version
    #text = infile.read()
    # patch existing entries
    #for mkey in makkeys:
        #if /mkey\s*=\s*(.*)$/m:
            #item = finditem(makvars,mkey)
            #text.insert($1,item['dat'])
            #item['written']=True
    # dump remaining settings
    #find_custom_section()
    #for item in makvars:
        #if not 'written' in item:
            #text.insert(item['lab']+" = "+item['dat']+"\n")

    #f.write(text)

    # Array of Lines Version
    text = infile.readlines()
    j = find_custom_section(text)
    if j < 0:
        print "Unable to edit Makfile; aborting ..."
        return -1

    kvpat = re.compile(r'^([^=]+?)\s*=\s*.*$') # a key=value line in the Makefile, capturing key
    # until the end of the custom section
    for i in range(0,j):
        # copy or patch
        mo = kvpat.search(text[i])
        if mo:
            fkey = mo.group(1)
            fkey = fkey.strip()
            if fkey in makkeys:
                item = finditem(makvars,fkey)
                writeitem(f,item)
                item['written']=True
                continue
        f.write(text[i])

    # at the end of the custom section
    for item in makvars:
        # dump yet unwritten settings
        if not 'written' in item:
            writeitem(f,item)

    # after the custom section
    for i in range(j+1,len(text)):
        # copy rest
        f.write(text[i])

    # Processing - Done

    infile.close()
    f.close()

    return rc

def find_custom_section(text):
    " text is an array of lines representing the current Makefile"
    reg1 = re.compile(r'^#+\s*$')
    reg2 = re.compile(r'^# INTERNALS \(PLEASE DO NOT CHANGE\)\s*$')
    for i in range(0,len(text)-2):
        if (reg1.search(text[i]) and
           reg2.search(text[i+1]) and
           reg1.search(text[i+2])):
           return i-1
    return -1

def finditem(mvars,label):
    for item in mvars:
        if item['lab'] == label:
            return item
    return None

def writeitem(fh,item):
    fh.write(item['lab']+" = "+item['dat']+"\n")

def read_makefile():
    "Read the var settings from Makefile and return as Json"
    rc = 0
    mkfile=config['makefile']
    # make a list of the settings [{'lab': 'QX_SOMETHING','dat': 'qx-0.7'},...]
    makvars = []
    infile = open(mkfile,'rU')
    kvpat = re.compile(r'^([^=#]+?)\s*=\s*(.*)$') # a key=value line in the Makefile, capturing key

    for line in infile:
        mo = kvpat.search(line)
        if mo:
            fkey = mo.group(1)
            fkey = fkey.strip()
            fval = mo.group(2)
            fval = fval.strip()
            makvars.append({'lab':fkey, 'dat':fval})

    infile.close()

    makjson = jsonify(makvars)

    return makjson

def jsonify(arrayofmaps):
    json = ""
    if isinstance(arrayofmaps, list):
        json += "["
        al = len(arrayofmaps)
        for i,item in enumerate(arrayofmaps):
            if isinstance(item, dict):
                json += "{"
                for j,key in enumerate(item):
                    json += "'"+key+"':"
                    json += repr(item[key])
                    if j<len(item)-1:
                        json += ","
                json += "}"
                if i<al-1:
                    json += ","
        json += "]"
    return json

def dispatch_action(form):
    if 'action' in form:
        action = form['action'].value
        if (action == 'save'): # save to makefile
            do_save(form)
        elif (action == 'run'): # run make file
            do_make(form)
        elif (action == 'getvars'): # get existing Makefile vars
            do_getmakvars(form)
        else:
            print "Content-type: text/plain"
            print
            print "Wrong action <hihihi>: %s" % action
    #elif (form['action'] == 'get'): pass # get makefile vars? - not necessary
    else:
        print "Content-type: text/plain"
        print
        print 'qx.io.remote.ScriptTransport._requestFinished(%s, "Thank you for asking");' % form["_ScriptTransport_id"].value

def emit_http_headers():
    # since we're nph, provide the minimal HTTP headers here
    server_protocol = os.environ['SERVER_PROTOCOL']
    server_software = os.environ['SERVER_SOFTWARE']
    # but CGIHTTPServer prints headers anyway, and still piping the output :-)
    #print "%s 200 OK" % server_protocol
    #print "Server: %s" % server_software
    # "Content-type: text/html\n\n" to be supplied by worker function

def process_parms():
    query = cgi.FieldStorage()
    return query

def main():
    form = process_parms()
    emit_http_headers()
    dispatch_action(form)

if __name__ == "__main__":
    try:
        rc = main()
    except KeyboardInterrupt:
        print
        print "  * Keyboard Interrupt"
        rc = 1
    sys.exit(rc)

