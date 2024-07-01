document.getElementById('registerForm').addEventListener( 'submit', async (event) => {
    event.preventDefault();
    let userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const password = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('confirmPassword').value;

    if (password !== confirmarSenha) {
        alert('As senhas não coincidem');
        return;
    }

    const oldUserName = sessionStorage.getItem('userName');

    const response = await fetch('http://localhost:3000/auth/editarPerfil', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password, email, dataNascimento, telefone, oldUserName}),
    });

    if (response.ok) {
        userName = sessionStorage.setItem('userName', userName);
        alert('Perfil atualizado com sucesso');
        window.location.href = '/perfil';
    } else {
        const { error } = await response.json();
        alert(error);
    }
});