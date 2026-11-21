require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  if (await User.findOne({ email: process.env.ADMIN_EMAIL })) {
    console.log('⚠️ Admin já existe'); process.exit(0);
  }
  await User.create({
    email: process.env.ADMIN_EMAIL,
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
  });
  console.log('✅ Admin criado:', process.env.ADMIN_EMAIL);
  process.exit(0);
})();