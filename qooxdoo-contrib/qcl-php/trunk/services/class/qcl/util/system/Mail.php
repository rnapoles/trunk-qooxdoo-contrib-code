<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

qcl_import("qcl_core_Object");

/**
 * A wrapper around mail()
 *
 */
class qcl_util_system_Mail
  extends qcl_core_Object
{

  /**
   * The name of the sender
   * @var string
   */
  public $sender;

  /**
   * The email address of the sender.
   * @var string
   */
  public $senderEmail;

  /**
   * The name of the recipient
   * @var string
   */
  public $recipient;


  /**
   * The email address of the recipient
   * @var string
   */
  public $recipientEmail;


  /**
   * The text body of the message
   * @var string
   */
  public $body;

  /**
   * The subject line of the message
   * @var string
   */
  public $subject;

  /**
   * Additional headers
   * @var array
   */
  public $additionalHeaders = array();

  /**
   * Constructor
   * @return void
   */
  public function __construct( $data=null )
  {
    /*
     * set initial values
     */
    if ( is_array( $data ) )
    {
      $this->set( $data );
    }

    /*
     * configure headers
     */
    $this->addHeader( 'X-Mailer: PHP/' . phpversion() );
  }

  /**
   * Setter for sender
   * @param string $sender
   * @return void
   */
  public function setSender( $sender )
  {
    qcl_assert_valid_string( $sender, "Invalid sender");
    $this->sender = $sender;
  }

  /**
   * Setter for sender email
   * @param string $senderEmail
   * @return void
   */
  public function setSenderEmail( $senderEmail )
  {
    qcl_assert_valid_email( $senderEmail, "Invalid sender email" );
    $this->senderEmail = $senderEmail;
  }

  /**
   * Setter for recipient
   * @param string $recipient
   * @return void
   */
  public function setRecipient( $recipient )
  {
    qcl_assert_valid_string( $recipient, "Invalid recipient");
    $this->recipient = $recipient;
  }

  /**
   * Setter for recipient email
   * @param string $recipientEmail
   * @return void
   */
  public function setRecipientEmail( $recipientEmail )
  {
    qcl_assert_valid_email( $recipientEmail, "Invalid recipient email" );
    $this->recipientEmail = $recipientEmail;
  }

  /**
   * Setter for body
   * @param string $body
   * @return void
   */
  public function setBody( $body )
  {
    qcl_assert_valid_string( $body, "No body text");
    $this->body = $body;
  }

  /**
   * Setter for subject
   * @param string $subject
   * @return void
   */
  public function setSubject( $subject )
  {
    qcl_assert_valid_string( $subject, "No subject text");
    $this->subject = $subject;
  }

  /**
   * Setter for additional headers
   * @param array $additionalHeaders
   * @return void
   */
  public function setAdditionalHeaders( $additionalHeaders )
  {
    qcl_assert_array( $additionalHeaders, "Additional headers must be an array");
    $this->additionalHeaders = $additionalHeaders;
  }

  /**
   * Add a mail header
   * @param string $header
   * @return void
   */
  public function addHeader( $header )
  {
    qcl_assert_valid_string( $header, "Invalid header"); // FIXME use regexpr
    $this->additionalHeaders[] = $header;
  }

  /**
   * Returns an array of properties necessary to send the email
   * @return array
   */
  protected function requiredProperties()
  {
    return array("senderEmail","recipientEmail","subject","body");
  }

  /**
   * Send email
   * @return
   */
  public function send()
  {
    /*
     * check if all necessary properties have been set
     */
    foreach( $this->requiredProperties() as $property )
    {
      if ( ! $this->get($property) )
      {
        throw new LogicException("Cannot send email. Property '$property' has not been set." );
      }
    }

    /*
     * sender
     */
    if ( $this->sender )
    {
      $sender = "{$this->sender} <{$this->senderEmail}>";
    }
    else
    {
      $sender = $this->senderEmail;
    }

    /*
     * recipient
     */
    if ( $this->recipient )
    {
      $recipient = "{$this->recipient} <{$this->recipientEmail}>";
    }
    else
    {
      $recipient = $this->recipientEmail;
    }

    /*
     * additional headers
     */
    $this->addHeader("From: $sender" );
    $this->addHeader("Reply-To: $sender");
    $headers = implode("\r\n", $this->additionalHeaders ) . "\r\n";

    $this->log( sprintf(
      "Sending email from '%s' to '%s' with subject '%s'",
      $sender, $recipient, $this->subject
    ), QCL_LOG_MAIL );

    /*
     * send the mail
     */
    $success = mail($recipient, $this->subject, $this->body, $headers);
    if ( ! $success )
    {
      throw new qcl_util_system_MailException("Could not send mail");
    }
  }

  /**
   * Validate an email address.
   * Provide email address (raw input)
   * Returns true if the email address has the email
   * address format and the domain exists.
   * @author (c) 2007 Douglas Lovell
   * @see http://www.linuxjournal.com/article/9585
   * @param string $email
   * @return bool
   */
  static public function isValidEmail( $email )
  {
    $isValid = true;
    $atIndex = strrpos($email, "@");
    if (is_bool($atIndex) && !$atIndex)
    {
      $isValid = false;
    }
    else
    {
      $domain = substr($email, $atIndex+1);
      $local = substr($email, 0, $atIndex);
      $localLen = strlen($local);
      $domainLen = strlen($domain);
      if ($localLen < 1 || $localLen > 64)
      {
        // local part length exceeded
        $isValid = false;
      }
      else if ($domainLen < 1 || $domainLen > 255)
      {
        // domain part length exceeded
        $isValid = false;
      }
      else if ($local[0] == '.' || $local[$localLen-1] == '.')
      {
        // local part starts or ends with '.'
        $isValid = false;
      }
      else if (preg_match('/\\.\\./', $local))
      {
        // local part has two consecutive dots
        $isValid = false;
      }
      else if (!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain))
      {
        // character not valid in domain part
        $isValid = false;
      }
      else if (preg_match('/\\.\\./', $domain))
      {
        // domain part has two consecutive dots
        $isValid = false;
      }
      else if (!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/',
      str_replace("\\\\","",$local)))
      {
        // character not valid in local part unless
        // local part is quoted
        if (!preg_match('/^"(\\\\"|[^"])+"$/',
        str_replace("\\\\","",$local)))
        {
          $isValid = false;
        }
      }
      if ($isValid && !(checkdnsrr($domain,"MX") || checkdnsrr($domain,"A")))
      {
        // domain not found in DNS
        $isValid = false;
      }
    }
    return $isValid;
  }

  /*
   * @todo send attachments
   * See:  http://www.shelldorado.com/articles/mailattachments.html
      For example:
      $cmd = "echo '$BODY_TEXT' | mutt -s '$SUBJECT' -a '$filename_1' -a '$filename_2' '$email'";
      exec ($cmd);
      or multipart:

      The 'boundary' must be defined with double quotes, not apostrophes.

     $headers .= "Content-Type: multipart/alternative;boundary=\"$boundary\";\n\n";
   */
}
?>