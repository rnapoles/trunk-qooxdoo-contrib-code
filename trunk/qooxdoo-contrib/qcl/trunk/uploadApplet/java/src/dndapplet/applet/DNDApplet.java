/*******************************************************************************
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Original author: Zack Grossbart, see:
 * http://zgrossbart.blogspot.com/2007/11/drag-and-drop-file-uploading-made-easy.html
 * Modified by: Christian Boulanger (info@bibliograph.org)
 *
 ******************************************************************************/

package dndapplet.applet;

import java.applet.*;
import javax.swing.*;
import java.awt.BorderLayout;
import java.awt.event.*;
import java.awt.dnd.*;
import java.awt.datatransfer.*;
import java.util.List;
import java.util.ArrayList;
import java.io.*;
import java.net.*;
import netscape.javascript.*;
import java.security.*;
import java.awt.*;


/**
 * This applet allows users to select files from their file system using drag 
 * and drop and upload them to a remote server. The applet uploads each file
 * individually as a POST request.
 *
 */
public class DNDApplet extends Applet implements DropTargetListener, ActionListener
{
    /**
     * Label on which files are dropped and which shows the user 
     * the files they have selected and their status.
     */
    private JTextPane dropDisplayPane;

    /**
     * The cached content of the EditorPane
     */
    private StringBuffer dropDisplayPaneContent = new StringBuffer("");    
    
    /**
     * The scroll area in which the dropLabel is embedded
     */
    private JScrollPane scrollPane;    
    
    /**
     * The drop target
     */
    private DropTarget dropTarget;    
    
    /**
     * This is the button which starts the upload process
     */
    private JButton uploadButton;

    /**
     * This is the button which starts the upload process
     */
    private JButton cancelButton;    
    
    /**
     * The progress bar
     */
    private JProgressBar progressBar;
    
    /**
     * This is the list of files which will be uploaded
     */
    private ArrayList fileList = new ArrayList();

    /**
     * the window object in which the applet is embedded
     */
    private JSObject window = null;
    
    /**
     * the thread that uploads the files
     */
    private Thread uploaderThread;
    
    /*
     * data properties
     * 
     */
    /**
     * prefix for file names
     */
    private String prefix ="";

    /**
     * user name for protected upload targets
     */
    private String username = null;

    /**
     * password for protected upload targets
     */
    private String password = null;
    
    /**
     * metadata on the documents such as keywords etc. 
     */
    private String metadata = null;
    
    /**
     * The init method creates all of the UI controls and performs all of the 
     * layout of the UI.
     */
    public void init()
    {
      /*
       * the window object
       */
      try
      {
        window = JSObject.getWindow(this);
      }
      catch ( JSException e1 )
      {
        System.out.println("Cannot get a reference to the container window:" + e1.getMessage() );
      }
    
      /*
       * set the layout for the applet
       */
      setLayout(new BorderLayout());

      /* 
       * the drop area displays the files
       * for upload and the response messages
       */
      dropDisplayPane  = new JTextPane();
      dropDisplayPane.setContentType("text/html");
      dropDisplayPane.setEditable(false);
      scrollPane = new JScrollPane(dropDisplayPane);
      scrollPane.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
      dropTarget = new DropTarget(dropDisplayPane, this);
      add(scrollPane, BorderLayout.CENTER);        
      
      /*
       * The upload button
       */
      uploadButton = new JButton("Upload");
      uploadButton.addActionListener(this);
      uploadButton.setEnabled(false);
      
      /*
       * The cancel button
       */
      cancelButton = new JButton("Clear");
      cancelButton.addActionListener(this);
      cancelButton.setEnabled(false);
      
      /*
       * The progress bar
       */
      progressBar = new JProgressBar(0,100);
      progressBar.setEnabled(false);
      progressBar.setStringPainted(true);
      
      /*
       * Button panel
       */
      JPanel panel = new JPanel();
      panel.setLayout(new BorderLayout());
      panel.add(uploadButton,BorderLayout.NORTH);
      panel.add(cancelButton,BorderLayout.CENTER);
      panel.add(progressBar,BorderLayout.SOUTH);
      add(panel, BorderLayout.SOUTH);
    }

