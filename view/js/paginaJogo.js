document.addEventListener('DOMContentLoaded', async () => {
   
    const productId = getProductId(); 

    try {
        const response = await fetch(`http://localhost:3000/auth/product/${productId}`);
        if (response.ok) {
            const product = await response.json();
            console.log(product);
            document.getElementById('productName').textContent = product.productName;
            document.getElementById('oldPrice').textContent = `R$${product.oldPrice}`;
            document.getElementById('price').textContent = `R$${product.price}`;
            document.getElementById('plataform').textContent = product.plataform;
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

document.querySelector('.add-to-cart').addEventListener('click', function(event) {
    event.preventDefault(); 
    if (localStorage.getItem('validation') === 'false'){
      alert('Você precisa estar logado para adicionar um produto ao carrinho');
      return;
    }
  
    const productId = sessionStorage.getItem('productId'); 
    const userName = sessionStorage.getItem('userName');

    
    let cartProductIds = JSON.parse(sessionStorage.getItem('cartProductIds')) || [];
    cartProductIds.push(productId);
    sessionStorage.setItem('cartProductIds', JSON.stringify(cartProductIds));
  
    
    const data = {
      productId: productId,
      userName: userName
    };
  
    console.log(data);

    fetch('http://localhost:3000/auth/adicionar-ao-carrinho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao adicionar produto ao carrinho');
      }
      return response.json();
    })
    .then(data => {
    
      alert('Produto adicionado ao carrinho com sucesso:', data);
      
    })
    .catch(error => {
      alert('Erro ao adicionar produto ao carrinho:', error.message);
      
    });
  });
  

