/* ************************************************************************

   Copyright:
     2011 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Theme.define("silverbluetheme.theme.Font",
{
  fonts:
  {
    "default":
    {
      size: (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ? 12 : 11,
      lineHeight: 1.4,
      family: qx.bom.client.Platform.MAC ? [ "Lucida Grande" ] :
        (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ?
        [ "Segoe UI", "Candara" ] :
        [ "Tahoma", "Liberation Sans", "Arial", "sans-serif" ]
    },

    "bold":
    {
      size: (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ? 12 : 11,
      lineHeight: 1.4,
      family: qx.bom.client.Platform.MAC ? [ "Lucida Grande" ] :
        (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ?
        [ "Segoe UI", "Candara" ] :
        [ "Tahoma", "Liberation Sans", "Arial", "sans-serif" ],
      bold: true
    },

    "small":
    {
      size: (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ? 11 : 10,
      lineHeight: 1.4,
      family: qx.bom.client.Platform.MAC ? [ "Lucida Grande" ] :
        (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ?
        [ "Segoe UI", "Candara" ] :
        [ "Tahoma", "Liberation Sans", "Arial", "sans-serif" ]
    },

    "monospace":
    {
      size: 11,
      lineHeight: 1.4,
      family: qx.bom.client.Platform.MAC ? [ "Lucida Console", "Monaco" ] :
        (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ?
        [ "Consolas" ] :
        [ "Consolas", "DejaVu Sans Mono", "Courier New", "monospace" ]
    }
  }
});