    /**
     * public method accessible to JavaScript
     */
    public void setPrefix ( String p )
    {
      prefix = p;
    }

    /**
     * public method accessible to JavaScript
     */
    public String getPrefix ()
    {
      return prefix;
    }  

    /**
     * public method accessible to JavaScript
     */
    public void setUsername ( String u )
    {
      username = u;
    }

    /**
     * public method accessible to JavaScript
     */
    public void setPassword ( String pw )
    {
      password = pw;
    }

    /**
     * public method accessible to JavaScript
     */
    public void setMetadata ( String md )
    {
      metadata = md;
    }    
    
    /**
     * the action that is called when a button is pressed 
     */
    public void actionPerformed(ActionEvent e)
    {
       if ( e.getSource() == uploadButton )
       {
         uploadFiles();
       }
       else if ( e.getSource() == cancelButton )
       {
         if ( uploaderThread != null && uploaderThread.isAlive() )
         {
           SwingUtilities.invokeLater( new Runnable(){
             public void run()
             {
               cancelButton.setText("Cancelling upload..");
               cancelButton.setEnabled(false);
               display("Cancelling upload...");
             }
           });           
           uploaderThread.interrupt();
          try
          {
            uploaderThread.join();         
          }
          catch (InterruptedException e1){}
          finally
          {
            display("<p><font color=red>Upload interrupted.</font></p>"); 
            resetInput();
          }
         }
         else
         {
           display(null);
           resetInput();
         }
       }
    }
    
    /**
     * write message to dropLabel and scroll to bottom
     */
    private void display( String msg )
    {
      if ( msg == null )
      {
        dropDisplayPaneContent = new StringBuffer("");
      }
      else
      {
        dropDisplayPaneContent.append(msg);
      }
      String html = "" 
        + "<html>"
        + "<head><style>body { font: Arial 8px }</style></head>"
        + "<body>"
        + dropDisplayPaneContent.toString()
        + "</body>"
        + "</html>";
      dropDisplayPane.setText( html );
    }
    
    /**
     * resets the user interface
     */
    public void resetInput()
    {
      fileList.clear();
      uploadButton.setText("Upload");
      uploadButton.setEnabled(false);
      cancelButton.setText("Clear");
      cancelButton.setEnabled(false);
    }
    
