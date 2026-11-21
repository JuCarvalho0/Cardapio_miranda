const router = require('express').Router();
const Settings = require('../models/Settings');
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
  let s = await Settings.findOne();
  if (!s) s = await Settings.create({});
  res.json(s);
});

router.put('/', auth, async (req, res) => {
  let s = await Settings.findOne();
  s = s
    ? await Settings.findByIdAndUpdate(s._id, req.body, { new: true })
    : await Settings.create(req.body);
  res.json(s);
});

module.exports = router;