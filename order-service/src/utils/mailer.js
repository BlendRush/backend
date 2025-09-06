const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOrderSuccessEmail = async (to, order) => {
  const mailOptions = {
    from: `"blendRUSH App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Order Has Been Placed Successfully – blendRUSH",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <h2 style="color: #4CAF50;">🎉 Order Confirmed!</h2>
        <p>Hi there,</p>
        <p>Thank you for shopping with <strong>blendRUSH</strong>! Your order has been placed successfully.</p>
        
        <h3 style="color: #333;">Order Details</h3>
        <ul>
          <li><strong>Order ID:</strong> ${order.orderID}</li>
          <li><strong>Total Amount:</strong> $${order.totalAmount}</li>
          <li><strong>Items:</strong> ${order.items
            .map((item) => `${item.name} (x${item.qty})`)
            .join(", ")}</li>
        </ul>
        
        <p>We’ll notify you once your order is shipped. 🚚</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">If you didn’t place this order, please contact our support team immediately.</p>
        <p style="font-size: 12px; color: #999;">– The blendRUSH Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderSuccessEmail };
