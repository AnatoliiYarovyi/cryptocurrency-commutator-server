const queryCoin = async (connection, coin) => {
  let query = `SELECT cryptocurrensy_symbol AS symbol, AVG(price_average) AS price_one
FROM cryptocurrency_prices
WHERE cryptocurrensy_symbol = '${coin}'
ORDER BY date DESC
LIMIT 12`;
  const data = await connection
    .promise()
    .query(query)
    .then(([result, field]) => {
      // console.log(result);
      return result;
    })
    .catch(error => console.error(error));
  return data;
};

module.exports = queryCoin;