    /**
     * This method handles uploading the selected files to the server.
     */
    private void uploadFiles()
    {
      /*
       * we start a new thread for the loop
       */
      uploaderThread = new Thread( new Runnable()
      {
        public void run()
        {
          /*
           * clear display
           */
          display(null);
          
          /*
           * call JavaScript function to indicate start of upload
           */
          Long number = new Long(fileList.size());
          String funcName = getParameter("funcNameHandleStartUpload");
          if ( funcName != null && window != null )
          {
            try
            {
              window.call(funcName, new Object[] { number  } );
            }
            catch( JSException e )
            {
              System.out.println(e.getMessage());
            }
          }
          
          /*
           * update applet display
           */
          uploadButton.setText("Uploading files, please wait...");
          cancelButton.setText("Cancel upload");
          uploadButton.setEnabled(false);
          
          /*
           * url
           */
          String url = getDocumentBase().toString();
          String uploadPath = ( getParameter("uploadPath") != null ? getParameter("uploadPath") : "upload.php" ); 
          url = url.substring(0,5).compareTo("file:") == 0 ? "http://localhost" : url.substring(0, url.lastIndexOf("/"));
          url = url + "/" + uploadPath;
          
          /*
           * http connection 
           */
          HttpURLConnection.setFollowRedirects(false);
          HttpURLConnection conn = null;
                    
          /*
           * Authentication hash
           */
          String authHash = null;
          if ( username != null && password != null )
          {
              String s = username + ":" + password;                
              authHash = new sun.misc.BASE64Encoder().encode(s.getBytes());   
          }
              
          /* for each file, make an upload request
           * 
           */
          for (int i = 0; i < fileList.size(); i++ ) 
          {
            /*
             * check for interrupt
             */
            if ( Thread.currentThread().isInterrupted() )
            {
              continue;
            }
            
            /*
             * For each file we will create a stream the file into that entry.
             */
            File f = (File) fileList.get(i);                
    
            /*
             * call JavaScript function to indicate current upload
             */
            String funcName2 = getParameter("funcNameHandleCurrentUpload");
            if ( funcName2 != null && window != null )
            {
              try
              {
                window.call(funcName2, new Object[] { f.getName() } );
              }
              catch( JSException e3 )
              {
                System.out.println(e3.getMessage());
              }            
            }
            
            /*
             * display upload
             */
            int fileSize = (int) Math.floor(  (double) f.length() / 1024 );
            final String msg = "Uploading " + f.getName() + " (" + fileSize + "kB) ...<br>";
            SwingUtilities.invokeLater( new Runnable(){
              public void run()
              {
                display( msg );
              }
            });
            
            
            /*
             * filename with prefix
             */
            String fileName = prefix + f.getName();
            
            try 
            {         
              
              /*
               * create reusable connection
               */
              conn = (HttpURLConnection) new URL(url).openConnection();
              
              /*
               * Authorize connection if necessary
               */
              if ( authHash != null )
              {
                conn.setDoInput( true );
                conn.setRequestProperty( "Authorization", "Basic " + authHash );
                conn.connect();
                conn.disconnect();
              }
              
              /*
               * Create and setup our HTTP POST connection.  
               */    
              conn.setRequestMethod("POST");

              /*
               * boundary string
               */
              String boundary = "boundary220394209402349823";
              
              /*
               * tail string
               */
              String tail    = "\r\n--" + boundary + "--\r\n";              
              
              /*
               * Set content type
               */
              conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary );
              
              /*
               * We intend to send output to the server.
               */
              conn.setDoOutput(true);

              /*
               * Create metadata section 
               */
              String metadataPart = "--" + boundary + "\r\n"
                + "Content-Disposition: form-data; name=\"metadata\"\r\n\r\n"
                + metadata + "\r\n";          
             
              /*
               * Create file data header 
               */
              String fileHeader1 = "--" + boundary + "\r\n"
                + "Content-Disposition: form-data; name=\"uploadfile\"; filename=\"" + fileName + "\"\r\n"
                + "Content-Type: application/octet-stream\r\n"
                + "Content-Transfer-Encoding: binary\r\n";              
              
              long   fileLength  = f.length() + tail.length();                          
              String fileHeader2 = "Content-length: " + fileLength + "\r\n";
              String fileHeader  = fileHeader1 + fileHeader2 + "\r\n";   
              
              /*
               * non-binary part of message
               */
              String stringData = metadataPart + fileHeader;
              
              /*
               * Length of whole request 
               */
              long requestLength = stringData.length() + fileLength ;
              conn.setRequestProperty("Content-length", "" + requestLength );

              /*
               * prevent buffering so that the progress bar actually 
               * displays the upload progress
               */
              conn.setFixedLengthStreamingMode((int) requestLength );
              
              /*
               * Connect to the server.
               */
              conn.connect();             
              
              /*
               * Initialize output stream
               */
              DataOutputStream out = new DataOutputStream( conn.getOutputStream() );
              
              /*
               * write header 
               */
              out.writeBytes(stringData);                            
              out.flush();
              
              /* 
               * write data and update progress bar
               */
              progressBar.setMinimum(0);
              progressBar.setMaximum((int) f.length());
              
              int progress = 0;
              int bytesRead = 0;
              byte b[] = new byte[1024];
              BufferedInputStream bufin = new BufferedInputStream(new FileInputStream(f));
              while ((bytesRead = bufin.read(b)) != -1) 
              {
                
                /*
                 * check for interrupt
                 */
                if ( Thread.currentThread().isInterrupted() )
                {
                  // todo : graceful abort
                }
                
                /*
                 * write output
                 */
                out.write(b, 0, bytesRead); 
                out.flush();
                progress += bytesRead;
                
                /*
                 * update progress bar
                 */
                final int p = progress;
                SwingUtilities.invokeLater( new Runnable(){
                  public void run()
                  {
                    progressBar.setValue(p);
                    progressBar.revalidate();
                  }
                });   

              }
              
              /*
               * Write closing boundary and close stream
               */
              out.writeBytes(tail);
              out.flush();
              out.close();
              
              /*
               * Get server response
               */
              BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
              String line;
              while ((line = rd.readLine()) != null) 
              {
                final String l = line;
                SwingUtilities.invokeLater( new Runnable(){
                  public void run()
                  {
                    display( l + "<br>" );
                  }
                });
              }
                
              try 
              {
                /*
                 * If we got a 401 (unauthorized), we can't get that data. We will
                 * get an IOException. This makes no sense since a 401 does not
                 * consitute an IOException, it just says we need to provide the
                 * username again.
                 */
                int responseCode        = conn.getResponseCode();
                String responseMessage  = conn.getResponseMessage();
              } 
              catch (IOException ioe) 
              {
                  System.out.println(ioe.getMessage());
              }
      
              //System.out.println("conn.getResponseCode(): " + responseCode);
              //System.out.println("conn.getResponseMessage(): " + responseMessage);   
            } 
            catch (Exception e) 
            {
              String funcName3 = getParameter("funcNameHandleError");
              if ( funcName3 != null && window != null )
              {
                try
                {
                  window.call(funcName3, new Object[] { e.getMessage() } );
                }
                catch ( JSException e3 )
                {
                  System.out.println( e3.getMessage() );
                }              
              }
              display("<font color=red>An error occurred: "+e.getMessage()+"</font>");
              e.printStackTrace();
            } 
            finally 
            {
              /*
               * Once we are done we want to make sure to disconnect from the server.
               */
              if (conn != null) conn.disconnect();
            }
          }
  
          /*
           * reset list and display
           */
          fileList.clear();
          uploadButton.setText("Upload finished.");
          cancelButton.setText("Clear");
          cancelButton.setEnabled(false);
          
          /*
           * call JavaScript function to indicate start of upload
           */
          String funcName4 = getParameter("funcNameHandleEndUpload");
          if ( funcName4 != null && window != null )
          {
            try
            {
              window.call(funcName4, new Object[] { null } );
            }
            catch ( JSException e4 )
            {
              System.out.println( e4.getMessage() );
            }
          }
        }
      } );
      
