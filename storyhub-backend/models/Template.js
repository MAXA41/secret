const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Будь ласка, додайте назву шаблону'],
    trim: true,
    maxlength: [100, 'Назва не може бути довшою за 100 символів']
  },
  description: {
    type: String,
    required: [true, 'Будь ласка, додайте опис шаблону']
  },
  category: {
    type: String,
    required: [true, 'Будь ласка, виберіть категорію'],
    enum: [
      'Подорожі',
      'Їжа',
      'Фітнес',
      'Бізнес',
      'Мода',
      'Краса',
      'Технології',
      'Інше'
    ]
  },
  image: {
    type: String,
    required: [true, 'Будь ласка, завантажте зображення']
  },
  psdFile: {
    type: String
  },
  isFree: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0
  },
  downloadsCount: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Template', TemplateSchema);