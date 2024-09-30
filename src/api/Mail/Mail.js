const nodemailer = require("nodemailer");

class Mail {
  // Constructor to create a transporter instance
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      host: process.env.mail_host,
      port: process.env.mail_port,
      secure: true,
      auth: {
        user: process.env.mail_auth_user,
        pass: process.env.mail_auth_password,
      },
    });
  }

  /**
   *
   * @param {String} recipientEmail
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async send(recipientEmail, data) {
    const mailOptions = {
      from: process.env.mail_auth_user,
      to: recipientEmail,
      subject: data.subject,
      html: data.html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId }; // Return success status and message ID
    } catch (error) {
      console.error("Error sending email:", error); // Log the error for debugging
      throw new Error("Failed to send OTP email");
    }
  }
}

module.exports = Mail;
