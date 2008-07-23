===== Crypto =====

Classes to generate OpenPGP encrypted messages.

Use case:
On server, use GnuPG "gpg --gen-key" to generate a public-private key pair. 
Make the key directory (.gnupg) only accessible to the web application, by 
setting the directory owner/mode. Provide a web service, for example, an RPC 
service, for the qooxdoo app to download the public key block.

In the qooxdoo app, encrypt a plain text message "msg" as follows:
var pgpMsg = openpgp.Encoder.encrypt(serverPubKeyBlock, msg);

This message may now be securely sent to the server app for decryption, for 
example, using an RPC service.
