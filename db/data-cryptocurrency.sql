-- CREATE DATABASE cryptocurrency;  

-- CREATE TABLE cryptocurrency_prices (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   cryptocurrensy_name VARCHAR(200) NOT NULL,
--   cryptocurrensy_symbol VARCHAR(100) NOT NULL,
--   coinMarketCap NUMERIC(22,15) CHECK (coinMarketCap > 0),
--   coinBase NUMERIC(22,15) CHECK (coinBase > 0),
--   coinStats NUMERIC(22,15) CHECK (coinStats > 0),
--   kucoin NUMERIC(22,15) CHECK (kucoin > 0),
--   coinPaprika NUMERIC(22,15) CHECK (coinPaprika > 0),
--   price_average NUMERIC(22,15) CHECK (price_average > 0),
--   date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- ); 

-- DELETE FROM cryptocurrency_prices;

-- SELECT cryptocurrensy_symbol AS symbol, price_average 
-- FROM cryptocurrency_prices
-- ORDER BY date DESC
-- LIMIT 20;