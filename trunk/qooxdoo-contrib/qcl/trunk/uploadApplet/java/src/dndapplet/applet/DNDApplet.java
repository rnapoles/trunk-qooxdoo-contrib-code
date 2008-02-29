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
 * Modified by: Christian Boulanger (cboulanger@sourceforge.net)
 *
 ******************************************************************************/

package dndapplet.applet;

import java.applet.*;

import javax.swing.*;

import com.apple.crypto.provider.MessageDigestMD5;

import sun.security.provider.MD5;

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

/**
 * This applet allows users to select files from their file system using drag 
 * and drop and upload them to a remote server. The applet uploads each file
 * individually as a POST request.
 *
 */
public class DNDApplet extends Applet implements DropTargetListener, ActionListener
{
    /**
     * This label shows the user the files they have selected and their status.
     */
    private JLabel dropLabel;
    /**
     * This is the button which starts the upload process
     */
    private JButton uploadButton;
    
    /**
     * This is the list of files which will be uploaded
     */
    private ArrayList fileList = new ArrayList();
    
    /**
     * prefix for file names
     */
    private String prefix ="";
    
    /**
     * The init method creates all of the UI controls and performs all of the 
     * layout of the UI.
     */
    public void init()
    {
        setLayout(new BorderLayout());

        /* 
         * the drop area displays the files
         * for upload and the response messages
         * 
         */
        dropLabel = new JLabel("Drag and Drop Files Here"); 
        //dropLabel.setSize( this.getWidth(), this.getWidth() );
        JScrollPane scroll = new JScrollPane(dropLabel);
        scroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        DropTarget dt2 = new DropTarget(dropLabel, this);
        add(scroll, BorderLayout.CENTER);        
        
        /*
         * The upload button
         */
        uploadButton = new JButton("Upload");
        uploadButton.addActionListener(this);
        uploadButton.setEnabled(false);
        add(uploadButton, BorderLayout.SOUTH);

    }

    /**
     * public method accessible to javascript
     */
    public void setPrefix ( String p )
    {
    	prefix = p;
    }

