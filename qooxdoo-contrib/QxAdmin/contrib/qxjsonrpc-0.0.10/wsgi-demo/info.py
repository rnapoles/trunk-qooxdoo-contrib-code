import sys
import logging
import qxjsonrpc
import qxjsonrpc.wsgi

class InfoService(object):
    @qxjsonrpc.public
    def version(self):
	return sys.version

sys.stdout=open('/tmp/wsgi-info.out', 'ab')
logger=logging.getLogger('info')
logger.addHandler(logging.FileHandler('/tmp/wsgi-info.log'))
application=qxjsonrpc.wsgi.WSGIApplication(domain='python.cx.hu', logger=logger)
application.setService('info', InfoService())
