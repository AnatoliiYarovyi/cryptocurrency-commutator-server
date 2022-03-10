const axios = require('axios');

const endPoints = 'https://api.coinpaprika.com/v1/tickers';

const getArrCoinPaprika = async () => {
  return await Promise.all(
    await axios
      .get(endPoints)
      .then(resp => {
        const dataCoins = resp.data;
        return dataCoins.reduce((acc, el, i) => {
          acc.push({
            shop_name: 'coinPaprika',
            list_number: i + 1,
            name: el.name,
            symbol: el.symbol,
            price: el.quotes.USD.price || null,
          });
          return acc;
        }, []);
      })
      .catch(error => console.log(error)),
  );
};

// getArrCoinPaprika().then(data => console.log(data));
module.exports = getArrCoinPaprika;
