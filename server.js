require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_host,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

const PORT = process.env.PORT || 3000;



app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.post('/cars', async (req, res) => {
    try {
        await pool.query("INSERT INTO cars VALUES(DEFAULT, $1)", [req.body.car_name])
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
    }
})





app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});

