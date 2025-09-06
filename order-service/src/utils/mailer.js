const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOrderConfirmationEmail = async (to) => {
  const mailOptions = {
    from: `"blendRUSH App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your blendRUSH Order Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <h2 style="color: #4CAF50;">Thank you for your order!</h2>
        <p>Hi there,</p>
        <p>Your order has been placed successfully. 🎉</p>

        <h3>Order Summary</h3>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">
          If you have any questions, reply to this email or contact our support team.
        </p>
        <p style="font-size: 12px; color: #999;">– The blendRUSH Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};


module.exports = { sendOrderConfirmationEmail };
