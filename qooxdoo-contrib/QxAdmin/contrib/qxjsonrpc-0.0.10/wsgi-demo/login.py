import sys
import logging
import qxjsonrpc
import qxjsonrpc.wsgi
import qxjsonrpc.test.login

sys.stdout=open('/tmp/wsgi-login.out', 'ab')
logger=logging.getLogger('login')
logger.addHandler(logging.FileHandler('/tmp/wsgi-login.log'))
application=qxjsonrpc.wsgi.WSGIApplication(domain='python.cx.hu', logger=logger)
application.setService('login.test', qxjsonrpc.test.login.TestService())

