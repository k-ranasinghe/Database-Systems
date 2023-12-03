DELIMITER //

CREATE PROCEDURE FillPriceTable()
BEGIN
  DECLARE flight_id_var INT;
  DECLARE platinum_price_var FLOAT;
  DECLARE business_price_var FLOAT;
  DECLARE economy_price_var FLOAT;
  DECLARE flight_count INT;
  DECLARE i INT;

  -- Declare a handler for exceptions
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET @finished = 1;

  -- Get the total count of flights
  SELECT COUNT(*) INTO flight_count FROM Flight;

  -- Open a loop to generate and insert price data
  SET i = 1;
  WHILE i <= flight_count DO
    -- Randomly select a FlightID
    SET flight_id_var = i;

    -- Generate random prices within specified ranges
    SET economy_price_var = FLOOR(RAND() * (550 - 200 + 1)) + 200;  -- Random value between 200 and 550
    SET business_price_var = FLOOR(RAND() * ((economy_price_var * 3) - (economy_price_var * 1.5) + 1)) + (economy_price_var * 1.5);  -- Random value between 1.5x and 3x economy price
    SET platinum_price_var = FLOOR(RAND() * ((business_price_var * 4) - (business_price_var * 1.5) + 1)) + (business_price_var * 1.5);  -- Random value between 1.5x and 4x business price

    -- Round prices to the nearest 0.5
    SET economy_price_var = ROUND(economy_price_var * 2) / 2;
    SET business_price_var = ROUND(business_price_var * 2) / 2;
    SET platinum_price_var = ROUND(platinum_price_var * 2) / 2;

    -- Insert data into the Price table
    INSERT INTO Price (FlightID, PlatinumPrice, BusinessPrice, EconomyPrice)
    VALUES (flight_id_var, platinum_price_var, business_price_var, economy_price_var);

    SET i = i + 1;
  END WHILE;
END //

DELIMITER ;




CALL FillPriceTable();

select * from price
order by flightid asc
