const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample data
let bakeryItems = [
    { id: 1, name: 'Chocolate Cake', description: 'Rich and moist chocolate cake.', price: 25.00 },
    { id: 2, name: 'Butter Croissant', description: 'Flaky and buttery croissant.', price: 3.50 },
    { id: 3, name: 'Chocolate Chip Cookies', description: 'Chewy cookies packed with chocolate chips.', price: 2.00 }
];

// Get all bakery items
app.get('/api/items', (req, res) => {
    res.json(bakeryItems);
});

// Get a specific bakery item by ID
app.get('/api/items/:id', (req, res) => {
    const item = bakeryItems.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');
    res.json(item);
});

// Add a new bakery item
app.post('/api/items', (req, res) => {
    const { name, description, price } = req.body;
    const newItem = {
        id: bakeryItems.length + 1,
        name,
        description,
        price
    };
    bakeryItems.push(newItem);
    res.status(201).json(newItem);
});

// Update an existing bakery item
app.put('/api/items/:id', (req, res) => {
    const item = bakeryItems.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');

    const { name, description, price } = req.body;
    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price || item.price;

    res.json(item);
});

// Delete a bakery item
app.delete('/api/items/:id', (req, res) => {
    const itemIndex = bakeryItems.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found.');

    const deletedItem = bakeryItems.splice(itemIndex, 1);
    res.json(deletedItem[0]);
});

app.listen(port, () => {
    console.log(`Bakery API listening at http://localhost:${port}`);
});
