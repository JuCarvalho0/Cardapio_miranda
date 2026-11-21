require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors({ origin: '*' }));

// Aumenta o limite para arquivos grandes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectDB();

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/settings', require('./routes/settings.routes'));

app.get('/', (req, res) => res.json({ status: 'API Miranda rodando 🍢' }));

// TRATAMENTO DE ERRO: Isso força o Express a devolver JSON em vez de HTML
app.use((err, req, res, next) => {
  console.error("❌ ERRO NO SERVIDOR:", err);
  
  // Se for erro do Cloudinary ou do Multer
  if (err.message && (err.message.includes('cloudinary') || err.message.includes('File size'))) {
    return res.status(400).json({ error: `Erro no upload: ${err.message}` });
  }
  
  res.status(err.status || 500).json({ error: err.message || 'Erro interno no servidor' });
});

// CORREÇÃO AQUI: Usa a variável PORT para funcionar na nuvem
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor na porta ${PORT}`));