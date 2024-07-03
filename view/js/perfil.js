document.addEventListener('DOMContentLoaded', async () => {
    const userId = getUserId(); 

    try {
        const response = await fetch(`http://localhost:3000/auth/user/${userId}`);
        if (response.ok) {
            const user = await response.json();
            console.log(user);
            document.getElementById('userName').textContent = user.userName;
            document.getElementById('email').textContent = user.email;
            document.getElementById('dataNascimento').textContent = formatDate(user.dataNascimento);
            document.getElementById('telefone').textContent = user.telefone;
            
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
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

document.addEventListener('DOMContentLoaded', async () => {
const userName = sessionStorage.getItem('userName');
        
    
            try {
                const response = await fetch(`http://localhost:3000/auth/buscarPedidos/${userName}`);
                if (response.ok) {
                    const pedidos = await response.json();
                    console.log('Pedidos:', pedidos);
                    
                    displayPedidos(pedidos);
                } else {
                    console.error('Erro ao buscar pedidos:', response.statusText);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        
        function displayPedidos(pedidos) {
            const container = document.getElementById('pedidos-container');
            pedidos.forEach(pedido => {
                const pedidoDiv = document.createElement('div');
                pedidoDiv.className = 'pedido';

                const infoPedidoDiv = document.createElement('div');
                infoPedidoDiv.className = 'info-pedido';

                const numeroPedidoDiv = document.createElement('div');
                numeroPedidoDiv.className = 'detalhe';
                numeroPedidoDiv.innerHTML = `
                    <h3>Número Pedido:</h3>
                    <h3>${pedido.id}</h3>
                `;

                const tipoPagamentoDiv = document.createElement('div');
                tipoPagamentoDiv.className = 'detalhe';
                tipoPagamentoDiv.innerHTML = `
                    <h3>Tipo de Pagamento:</h3>
                    <h3>${pedido.metodo_pagamento}</h3>
                `;

                const valorTotalDiv = document.createElement('div');
                valorTotalDiv.className = 'detalhe';
                valorTotalDiv.innerHTML = `
                    <h3>Valor Total:</h3>
                    <h3>R$${parseFloat(pedido.totalvalue).toFixed(2)}</h3>
                `;

                infoPedidoDiv.appendChild(numeroPedidoDiv);
                infoPedidoDiv.appendChild(tipoPagamentoDiv);
                infoPedidoDiv.appendChild(valorTotalDiv);

                pedidoDiv.appendChild(infoPedidoDiv);
                container.appendChild(pedidoDiv);
            });
        }
    });

    document.addEventListener('DOMContentLoaded', async () => {
        const photoUser = document.getElementById('imagem-perfil');
        const username = sessionStorage.getItem('userName'); // Supomos que você armazene o username no sessionStorage ao fazer login
        const id = "vFrH132ECKUv6ZMMAlavcCLxGpV5BNWKZ08GaSy8ahg";
        const url = `https://api.unsplash.com/photos/random?client_id=${id}&query=star-wars`;
    
        if (!username) {
            console.error('Usuário não está logado.');
            return;
        }
    
        const storedImageUrl = sessionStorage.getItem(`profileImageUrl_${username}`);
        
        if (storedImageUrl) {
            photoUser.src = storedImageUrl;
        } else {
            try {
                const response = await fetch(url);
                const data = await response.json();
                const imageUrl = data.urls.regular;
                photoUser.src = imageUrl;
                sessionStorage.setItem(`profileImageUrl_${username}`, imageUrl);
            } catch (error) {
                console.error('Erro ao buscar imagem:', error);
            }
        }
    });
