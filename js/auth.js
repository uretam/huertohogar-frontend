// ===== Manejo de usuarios registrados (localStorage) =====
function getUsers() {
    return JSON.parse(localStorage.getItem('huerto_users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('huerto_users', JSON.stringify(users));
}

// ===== Manejo de la sesiÃ³n activa =====
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('huerto_session')) || null;
}

function setCurrentUser(user) {
    const { password, ...safeUser } = user;
    localStorage.setItem('huerto_session', JSON.stringify(safeUser));
}

function logoutUser() {
    localStorage.removeItem('huerto_session');
    window.location.href = 'index.html';
}

// ===== Registro =====
function registerUser(name, email, password) {
    const users = getUsers();
    const emailNormalized = email.trim().toLowerCase();

    if (users.some(u => u.email === emailNormalized)) {
        return { ok: false, message: 'Ya existe una cuenta registrada con ese correo.' };
    }

    const newUser = { id: Date.now(), name: name.trim(), email: emailNormalized, password };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);

    return { ok: true };
}

// ===== Inicio de sesiÃ³n =====
function loginUser(email, password) {
    const users = getUsers();
    const emailNormalized = email.trim().toLowerCase();
    const user = users.find(u => u.email === emailNormalized);

    if (!user || user.password !== password) {
        return { ok: false, message: 'Correo o contraseÃ±a incorrectos.' };
    }

    setCurrentUser(user);
    return { ok: true };
}

// ===== Actualizar la interfaz segÃºn la sesiÃ³n =====
function updateAuthUI() {
    const userActions = document.querySelector('.user-actions');
    if (!userActions) return;

    const loginLink = userActions.querySelector('a[href="login.html"]');
    if (!loginLink) return;

    const user = getCurrentUser();
    if (user) {
        loginLink.textContent = `Hola, ${user.name.split(' ')[0]}`;
        loginLink.href = '#';
        loginLink.title = 'Cerrar sesiÃ³n';
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Â¿Cerrar sesiÃ³n?')) logoutUser();
        });
    }
}

// ===== Validaciones y Eventos de Formularios =====
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();

    // Expresiones regulares reutilizables
    const nameRegex = /^[a-zA-ZÃ¡Ã©Ã­Ã³ÃºÃÃ‰ÃÃ“ÃšÃ±Ã‘\s]{3,50}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Formulario de Registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;

            let isValid = true;

            // ValidaciÃ³n de Nombre
            if (!nameRegex.test(name.trim())) {
                document.getElementById('error-reg-name').textContent = 'El nombre solo debe contener letras (mÃ­nimo 3) sin nÃºmeros.';
                isValid = false;
            }

            // ValidaciÃ³n de Correo
            if (!emailRegex.test(email.trim())) {
                document.getElementById('error-reg-email').textContent = 'Ingrese un correo electrÃ³nico vÃ¡lido (ejemplo: usuario@gmail.com).';
                isValid = false;
            }

            // ValidaciÃ³n de ContraseÃ±a
            if (password.length < 6) {
                document.getElementById('error-reg-password').textContent = 'La contraseÃ±a debe tener al menos 6 caracteres.';
                isValid = false;
            }

            // ConfirmaciÃ³n de ContraseÃ±a
            if (confirmPassword !== password) {
                document.getElementById('error-reg-confirm-password').textContent = 'Las contraseÃ±as no coinciden.';
                isValid = false;
            }

            if (!isValid) return;

            const result = registerUser(name, email, password);
            if (!result.ok) {
                document.getElementById('error-reg-email').textContent = result.message;
                return;
            }

            alert('Â¡Cuenta creada con Ã©xito! Bienvenido/a a HuertoHogar.');
            window.location.href = 'index.html';
        });
    }

    // Formulario de Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            let isValid = true;

            if (!emailRegex.test(email.trim())) {
                document.getElementById('error-login-email').textContent = 'Ingrese un correo electrÃ³nico vÃ¡lido.';
                isValid = false;
            }

            if (password.length === 0) {
                document.getElementById('error-login-password').textContent = 'Ingrese su contraseÃ±a.';
                isValid = false;
            }

            if (!isValid) return;

            const result = loginUser(email, password);
            if (!result.ok) {
                document.getElementById('error-login-password').textContent = result.message;
                return;
            }

            window.location.href = 'index.html';
        });
    }
});