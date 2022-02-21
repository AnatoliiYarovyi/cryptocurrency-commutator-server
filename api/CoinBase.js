const axios = require('axios');

const endPoints = 'https://api.coinbase.com/v2/exchange-rates';

const getCoinBase = async () => {
  return await Promise.all(
    await axios
      .get(endPoints)
      .then(resp => {
        // забираем из ответа обект {} с ключ="имя крипты", значение="стоимость"
        const objCoins = resp.data.data.rates;

        // с помощью "for in" перебираем objCoins и создаем нужный нам масив обектов
        const dataCoins = [];
        for (const key in objCoins) {
          dataCoins.push({
            symbol: key,
            price: objCoins[key],
          });
        }

        return dataCoins.reduce((acc, el, i, arr) => {
          acc.push({
            shop_name: 'coinBase',
            list_number: i + 1,
            symbol: el.symbol,
            price: Number(el.price),
          });
          // if (i === arr.length - 1) {
          //   console.log(acc);
          // }
          return acc;
        }, []);
      })
      .catch(error => console.log(error)),
  );
};
// getCoinBase();
module.exports = getCoinBase;
