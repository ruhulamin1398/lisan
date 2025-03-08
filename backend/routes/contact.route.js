const express = require("express");
const ContactModel = require("../models/Contact.model");
const { sentEMail } = require("../controllers/sendEmail.controller");
const router = express.Router();

// Profile route
router.post("/new", async (req, res) => {
  const { name, phone, type, email, message } = req.body;
  const contact = new ContactModel({
    name,
    phone,
    type,
    email,
    message,
  });
  const savedContact = await contact.save();

  const bodyHtml = `<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Service Request Confirmation</title><style>body {font-family: 'Arial', sans-serif;background-color: #f8f9fa;margin: 0;padding: 20px;}.container {max-width: 600px;background: #ffffff;padding: 30px;border-radius: 12px;box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);margin: 0 auto;}.header {background: #007bff;color: #ffffff;padding: 20px;font-size: 24px;font-weight: bold;text-align: center;border-radius: 12px 12px 0 0;}.content {padding: 25px;font-size: 16px;line-height: 1.7;color: #333;}.content p {margin: 15px 0;}.footer {margin-top: 25px;font-size: 14px;text-align: center;color: #555;border-top: 1px solid #ddd;padding-top: 15px;}.contact-info {margin-top: 20px;font-size: 15px;text-align: center;font-weight: bold;}.contact-info a {color: #007bff;text-decoration: none;font-weight: bold;}.highlight {color: #007bff;font-weight: bold;}</style></head><body><div class='container'><div class='header'>✅ Service Request Confirmation</div><div class='content'><p>Dear <span class='highlight'>${savedContact.name}</span>,</p><p>Thank you for reaching out to us. We have received your request and our team is currently reviewing it. We will get back to you within <strong>24 hours</strong> with further details.</p><p><strong>Request Summary:</strong></p><p><strong>Email:</strong> ${savedContact.email}</p><p><strong>Phone:</strong> ${savedContact.phone}</p><p><strong>Service Type:</strong> ${savedContact.type}</p><p><strong>Message:</strong> ${savedContact.message}</p><p>If your request is urgent, feel free to contact us through any of the following channels:</p><div class='contact-info'>📧 <strong>Email:</strong> <a href='mailto:ruhulamin010398@gmail.com'>ruhulamin010398@gmail.com</a><br>🔗 <strong>LinkedIn:</strong> <a href='https://linkedin.com/in/theruhulamin' target='_blank'>linkedin.com/in/theruhulamin</a><br>📱 <strong>WhatsApp:</strong> <a href='https://wa.me/8801840000408' target='_blank'>+880184 0000 408</a></div><p>We appreciate your trust in our services and look forward to assisting you.</p>
  <p>Best Regards,<br><strong>Ruhul Amin</strong></p>
  <p><a href="https://www.ruhul.info">www.ruhul.info</a></p>
  </div><div class='footer'>⚠️ This is an automated message. Please do not reply.</div></div></body></html>`;

  const data = {
    to: savedContact.email,
    subject: "Contact",
    body: bodyHtml,
  };

  await sentEMail(data);

  res.json({
    msg: "Contact created",
    savedContact,
  });
});

module.exports = router;
