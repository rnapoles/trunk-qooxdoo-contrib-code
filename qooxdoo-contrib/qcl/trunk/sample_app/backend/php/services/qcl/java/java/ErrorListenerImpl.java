import javax.xml.transform.ErrorListener;
import javax.xml.transform.TransformerException;
import java.io.StringWriter;

public class ErrorListenerImpl implements ErrorListener
{
  
  protected StringWriter writer;
    
  public ErrorListenerImpl(StringWriter writer)
  {
      this.writer = writer;
  }

  /**
   * Receive notification of a recoverable error.
   * @param exception
   */
  public void error(TransformerException exception)
  {
    this.writer.write("Error occurred :"+exception.getMessage());
  }

   /**
   * Receive notification of a non-recoverable error.
   * @param exception
   */
  public void fatalError(TransformerException exception)
  {
    this.writer.write("Fatal Error occurred :"+exception.getMessage());
  }

  /**
   * Receive notification of a warning.
   * @param exception
   */
  public void warning(TransformerException exception)
  {
    this.writer.write("Warning occurred :"+exception.getMessage());
  }
  
}