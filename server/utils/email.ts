import { Resend } from "resend";
import { Order, OrderConfirmationEmail } from "@shared/api";

const resend = new Resend(process.env.RESEND_API_KEY);

const SENDER_EMAIL = process.env.SENDER_EMAIL || "orders@beatsbysiba.com";

export async function sendOrderConfirmationEmail(
  emailData: OrderConfirmationEmail,
): Promise<boolean> {
  try {
    const { to, orderNumber, order } = emailData;

    const itemsHtml = order.items
      .map(
        (item) =>
          `
      <tr style="border-bottom: 1px solid #e0e0e0;">
        <td style="padding: 12px 0; text-align: left;">${item.name}</td>
        <td style="padding: 12px 0; text-align: center;">x${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right;">R${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `,
      )
      .join("");

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #000;
            color: #d4af37;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-family: 'Playfair Display', serif;
          }
          .content {
            background-color: #fff;
            padding: 30px;
            margin-top: 20px;
          }
          .order-number {
            background-color: #f5f5f5;
            padding: 15px;
            border-left: 4px solid #d4af37;
            margin: 20px 0;
          }
          .order-number p {
            margin: 0;
            color: #666;
          }
          .order-number strong {
            font-size: 16px;
            color: #000;
          }
          table {
            width: 100%;
            margin: 20px 0;
          }
          th {
            background-color: #f9f9f9;
            padding: 10px 0;
            text-align: left;
            border-bottom: 2px solid #d4af37;
          }
          .summary {
            background-color: #f9f9f9;
            padding: 15px;
            margin-top: 20px;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e0e0e0;
          }
          .summary-row:last-child {
            border-bottom: none;
            font-weight: bold;
            font-size: 16px;
            color: #d4af37;
          }
          .tracking {
            background-color: #f0f0f0;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
          }
          .footer {
            background-color: #000;
            color: #fff;
            text-align: center;
            padding: 20px;
            margin-top: 20px;
            font-size: 12px;
          }
          .footer a {
            color: #d4af37;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Beats by Siba</h1>
            <p style="margin: 5px 0; color: #d4af37;">Hair Edition</p>
          </div>

          <div class="content">
            <h2 style="color: #000;">Order Confirmation</h2>
            <p>Thank you for your purchase! We're thrilled to serve you.</p>

            <div class="order-number">
              <p>Order Number</p>
              <strong>${orderNumber}</strong>
            </div>

            <h3 style="margin-top: 25px; margin-bottom: 15px;">Order Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="summary">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>R${order.subtotal.toLocaleString()}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span>R${order.shippingCost.toLocaleString()}</span>
              </div>
              <div class="summary-row">
                <span>Tax</span>
                <span>R${Math.round(order.tax).toLocaleString()}</span>
              </div>
              <div class="summary-row">
                <span>Total</span>
                <span>R${Math.round(order.total).toLocaleString()}</span>
              </div>
            </div>

            <h3 style="margin-top: 25px; margin-bottom: 10px;">Shipping Address</h3>
            <p style="margin: 0; color: #666;">
              ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
              ${order.shippingAddress.country}
            </p>

            <div class="tracking">
              <h4 style="margin-top: 0;">Track Your Order</h4>
              <p>Use your order number to track your package:</p>
              <strong>${orderNumber}</strong>
              <p style="margin-top: 10px; font-size: 12px; color: #666;">
                Visit our website to track your shipment in real-time.
              </p>
            </div>

            <p style="margin-top: 25px; color: #666; font-style: italic;">
              At Beats by Siba, quality is the standard and confidence is the result.
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">© 2026 Beats by Siba. Designed with confidence. All rights reserved.</p>
            <p style="margin: 10px 0 0 0; font-size: 11px;">
              Questions? Contact us at <a href="mailto:support@beatsbysiba.com">support@beatsbysiba.com</a>
            </p>
          </div>
        </div>
      </body>
    </html>
    `;

    const result = await resend.emails.send({
      from: SENDER_EMAIL,
      to,
      subject: `Order Confirmation - ${orderNumber}`,
      html,
    });

    if (result.error) {
      console.error("Email send error:", result.error);
      return false;
    }

    console.log("Order confirmation email sent:", result.data?.id);
    return true;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    // Don't throw - order should still be created even if email fails
    return false;
  }
}
