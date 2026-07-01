export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, address, service, description } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !address || !service || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Import Resend SDK - you'll need to install it: npm install resend
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Email to business
    const businessEmailResponse = await resend.emails.send({
      from: 'Elite Plumb & Gas <noreply@eliteplumb.com>',
      to: 'elite.pg@outlook.com',
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Description:</strong></p>
        <p>${description.replace(/\n/g, '<br>')}</p>
        <p><em>Submitted: ${new Date().toLocaleString('en-AU')}</em></p>
      `
    });

    // Confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: 'Elite Plumb & Gas <noreply@eliteplumb.com>',
      to: email,
      subject: 'Your Free Quote Request - Elite Plumb & Gas',
      html: `
        <h2>Thanks for contacting Elite Plumb & Gas!</h2>
        <p>Hi ${name},</p>
        <p>We've received your quote request and will get back to you within 24 hours.</p>
        <p>In the meantime, if you need to reach us urgently, call us on <strong>0402 471 198</strong>.</p>
        <hr>
        <p><strong>Your Request Details:</strong></p>
        <p><strong>Service Type:</strong> ${service}</p>
        <p><strong>Description:</strong></p>
        <p>${description.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>Zach & the Elite Plumb & Gas Team</p>
      `
    });

    if (businessEmailResponse.error || customerEmailResponse.error) {
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Quote request sent successfully'
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
