const axios = require('axios');

const endPoints = 'https://api.coinstats.app/public/v1/coins?currency=USD';

const getArrCoinStats = async () => {
  return await Promise.all(
    await axios
      .get(endPoints)
      .then(resp => {
        const dataCoins = resp.data.coins;
        return dataCoins.reduce((acc, el, i) => {
          acc.push({
            shop_name: 'coinStats',
            list_number: i + 1,
            name: el.name,
            symbol: el.symbol,
            price: el.price,
          });
          return acc;
        }, []);
      })
      .catch(error => console.log(error)),
  );
};

module.exports = getArrCoinStats;
