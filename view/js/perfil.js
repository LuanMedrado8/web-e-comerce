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