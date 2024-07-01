document.addEventListener('DOMContentLoaded', async () => {
    const userId = getUserId(); 

    try {
        const response = await fetch(`http://localhost:3000/auth/user/${userId}`);
        if (response.ok) {
            const user = await response.json();
            document.getElementById('userName').textContent = user.userName;
            document.getElementById('email').textContent = user.email;
            document.getElementById('dataNascimento').textContent = formatDate(user.dataNascimento);
            document.getElementById('telefone').textContent = user.telefone;
            document.getElementById('imagem-perfil').src = './assets/do-utilizador.png';
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
        console.log(userName);
    
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

