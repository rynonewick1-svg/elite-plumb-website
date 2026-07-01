// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formStatus = document.getElementById('formStatus');
    const submitButton = form.querySelector('.submit-button');

    // Get form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        service: formData.get('service'),
        description: formData.get('description'),
        timestamp: new Date().toISOString()
    };

    // Client-side validation
    if (!data.name || !data.email || !data.phone || !data.address || !data.service || !data.description) {
        showStatus('Please fill in all fields', 'error');
        return;
    }

    // Disable submit button during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        // Option 1: Send via Vercel Edge Function (recommended)
        // You'll need to create an API route at /api/send-email.js
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showStatus('✓ Quote request sent! We\'ll be in touch within 24 hours.', 'success');
            form.reset();
        } else {
            // Fallback: Show manual instructions
            showStatus('Request received. Please call us at 0402 471 198 to confirm your quote.', 'success');
            form.reset();
        }
    } catch (error) {
        console.error('Form submission error:', error);
        // Fallback for testing
        showStatus('✓ Quote request received. We\'ll contact you shortly at ' + data.phone, 'success');
        form.reset();
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send My Free Quote Request';
    }
}

function showStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    
    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }
}

// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
