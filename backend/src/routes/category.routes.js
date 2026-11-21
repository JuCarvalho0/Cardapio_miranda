const router = require('express').Router();
const Category = require('../models/Category');
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
  res.json(await Category.find().sort({ order: 1, name: 1 }));
});

router.post('/', auth, async (req, res) => {
  res.status(201).json(await Category.create(req.body));
});

router.put('/:id', auth, async (req, res) => {
  res.json(await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete('/:id', auth, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;