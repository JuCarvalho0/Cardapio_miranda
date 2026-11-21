const router = require('express').Router();
const Product = require('../models/Product');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// 1. Público (usado pelo cardápio)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ active: true })
      .populate('category')
      .sort({ featured: -1, name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Admin (lista todos)
router.get('/all', auth, async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Upload de Imagem (Rota para o Cloudinary)
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    res.json({ url: req.file.path });
  } catch (err) {
    console.error("Erro no upload:", err);
    res.status(500).json({ error: err.message });
  }
});router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    res.json({ url: req.file.path });
  } catch (err) {
    console.error("Erro no upload:", err);
    // AQUI DEVOLVEMOS JSON, NUNCA HTML
    res.status(500).json({ error: err.message });
  }
});

// 4. Criar Produto
router.post('/', auth, async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description || '',
      price: Number(req.body.price),
      category: req.body.category,
      active: req.body.active === true || req.body.active === 'true',
      featured: req.body.featured === true || req.body.featured === 'true',
      unavailable: req.body.unavailable === true || req.body.unavailable === 'true',
      imageUrl: req.body.imageUrl || ''
    };
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. Editar Produto
router.put('/:id', auth, async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description || '',
      price: Number(req.body.price),
      category: req.body.category,
      active: req.body.active === true || req.body.active === 'true',
      featured: req.body.featured === true || req.body.featured === 'true',
      unavailable: req.body.unavailable === true || req.body.unavailable === 'true',
      imageUrl: req.body.imageUrl || ''
    };
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 6. Deletar Produto
router.delete('/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;