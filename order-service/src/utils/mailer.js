const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOrderConfirmationEmail = async (to, order) => {
  const mailOptions = {
    from: `"blendRUSH App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your blendRUSH Order Confirmation ✅",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <h2 style="color: #4CAF50;">Thank you for your order!</h2>
        <p>Hi there,</p>
        <p>Your order has been placed successfully. 🎉</p>

        <h3>Order Summary</h3>
        <ul>
          ${order.items
            .map(
              (item) => `
            <li>
              ${item.name} × ${item.quantity} – $${(item.price * item.quantity).toFixed(2)}
            </li>
          `
            )
            .join("")}
        </ul>

        <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
        <p><strong>Delivery:</strong> $${order.delivery.toFixed(2)}</p>
        <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
        <p><strong>Total:</strong> <span style="color: #4CAF50; font-size: 16px;">
          $${order.totalAmount.toFixed(2)}
        </span></p>

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
