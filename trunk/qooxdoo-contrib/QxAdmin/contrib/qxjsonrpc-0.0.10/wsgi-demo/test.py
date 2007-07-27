import sys
import logging
import qxjsonrpc
import qxjsonrpc.wsgi
import qxjsonrpc.test.qxrpc
import qxjsonrpc.test.domain
import qxjsonrpc.test.session

sys.stdout=open('/tmp/wsgi-test.out', 'ab')
logger=logging.getLogger('test')
logger.addHandler(logging.FileHandler('/tmp/wsgi-test.log'))
application=qxjsonrpc.wsgi.WSGIApplication(domain='python.cx.hu', logger=logger)
application.setService('qooxdoo.test', qxjsonrpc.test.qxrpc.TestService())
application.setService('domain.test', qxjsonrpc.test.domain.TestService())
application.setService('session.test', qxjsonrpc.test.session.TestService())
