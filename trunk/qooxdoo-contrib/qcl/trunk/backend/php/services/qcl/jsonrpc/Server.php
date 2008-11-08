<?php

/**
 * Rewriting the server oo-style
 */
class qcl_jsonrpc_Server
{
  function start()
  {
    include "qcl/jsonrpc/dispatcher.php";
  }
  
}

/*
 * start server
 */
qcl_jsonrpc_Server::start();