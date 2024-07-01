document.getElementById('login_form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;


    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password, rememberMe })
    });

    if (response.ok) {
      
        sessionStorage.setItem('userName', userName);
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Usuário ou senha inválidos');
      }

    });