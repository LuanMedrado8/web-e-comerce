document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
  
    const username = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
  
  console.log(username, password, email, dataNascimento, telefone);
 
    const response = await fetch('http://localhost:3000/auth/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email, dataNascimento, telefone })
    });
  
    if (response.ok) {
      alert('Usuário cadastrado com sucesso!');
      window.location.href = '/login';
    } else {
      alert('Erro ao cadastrar usuário');
    }
    
});
  