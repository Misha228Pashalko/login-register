document.addEventListener('DOMContentLoaded', function() {
    // Перемикання між формами
    document.getElementById('login-toggle').addEventListener('click', function() {
        document.getElementById('login-form').classList.add('active');
        document.getElementById('register-form').classList.remove('active');
        this.classList.add('active');
        document.getElementById('register-toggle').classList.remove('active');
    });

    document.getElementById('register-toggle').addEventListener('click', function() {
        document.getElementById('register-form').classList.add('active');
        document.getElementById('login-form').classList.remove('active');
        this.classList.add('active');
        document.getElementById('login-toggle').classList.remove('active');
    });

    // Обробка форми реєстрації
    document.getElementById('register-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        // Валідація
        if (password !== confirmPassword) {
            document.getElementById('register-error').textContent = 'Паролі не співпадають!';
            return;
        }
        
        if (password.length < 6) {
            document.getElementById('register-error').textContent = 'Пароль має бути не менше 6 символів!';
            return;
        }
        
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                document.getElementById('register-error').textContent = '';
                document.getElementById('register-success').textContent = result.message || 'Реєстрація успішна! Тепер ви можете увійти.';
                document.getElementById('register-form').reset();
                
                setTimeout(() => {
                    document.getElementById('login-toggle').click();
                    document.getElementById('login-email').value = email;
                }, 1500);
            } else {
                document.getElementById('register-error').textContent = result.error || 'Помилка реєстрації';
            }
        } catch (error) {
            document.getElementById('register-error').textContent = 'Помилка з\'єднання з сервером';
            console.error('Помилка реєстрації:', error);
        }
    });

    // Обробка форми входу
    document.getElementById('login-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                document.getElementById('login-error').textContent = '';
                alert(`Вітаємо, ${result.user.name}! Ви успішно увійшли в систему.`);
                document.getElementById('login-form').reset();
                // Тут можна додати перенаправлення на захищену сторінку
                // window.location.href = "/profile.html";
            } else {
                document.getElementById('login-error').textContent = result.error || 'Помилка входу';
            }
        } catch (error) {
            document.getElementById('login-error').textContent = 'Помилка з\'єднання з сервером';
            console.error('Помилка входу:', error);
        }
    });
});