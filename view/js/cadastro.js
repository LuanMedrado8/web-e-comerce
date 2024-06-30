document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
  
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const imagem = document.getElementById('imagem').files[0];

    if (!validarTelefone(telefone)) {
      alert('Número de telefone inválido. Use o formato: (XX)XXXXX-XXXX');
      return;
  }


    const response = await fetch('http://localhost:3000/auth/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, password, email, dataNascimento, telefone, imagem})
    });
  
    if (response.ok) {
      alert('Usuário cadastrado com sucesso!');
      window.location.href = '/login';
    } else {
      const errorData = await response.json();
      let errorMessage = 'Erro ao cadastrar usuário:\n';
      if (errorData.errors && errorData.errors.length > 0) {
          errorData.errors.forEach(error => {
              errorMessage += `${error.field}: ${error.msg}\n`;
          });
      } else {
          errorMessage += errorData.error || 'Erro desconhecido';
      }
      alert(errorMessage);
  }

  function validarTelefone(telefone) {
    const regexTelefone = /^\(\d{2}\)\d{5}-\d{4}$/;
    return regexTelefone.test(telefone);
}
    
});
  