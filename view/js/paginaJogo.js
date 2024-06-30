document.addEventListener('DOMContentLoaded', async () => {
    const productId = getProductId(); 

    try {
        const response = await fetch(`http://localhost:3000/auth/product/${productId}`);
        if (response.ok) {
            const product = await response.json();
            console.log(product);
            document.getElementById('productName').textContent = product.productName;
            document.getElementById('oldPrice').textContent = product.oldPrice;
            document.getElementById('price').textContent = product.price;
            document.getElementById('imagemUrl').src = product.imagemUrl;
        } else {
            console.error('Erro ao buscar produto:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }

    function getProductId() {
        return sessionStorage.getItem('productId');
    }

});



