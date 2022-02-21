const queryData = connection => {
  let query =
    'SELECT cryptocurrensy_symbol AS symbol, price_average FROM cryptocurrency_prices ORDER BY date DESC LIMIT 20';

  const data = connection.query(query, async (err, result, field) => {
    try {
      console.log(result);
    } catch (error) {
      console.log(err);
    }
  });
  console.log('data', data);
};

module.exports = queryData;
