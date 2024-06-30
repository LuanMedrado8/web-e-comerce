function levarParaPagina(productId) {
    sessionStorage.setItem('productId', productId);
    window.location.href = '/paginaJogo';
    
}