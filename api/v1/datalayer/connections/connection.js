const mongoose = require('mongoose'); 

mongoose.connect('mongodb+srv://pavigdg:tmU7UfiP2sutwAoX@cluster0.6rwvl4h.mongodb.net/ecollections', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;