      uploaderThread.start();
    }

    public void dragExit(DropTargetEvent dte)
    {
        // System.out.println("dragExit(" + dte + ")");
    }

    public void dragEnter(DropTargetDragEvent dtde)
    {
        // System.out.println("dragenter(" + dtde + ")");
    }

    public void dragOver(DropTargetDragEvent dtde)
    {
        // System.out.println("dragOver(" + dtde + ")");
    }

    public void dropActionChanged(DropTargetDragEvent dtde)
    {
        // System.out.println("dropActionChanged(" + dtde + ")");
    }

    /**
     * This method will be called when the user drops a file on our target label.
     * 
     * @param dtde
     */
    public void drop(DropTargetDropEvent dtde)
    {
        int action = dtde.getDropAction();

        /*
         * We have to tell Java that we are going to accept this drop before
         * we try to access any of the data.
         */
        dtde.acceptDrop(action);

        fromTransferable(dtde.getTransferable());

        /*
         * Once the drop event is complete we need to notify Java again so it
         * can reset the cursor and finish showing the drop behavior.
         */
        dtde.dropComplete(true);
    }

    /**
     * This is a helper method to get the data from the drop event.
     * 
     * @param t
     */
    private void fromTransferable(Transferable t)
    {
        if (t == null) return;

        /*
         * The user may have dropped a file or anything else from any application
         * running on their computer.  This interaction is handled with data flavors.
         * For example, text copied from OpenOffice might have one flavor which 
         * contains the text with formatting information and another flavor which
         * contains the text without any of this information.  We need to look for
         * the data flavor we know how to support and read the list of files from it.
         */
        try 
        {

          if ( t.isDataFlavorSupported( DataFlavor.javaFileListFlavor) ) 
          {
            /*
             * We are looking for the list of files data flavor.  This will be a
             * list of the paths to the files the user dragged and dropped on to
             * our application.
             */
            List list = (List) t.getTransferData(DataFlavor.javaFileListFlavor);
            
            /*
             * only add to the list if not already in the list.
             */
            if ( ! fileList.containsAll(list) )
            {
              fileList.addAll(list);
              uploadButton.setText("Upload " + fileList.size() + " files.");
            }
            
            display(null); // clear display
            
            /*
             * We are going to take the path to each file and add it to the list
             * so the user can see which files they have selected.
             */
            for (int i = 0; i < fileList.size(); i++) 
            {
              File f = (File) fileList.get(i);
              String fileName = f.getName();
              int fileSize = (int) Math.floor(  (double) f.length() / 1024 );
              display( fileName + " (" + fileSize + " kB)<br>" );
            }

            /*
             * Now that we have at least one file to upload we can enable the 
             * upload button.
             */
            uploadButton.setEnabled(true);
            cancelButton.setEnabled(true);           
          } 
          else 
          {
            /*
             * pass other data flavors to javascript
             */
            DataFlavor flavors[] = t.getTransferDataFlavors();
            DataFlavor df = DataFlavor.selectBestTextFlavor(flavors);
            String mimeType = df.getMimeType();
            String representationClass = df.getDefaultRepresentationClassAsString();
            
            //JOptionPane.showMessageDialog(this, representationClass);
            if ( representationClass == "java.io.InputStream" )
            {
              /*
               * mimetype can be read as a string
               */
              StringBuffer sb = new StringBuffer("");
              Object td = t.getTransferData(df);
              InputStreamReader r;
              
              if (td instanceof ByteArrayInputStream)
              {
                r = new InputStreamReader( (ByteArrayInputStream) td);
              }                
              else
              {
                r = (InputStreamReader) td;
              }
              
              String line;
              BufferedReader in = new BufferedReader( r );
              while ((line = in.readLine()) != null) 
              {
                sb.append(line);
              }
                            
              String funcName1 = getParameter("funcNameHandleStringMimeType");   
              
              if ( funcName1 != null && window != null )
              {
                try
                {
                  window.call(funcName1, new Object[] { mimeType, sb.toString() } );
                }
                catch ( JSException e1 )
                {
                  System.out.println( e1.getMessage() );
                }                
              }
            }
            else
            {
              /*
               * unknown mimetype
               */
              Object data = t.getTransferData(df);    
              String funcName2 = getParameter("funcNameHandleUnknownMimeType");
              if ( funcName2 != null && window != null )
              {
                try
                {
                  window.call(funcName2, new Object[] { mimeType, data } );
                }
                catch ( JSException e2 )
                {
                  System.out.println( e2.getMessage() );
                }  
              }
            }
          }
        } 
        catch (NullPointerException npe)
        {
          window.call("alert", new Object[] { "Internal error. Please restart your browser and make sure the upload applet is only running in  browser window."  } );
        }
        catch (Exception ex) 
        {
            // todo : print to java console or alert box
          ex.printStackTrace();
          //JOptionPane.showMessageDialog(this, "error ");
        }
    }
}
