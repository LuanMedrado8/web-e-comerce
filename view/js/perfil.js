document.addEventListener('DOMContentLoaded', function() {
    
    var isLoggedIn = sessionStorage.getItem('userName');
    console.log(isLoggedIn)

    var profileContainer = document.getElementById('image-perfil');
    var loginText = document.getElementById('login');

    if (isLoggedIn) {
        loginText.style.display = 'none';
        profileContainer.style.display = 'block';

    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const userId = getUserId(); // Supondo que você tenha uma forma de obter o ID do usuário

    try {
        const response = await fetch(`http://localhost:3000/auth/user/${userId}`);
        if (response.ok) {
            const user = await response.json();
            document.getElementById('userName').textContent = user.userName;
            document.getElementById('email').textContent = user.email;
            document.getElementById('dataNascimento').textContent = formatDate(user.dataNascimento);
            document.getElementById('telefone').textContent = user.telefone;
            document.getElementById('imagem-perfil').src = user.imagem ? `data:image/png;base64,${user.imagem.toString('base64')}` : './assets/do-utilizador.png';
        } else {
            console.error('Erro ao buscar perfil do usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

function getUserId() {
    return sessionStorage.getItem('userName');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são indexados em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}