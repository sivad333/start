const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const User = require('./models/user');

const app = express();
const PORT = 1134;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    User.findById('62bbf992e11408baca21d102')
        .then(userInDB => {
            req.user = userInDB;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

mongoose.connect('mongodb://localhost:27017/onlineshopping', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected");
    })
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});