    /**
     * public method accessible to javascript
     */
    public String getPrefix ()
    {
    	return prefix;
    }    
    
    
    /**
     * This method handles uploading the selected files to the server.
     */
    private void uploadFiles()
    {
    	uploadButton.setText("Uploading files, please wait...");
    	uploadButton.setEnabled(false);
    	repaint();
    	
    	HttpURLConnection conn = null;

        String url = getDocumentBase().toString();
        String uploadPath = ( getParameter("uploadPath") != null ? getParameter("uploadPath") : "upload.php" ); 
        url = url.substring(0,5).compareTo("file:") == 0 ? "http://localhost" : url.substring(0, url.lastIndexOf("/"));
        url = url + "/" + uploadPath;
        
        //System.out.println(url);
        
        dropLabel.setText("<html><font size=2>");
        
        /* for each file, make an upload request
         * 
         */
        for (int i = 0; i < fileList.size(); i++ ) 
        {

			/*
		     * For each file we will create a stream the file into that entry.
		     */
		    File f = (File) fileList.get(i);     	        	
			
		    /*
		     * display upload
		     */
		    int fileSize = (int) Math.floor(  (double) f.length() / 1024 );
		    dropLabel.setText(dropLabel.getText() + "<P>Uploading " + f.getName() + " (" + fileSize + "kB) ...</P>" );                
		    repaint();
		    
		    /**
		     * filename with prefix
		     */
		    String fileName = prefix + f.getName();
		    
            try 
            {        	
            	/*
            	 * create md5 hash for file
            	 */
                MessageDigest md5 = MessageDigest.getInstance("MD5");
                md5.reset();
                md5.update(fileName.getBytes());
                byte[] result = md5.digest();
                StringBuffer hexString = new StringBuffer();
                for (int j=0; j<result.length; j++) {
                    hexString.append(Integer.toHexString(0xFF & result[j]));
                }
                String hash = hexString.toString();
                
            	/*
	             * Create and setup our HTTP POST connection.  
	             */
	            conn = (HttpURLConnection) new URL(url).openConnection();
	            conn.setRequestMethod("POST");
	            conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + hash );
	            
	            conn.setFollowRedirects(false);
	            
	            /*
	             * Most HTTP connections do not have any ouput.  The most common case
	             * is to set up a number of parameters and then make a request to the
	             * server without any additional data.  We want to send the file data
	             * up to the server so we need to explicitely tell the connection that
	             * we intend to send output to the server.
	             */
	            conn.setDoOutput(true);
	
	            /*
	             * Now that we have set all the connection parameters and prepared all
	             * the data we are ready to connect to the server.
	             */
	            conn.connect();            	
	            
	            /*
	             * output stream
	             */
	            DataOutputStream raw = new DataOutputStream( conn.getOutputStream() );
	            Writer wr = new OutputStreamWriter(raw);
	            
	            /*
	             * multipart header
	             */
	            String mheader = "--" + hash + "\r\n"
	            	+ "Content-Disposition: form-data; name=\"uploadfile\"; filename=\"" + fileName + "\"\r\n";
	            wr.write(mheader);	            
	            
	            /*
	             * content-length, todo: calculate properly!
	             */
	            //long contentLength = f.length() + mheader.length() + hash.length() + 3;		           	           
	            //wr.write("Content-length: " + contentLength + "\r\n" );
	            
	            /*
	             * end of multipart header 
	             */
	            wr.write("\r\n" );	            	            
	            wr.flush();

	            /*
	             * file content
	             */
	            DataInputStream fis = new DataInputStream( new BufferedInputStream( new FileInputStream(f) ) );
	            byte[] data = new byte[ (int) f.length() ];
	            fis.readFully(data);
	            fis.close();
	            raw.write(data);
	            raw.flush();
	            
	            /*
	             * write closing boundary
	             */
	            wr.write("\r\n--" + hash + "--\r\n");
	            wr.flush();
	            
	            /*
	             * close streams
	             */
	            wr.close();
	            raw.close();
	            
	            /*
	             * get server response
	             */
	            BufferedReader rd = new BufferedReader(new
	            		InputStreamReader(conn.getInputStream()));
        		String line;
        		while ((line = rd.readLine()) != null) {
        			dropLabel.setText( dropLabel.getText() + line );
        			repaint();
        		}
	            
	            try 
	            {
	                /*
	                 * If we got a 401 (unauthorized), we can't get that data. We will
	                 * get an IOException. This makes no sense since a 401 does not
	                 * consitute an IOException, it just says we need to provide the
	                 * username again.
	                 */
	                int responseCode 		= conn.getResponseCode();
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
	        	dropLabel.setText("<html><font size=2>There was a problem. Could not upload</font></html>");
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

        fileList.clear();
        uploadButton.setText("Upload finished.");

    }

    public void actionPerformed(ActionEvent e)
    {
       uploadFiles();
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
        if (t == null)
            return;

        /*
         * The user may have dropped a file or anything else from any application
         * running on their computer.  This interaction is handled with data flavors.
         * For example, text copied from OpenOffice might have one flavor which 
         * contains the text with formatting information and another flavor which
         * contains the text without any of this information.  We need to look for
         * the data flavor we know how to support and read the list of files from it.
         */
        try {
            DataFlavor flavors[] = t.getTransferDataFlavors();
            
            if (t.isDataFlavorSupported(DataFlavor.javaFileListFlavor)) {
                /*
                 * We are looking for the list of files data flavor.  This will be a
                 * list of the paths to the files the user dragged and dropped on to
                 * our application.
                 */
                List list = (List) t.getTransferData(DataFlavor.javaFileListFlavor);
                
                /**
                 * only add to the list if not already in the list.
                 */
                if ( ! fileList.containsAll(list) )
                {
                	fileList.addAll(list);
                	uploadButton.setText("Upload " + fileList.size() + " files.");
                }
                
                /*
                 * We are going to take the path to each file and add it to the list
                 * so the user can see which files they have selected.
                 */
                StringBuffer sb = new StringBuffer();
                sb.append("<HTML><FONT size=2>");

                for (int i = 0; i < fileList.size(); i++) {
                    File f = (File) fileList.get(i);
                    String fileName = f.getName();
                    sb.append("<P>" + fileName + "</P>\n");
                }

                sb.append("</FONT></HTML>");

                dropLabel.setText(sb.toString());

                /*
                 * Now that we have at least one file to upload we can enable the 
                 * upload button.
                 */
                uploadButton.setEnabled(true);
            } 
            else 
            {
                /*
                 * pass other data flavors to javascript
                 */
                DataFlavor df = DataFlavor.selectBestTextFlavor(flavors);
                String mimeType = df.getMimeType();
                String representationClass = df.getDefaultRepresentationClassAsString();
                JSObject w = JSObject.getWindow(this);
                
                //JOptionPane.showMessageDialog(this, representationClass);
                if ( representationClass == "java.io.InputStream" )
                {
                	/*
                	 * mimetype can be read as a string
                	 */
                	InputStreamReader r = (InputStreamReader) t.getTransferData(df);
                	BufferedReader in = new BufferedReader( r );
            		String line;
            		StringBuffer sb = new StringBuffer("");
            		while ((line = in.readLine()) != null) 
            		{
            			sb.append(line);
            		}
	                String funcName = getParameter("funcNameStringMimeType");                
	                if ( funcName != null)
	                {
	                	w.call(funcName, new Object[] { mimeType, sb.toString() } );
	                }
                }
                else
                {
	                /*
	                 * unknown mimetype
	                 */
	                Object data = t.getTransferData(df);    
	                String funcName = getParameter("funcNameUnknownMimeType");                
	                if ( funcName != null)
	                {
	                	w.call(funcName, new Object[] { mimeType, data } );
	                }
                }
            }
        } catch (Exception ex) {
            // todo : print to java console or alert box
        	ex.printStackTrace();
        	//JOptionPane.showMessageDialog(this, "error ");
        }
    }
}
