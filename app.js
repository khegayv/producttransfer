const express = require('express');
const ejs = require('ejs');
const pg = require('pg');
const app = express();
const port = 3000;

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',// свои пароли вбейте
    port: 5432
});

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { name, surname, phone_number,email,password } = req.body;
    const query = {
        text: 'INSERT INTO seller_info (name, surname, phone_number, email, password) VALUES ($1, $2, $3, $4, $5)',
        values: [name, surname, phone_number, email, password],
    };
    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.send('Error registering user');
        } else {
            res.send('User registered successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
