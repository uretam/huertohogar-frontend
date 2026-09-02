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

            // Validar Nombre (sin nÃºmeros, min 3 caracteres, permite acentos y Ã±)
            const nameRegex = /^[a-zA-ZÃ¡Ã©Ã­Ã³ÃºÃÃ‰ÃÃ“ÃšÃ±Ã‘\s]{3,50}$/;
            if (!nameRegex.test(nameInput.value.trim())) {
                document.getElementById('error-name').textContent = 'El nombre solo debe contener letras (mÃ­nimo 3) y no incluir nÃºmeros.';
                isValid = false;
            }

            // Validar Email / Gmail
            // Si requieres estricto solo @gmail.com cambia por: /^[a-zA-Z0-9.]+@gmail\.com$/i
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('error-email').textContent = 'Ingrese un correo electrÃ³nico vÃ¡lido (ejemplo: usuario@gmail.com).';
                isValid = false;
            }

            // Validar Mensaje
            if (messageInput.value.trim().length < 10) {
                document.getElementById('error-message').textContent = 'El mensaje debe contener al menos 10 caracteres.';
                isValid = false;
            }

            if (isValid) {
                alert('Â¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente.');
                contactForm.reset();
            }
        });
    }
});