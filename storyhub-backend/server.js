const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config/db');

const PORT = process.env.PORT || 5000;

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Підключено до MongoDB');
  app.listen(PORT, () => {
    console.log(`Сервер працює на порті ${PORT}`);
  });
})
.catch(err => console.error('Помилка підключення до MongoDB:', err));