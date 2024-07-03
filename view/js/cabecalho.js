document.addEventListener('DOMContentLoaded', function() {
    
    var isLoggedIn = localStorage.getItem('validation');
    console.log(isLoggedIn)

    var profileContainer = document.getElementById('photoPerfil');
    var userName = sessionStorage.getItem('userName');
    var loginText = document.getElementById('login');
    

    if (isLoggedIn === 'true') {
        loginText.style.display = 'none';
        profileContainer.style.display = 'block';
        profileContainer.src = './assets/do-utilizador.png';
    }

    const fotoPerfil = sessionStorage.getItem(`profileImageUrl_${userName}`);
    if(fotoPerfil){
        profileContainer.src = fotoPerfil;
    }
});