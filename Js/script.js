// js/script.js

// ScrollReveal init (kept from before)
if (typeof ScrollReveal !== 'undefined') {
  ScrollReveal().reveal('.animate', {
    delay: 200,
    distance: '40px',
    duration: 1000,
    easing: 'ease-in-out',
    origin: 'bottom',
    reset: true
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  function showMessage(msg, isError = false) {
    feedback.textContent = msg;
    feedback.style.color = isError ? '#ff6b6b' : '#00f6ff';
    feedback.style.background = isError ? 'rgba(255,107,107,0.08)' : 'rgba(0,246,255,0.06)';
    feedback.style.padding = '0.8rem 1rem';
    feedback.style.borderRadius = '8px';
    feedback.style.marginTop = '1rem';
  }

  function clearMessage() {
    feedback.textContent = '';
    feedback.style.padding = '';
    feedback.style.background = '';
  }

  function validateEmail(email) {
    // basic email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent page reload

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // simple validation
    if (!name || !email || !message) {
      showMessage('Please fill in all fields before sending.', true);
      return;
    }
    if (!validateEmail(email)) {
      showMessage('Please enter a valid email address.', true);
      return;
    }

    // Compose mailto (this opens the user's email client)
    const toEmail = 'pathanfardeen555@gmail.com'; // <- CHANGE THIS to your real email
    const subject = `Portfolio Contact: ${name}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));

    // This will open the user's default mail client. Some browsers block automatic mailto in certain contexts.
    window.location.href = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Show success message on the page as well
    showMessage('Your default mail client should open. If it did not, please email me directly at pathanfardeen555@gmail.com.');

    // If you want to clear the form after submission uncomment:
    // form.reset();

    // If you'd like to send via a form service (Formspree / EmailJS), call sendViaService(name, email, message).
    // sendViaService({ name, email, message });
  });

  // Placeholder function: replace or implement to use fetch to send to a backend or third-party service
  function sendViaService(data) {
    // Example: POST to Formspree endpoint
    // fetch('https://formspree.io/f/{your-id}', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // }).then(res => {
    //   if (res.ok) showMessage('Message sent successfully!');
    //   else showMessage('Failed to send. Please try email directly.', true);
    // }).catch(err => showMessage('Network error. Please try again later.', true));
  }
});
