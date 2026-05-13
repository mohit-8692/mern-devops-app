const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Request on port ${PORT}: ${req.method} ${req.url}`);
    next();
});
// Database Connection (Local MongoDB)
mongoose.connect('mongodb://127.0.0.1:27017/mern_db')
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// Schema
const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', ItemSchema);

// API Routes
app.get('/api/data', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});git

app.post('/api/data', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));