const axios = require('axios');

const endPoints = 'https://api.kucoin.com/api/v1/prices';

const getArrKucoin = async () => {
  return await Promise.all(
    await axios
      .get(endPoints)
      .then(resp => {
        // забираем из ответа обект {} с ключ="имя крипты", значение="стоимость"
        const objCoins = resp.data.data;

        // с помощью "for in" перебираем objCoins и создаем нужный нам масив обектов
        const dataCoins = [];
        for (const key in objCoins) {
          dataCoins.push({
            symbol: key,
            price: objCoins[key],
          });
        }

        return dataCoins.reduce((acc, el, i) => {
          acc.push({
            shop_name: 'kucoin',
            list_number: i + 1,
            symbol: el.symbol,
            price: Number(el.price),
          });
          return acc;
        }, []);
      })
      .catch(error => console.log(error)),
  );
};
module.exports = getArrKucoin;
