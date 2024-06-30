const multer = require('multer');

// Configuração do Multer para salvar a imagem no sistema de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'middlewares/')  // Diretório onde as imagens serão salvas
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)  // Nome original do arquivo
    }
  });
  
  const upload = multer({ storage: storage });

module.exports = upload;