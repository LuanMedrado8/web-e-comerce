document.addEventListener('DOMContentLoaded', async () => {
    let totalValue = 0;
    document.getElementById('totalPrice').textContent = `R$${totalValue}`;
    let total = sessionStorage.setItem('totalValue', totalValue);

    try{
    const userName = sessionStorage.getItem('userName');
    const cartResponse = await fetch('http://localhost:3000/auth/buscar-carrinho', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName})
    });
    if (cartResponse.ok) {
        const productIds = await cartResponse.json();

        

        for (const productId of productIds) {
            idProduct = productId.product_id;
            await fetchProductDetailsAndCreateCard(idProduct);
        }
    } else {
        console.error('Erro ao buscar IDs dos produtos do carrinho:', cartResponse.statusText);
    }
} catch (error) {
    console.error('Erro na requisição:', error);
}

async function fetchProductDetailsAndCreateCard(productId) {
    try {
        const productResponse = await fetch(`http://localhost:3000/auth/product/${productId}`);
        if (productResponse.ok) {
            const product = await productResponse.json();
            totalValue += parseFloat(product.price);
            document.getElementById('totalPrice').textContent = `R$${totalValue}`;
            total = sessionStorage.setItem('totalValue', totalValue);
            console.log('Product details:', product);
            createProductCard(product, productId);
        } else {
            console.error('Erro ao buscar detalhes do produto:', productResponse.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição dos detalhes do produto:', error);
    }
}


 function createProductCard(product, productId) {

    const card = document.createElement('div');
    card.className = 'product-carrinho';


    const imagemDiv = document.createElement('div');
    imagemDiv.className = 'imagem';
    const imagemJogo = document.createElement('img');
    imagemJogo.src = product.imagemUrl;
    imagemJogo.alt = product.productName;
    imagemDiv.appendChild(imagemJogo);
    card.appendChild(imagemDiv);


    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';

    const nomeDiv = document.createElement('div');
    nomeDiv.className = 'nome';
    const nomeJogo = document.createElement('span');
    nomeJogo.textContent = product.productName;
    nomeDiv.appendChild(nomeJogo);
    infoDiv.appendChild(nomeDiv);

    const plataformDiv = document.createElement('div');
    plataformDiv.className = 'plataform';
    const plataform = document.createElement('span');
    plataform.textContent = product.plataform;
    plataformDiv.appendChild(plataform);
    infoDiv.appendChild(plataformDiv);

    const precoDiv = document.createElement('div');
    precoDiv.className = 'preco';
    const price = document.createElement('span');
    price.textContent = `R$${product.price}`;
    precoDiv.appendChild(price);
    infoDiv.appendChild(precoDiv);

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'button';
    const removerButton = document.createElement('button');
    removerButton.className = 'remover';
    removerButton.textContent = 'Remover';
    removerButton.onclick = () => {
        removerProduto(productId, product.price);
    }; 
    buttonDiv.appendChild(removerButton);
    infoDiv.appendChild(buttonDiv);

    card.appendChild(infoDiv);


    const productContainer = document.getElementById('product-container');
    if (productContainer) {
        productContainer.appendChild(card);
    } else {
        console.error('Contêiner de produtos não encontrado');
    }
    
    async function removerProduto(productId, price) {
        try {
            const response = await fetch(`http://localhost:3000/auth/remover-do-carrinho/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                card.remove();
                totalValue -= parseFloat(price);
                document.getElementById('totalPrice').textContent = `R$${totalValue}`;
                total = sessionStorage.setItem('totalValue', totalValue);
                let cartProductIds = JSON.parse(sessionStorage.getItem('cartProductIds')) || [];
                productId = String(productId);
                cartProductIds = cartProductIds.filter(id => id !== productId);
                sessionStorage.setItem('cartProductIds', JSON.stringify(cartProductIds));
            } else {
                console.error('Erro ao remover produto do carrinho:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

}


});