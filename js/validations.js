document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Limpiar errores previos
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            // Validar Nombre
            if (nameInput.value.trim().length < 3) {
                document.getElementById('error-name').textContent = 'El nombre debe tener al menos 3 caracteres.';
                isValid = false;
            }

            // Validar Email con Expresión Regular
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('error-email').textContent = 'Ingrese un correo electrónico válido.';
                isValid = false;
            }

            // Validar Mensaje
            if (messageInput.value.trim().length < 10) {
                document.getElementById('error-message').textContent = 'El mensaje debe contener al menos 10 caracteres.';
                isValid = false;
            }

            if (isValid) {
                alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente.');
                contactForm.reset();
            }
        });
    }
});