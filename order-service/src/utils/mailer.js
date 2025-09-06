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
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; text-align: center;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          
          <h1 style="color: #4CAF50; margin-bottom: 20px;">Thank You!</h1>
          <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
            Your order has been placed successfully. 🎉
          </p>

          <p style="font-size: 14px; color: #777; margin-bottom: 30px;">
            We'll notify you once your items are on the way.
          </p>

          <a href="https://blendrush.netlify.app/" style="display: inline-block; padding: 12px 25px; font-size: 14px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">
            Visit Our Store
          </a>

          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;">
          <p style="font-size: 12px; color: #aaa;">If you have any questions, reply to this email or contact our support team.</p>
          <p style="font-size: 12px; color: #aaa;">– The blendRUSH Team</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderConfirmationEmail };
