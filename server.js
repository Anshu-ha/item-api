const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


let items = [];


app.get('/items', (req, res) => {
    res.send(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body;


    const existingItem = items.find(item => item.id === newItem.id);
    if (existingItem) {
        return res.status(400).send({ message: 'Item with this ID already exists' });
    }


    items.push(newItem);
    res.status(201).send(newItem);
});


app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;


    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).send({ message: 'Item not found' });
    }

    items[index] = updatedItem;
    res.send(updatedItem);
});


app.delete('/items/:id', (req, res) => {
    const { id } = req.params;


    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).send({ message: 'Item not found' });
    }


    items.splice(index, 1);
    res.status(204).send();
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

