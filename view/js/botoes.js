function logout() {
    sessionStorage.setItem('validation', false);
    window.location.href = '/';
}

async function excluirPerfil() {
    const userName = sessionStorage.getItem('userName');
    fetch('http://localhost:3000/auth/removerUsuario', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName }),
    }).then((response) => {
        if (response.ok) {
            sessionStorage.setItem('validation', false);
            sessionStorage.removeItem(`profileImageUrl_${userName}`);
            sessionStorage.removeItem('userName');
            window.location.href = '/login';
        } else {
            response.json().then((data) => {
                alert(data.error || 'Erro desconhecido');
            });
        }
    });
}