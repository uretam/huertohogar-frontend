// ===== Manejo de usuarios registrados (localStorage) =====
function getUsers() {
    return JSON.parse(localStorage.getItem('huerto_users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('huerto_users', JSON.stringify(users));
}

// ===== Manejo de la sesión activa =====
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('huerto_session')) || null;
}

function setCurrentUser(user) {
    // Nunca guardamos la contraseña en la sesión
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

// ===== Inicio de sesión =====
function loginUser(email, password) {
    const users = getUsers();
    const emailNormalized = email.trim().toLowerCase();
    const user = users.find(u => u.email === emailNormalized);

    if (!user || user.password !== password) {
        return { ok: false, message: 'Correo o contraseña incorrectos.' };
    }

    setCurrentUser(user);
    return { ok: true };
}

// ===== Actualizar el encabezado según el estado de la sesión =====
function updateAuthUI() {
    const userActions = document.querySelector('.user-actions');
    if (!userActions) return;

    const loginLink = userActions.querySelector('a[href="login.html"]');
    if (!loginLink) return;

    const user = getCurrentUser();
    if (user) {
        loginLink.textContent = `Hola, ${user.name.split(' ')[0]}`;
        loginLink.href = '#';
        loginLink.title = 'Cerrar sesión';
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('¿Cerrar sesión?')) logoutUser();
        });
    }
}

// ===== Formulario de Registro =====
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();

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

            if (name.trim().length < 3) {
                document.getElementById('error-reg-name').textContent = 'El nombre debe tener al menos 3 caracteres.';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                document.getElementById('error-reg-email').textContent = 'Ingrese un correo electrónico válido.';
                isValid = false;
            }

            if (password.length < 6) {
                document.getElementById('error-reg-password').textContent = 'La contraseña debe tener al menos 6 caracteres.';
                isValid = false;
            }

            if (confirmPassword !== password) {
                document.getElementById('error-reg-confirm-password').textContent = 'Las contraseñas no coinciden.';
                isValid = false;
            }

            if (!isValid) return;

            const result = registerUser(name, email, password);
            if (!result.ok) {
                document.getElementById('error-reg-email').textContent = result.message;
                return;
            }

            alert('¡Cuenta creada con éxito! Bienvenido/a a HuertoHogar.');
            window.location.href = 'index.html';
        });
    }

    // ===== Formulario de Inicio de Sesión =====
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.trim())) {
                document.getElementById('error-login-email').textContent = 'Ingrese un correo electrónico válido.';
                isValid = false;
            }

            if (password.length === 0) {
                document.getElementById('error-login-password').textContent = 'Ingrese su contraseña.';
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
