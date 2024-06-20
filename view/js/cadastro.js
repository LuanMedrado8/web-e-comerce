document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
  
    const username = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
  
    
    try {
      const response = await fetch('../../backend/routes/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email, dataNascimento, telefone})
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error(errorData.error || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  });
  