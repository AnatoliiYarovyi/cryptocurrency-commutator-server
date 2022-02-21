const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const cron = require('node-cron');

const getCurrentPrice = require('./support/getCurrentPrice');
const writeData = require('./db/writeData');
const queryAllCoin = require('./db/queryAllCoin');
const queryCoin = require('./db/queryCoin');

const { DB_HOST, DB_USER, DB_USER_PASS, DB_NAME, PORT = 3000 } = process.env;
// конфигурация MySQL
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_USER_PASS,
  database: DB_NAME,
});
connection.connect(err => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log('connect --> ON');
  }
});
const index = express();
index.use(express.json());

// пуск "cron" --> запросы происходят каждые 5 минут
cron.schedule('*/5 * * * *', async () => {
  try {
    console.log('running a task every five minutes');
    const currentPrice = await getCurrentPrice();
    getWriteCoinDB(currentPrice);
  } catch (error) {
    console.log(error);
  }
});

// записываем данные в таблицу
const getWriteCoinDB = currentPrice => {
  currentPrice.map((el, i) => {
    writeData(connection, el);
  });
  console.log('Data recording completed!');
};

// GET '/' --> Считываем из базы данных 20 последних криптовалют с их ценой
index.get('/', async function (req, res) {
  try {
    const data = await queryAllCoin(connection);
    res.json({
      message: 'Get all coins',
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

// GET '/coin/name' --> Считываем из базы криптовалюту с именем "name" с ее средней ценой за последний час
index.get('/coin/:name', async function (req, res) {
  try {
    const { name } = req.params;
    const data = await queryCoin(connection, name);
    res.json({
      message: 'Get coins',
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on('SIGINT', () => {
  connection.end(err => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log('connect --> OFF');
    }
  });
  process.exit();
});
// listen on port 3000
index.listen(PORT, () => {
  console.log(`Server srart on port=${PORT} ...`);
});
