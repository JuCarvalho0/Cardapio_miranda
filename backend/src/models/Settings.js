const mongoose = require('mongoose');
module.exports = mongoose.model('Settings', new mongoose.Schema({
  restaurantName: { type: String, default: 'Espetinho do Miranda' },
  address: { type: String, default: '' },
  openingHours: { type: String, default: 'Ter–Dom, 18h às 23h' },
  welcomeMessage: { type: String, default: 'Bem-vindo! Escolha seus pratos e chame o garçom quando estiver pronto.' },
}));