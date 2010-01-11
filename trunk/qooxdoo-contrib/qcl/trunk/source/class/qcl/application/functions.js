/*
 *
 * utility methods, might be useful at some time
 *
 */
 
function utf8_encode( string )
{
  return unescape( encodeURIComponent( string ) );
}

function utf8_decode( string )
{
  return decodeURIComponent( escape( string ) );
}

function html_entity_decode(str) 
{
  var ta=document.createElement("textarea");
  ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
  return ta.value;
}

function strip_tags(html)
{
  return html.replace(/(<([^>]+)>)/ig,"");
}

function br2nl ( html )
{
  return html.replace(/<br[\s]*\/?>/ig,"\n");
}
