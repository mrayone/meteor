import mongoose from 'mongoose';

// inciar conexão
mongoose.connect('mongodb://localhost:27017/hidra', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
