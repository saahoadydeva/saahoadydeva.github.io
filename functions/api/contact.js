export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { name, email, subject, type, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const apiKey = env.BREVO_API_KEY;
    const contactTo = env.CONTACT_TO_EMAIL;
    const contactFrom = env.CONTACT_FROM_EMAIL;

    if (!apiKey || !contactTo || !contactFrom) {
      return new Response(JSON.stringify({ error: 'Missing Brevo configuration in environment variables.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const payload = {
      sender: {
        name: 'ARDAO Contact',
        email: contactFrom,
      },
      to: [
        {
          email: contactTo,
        },
      ],
      replyTo: {
        email,
      },
      subject: subject && subject.trim().length ? subject.trim() : `New inquiry from ${name.trim()}`,
      textContent: `Name: ${name.trim()}\nEmail: ${email.trim()}\n${type ? `Project Type: ${type.trim()}\n` : ''}\n${message.trim()}`,
      htmlContent: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p>${type ? `<p><strong>Project Type:</strong> ${escapeHtml(type)}</p>` : ''}<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Brevo send failed:', response.status, errorText);
      return new Response(JSON.stringify({ error: 'Unable to send message via Brevo.' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ message: 'Your message has been sent successfully.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Pages function error:', error);
    return new Response(JSON.stringify({ error: 'Unable to send message. Please try again later.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
