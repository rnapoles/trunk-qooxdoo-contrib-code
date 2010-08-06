/*
 * Code adapted from the example shipped with the Socket.IO server
 */

/*
 * configuration
 */
const HTTP_SERVER_PORT = 8088;

/*
 * import objects
 */
var 
  http   = require('http'), 
  url    = require('url'),
  fs     = require('fs'),
  sys    = require('sys'),
  socket = require('./socket.io');
  

/*
 * http error
 */
var send404 = function(req,res){
  res.writeHead(404);
  res.write('The page you requested cannot be found:' + req.url );
  res.end();
};

/*
 * create a static file server
 */
var server = http.createServer(function(req, res)
{
  var path = url.parse(req.url).pathname;
  var documentRoot = __dirname + "/../../..";
  //console.log( "Requesting  '" + documentRoot + path + "'");
  
  /*
   * serve static files
   * @todo replace with static file server with caching
   * @see http://wiki.github.com/ry/node/modules
   */
  try 
  {
    switch (  path.substr( path.lastIndexOf(".") ) )
    {
      case ".swf":
        res.writeHead(200, { 'Content-Type': 'application/x-shockwave-flash'});
        res.write( fs.readFileSync(  documentRoot + path, 'binary'), 'binary' );
        break;
        
      case ".js": 
        res.writeHead(200, { 'Content-Type': 'text/javascript'});
        res.write(fs.readFileSync(  documentRoot + path, 'utf8' ), 'utf8' );  
        break;
        
      case ".html": 
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.write(fs.readFileSync(  documentRoot + path, 'utf8' ), 'utf8' );
        break;
        
      case ".png":  
      case ".gif":
      case ".ico":
        res.writeHead(200, { 
          'Content-Type': 'image/' + path.substr( path.lastIndexOf(".") +1 )
        });
        res.write(fs.readFileSync(  documentRoot + path, 'binary' ), 'binary' );
        break;
        
      default:
        send404(req,res); 
    }
    
    /*
     * end of response
     */
    res.end();
  } 
  catch(e)
  { 
    console.log(e);
    send404(req,res); 
  }
});

server.listen(HTTP_SERVER_PORT);
    
/*
 * the chat server
 */
var 
  buffer = [],
  members = [],
  membersIndex = {},
  listener = socket.listen(server);
  
var updateMemberList = function( client )
{
 var msg = JSON.stringify({
   'channel' : "/chat/members",
   'data'    : members
 });
 client.broadcast(msg);  
 client.send(msg);
}
    
listener.on('connection', function(client)
{
  // client connects
  client.send(JSON.stringify({ buffer: buffer }));
  updateMemberList(client);

  // register callbacks for this client
  client.on('message', function(message){
    //console.log(message);
    var msg = JSON.parse(message);
    
    // keep member list for display
    switch( msg.channel )
    {
      case "/chat/join":
        membersIndex[client.sessionId] = members.length;
        members.push({
          'user' : msg.data.user,
          'mood' : msg.data.mood
        });
        updateMemberList(client);
        break;  
        
      case "/chat/leave":
        var index = membersIndex[client.sessionId];
        members.splice(index,1);
        delete membersIndex[client.sessionId];
        updateMemberList(client);
        break;        
    }
    
    // add to buffer and limit buffer to 15 entries
    buffer.push(msg);
    if (buffer.length > 15)
    { 
      buffer.shift();
    }
    
    // broadcast to all other clients
    client.broadcast(message);
  });

  // disconnect client
  client.on('disconnect', function(){
    updateMemberList(client);
  });
});