#!/usr/local/bin/python

import sys, os, re
import cgi
import cgitb; cgitb.enable()


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

def do_make():
    # our output is text/plain
    print "Content-type: text/plain"
    print
    os.chdir("/tmp/qx-bbb/qooxdoo-0.8-pre-sdk/frontend/application/demobrowser/")
    rc = invoke_external("make build")
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
#    for line in makefile_in.read():
#        if line.match(INTRO):
#            inIntro = True
#        while inIntro == True:
#            makefile_out.write(line)
#            if line.match(INTRO_END):
#                inIntro = False
#        if line.match(PARAM):
#            makefile_out.write(param, lookup(param,parms))
#        if line.match(FOOTER):
#            # write rest of template
#            pass
    print "dumping json map:"
    for key in makvars:
        print key, " : ", makvars[key]


def dispatch_action(form):
    if 'action' in form:
        action = form['action'].value
        if (action == 'save'): # save to makefile
            do_save(form)
        elif (action == 'run'): # run make file
            do_make(form)
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

