DELIMITER //

CREATE PROCEDURE FillFlightTable(IN input_date DATE)
BEGIN
  DECLARE aircraft_id_var VARCHAR(50);
  DECLARE flight_number_var VARCHAR(50);
  DECLARE duration_var TIME;
  DECLARE departure_datetime_var DATETIME;
  DECLARE arrival_datetime_var DATETIME;
  DECLARE route_count INT;
  DECLARE aircraft_count INT;
  DECLARE i INT;
  DECLARE j INT;
  DECLARE k INT;

  -- Declare handlers for exceptions
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET @finished = 1;

  -- Get the total counts of routes and aircraft
  SELECT COUNT(*) INTO route_count FROM Route;
  SELECT COUNT(*) INTO aircraft_count FROM Aircraft;

  -- Open a loop to generate and insert flight data
  SET i = 1;
  WHILE i <= 20 DO
    -- Randomly select an AircraftID
    SET j = CEIL(RAND() * aircraft_count);
    SET k = j-1;
    SELECT AircraftID INTO aircraft_id_var FROM Aircraft LIMIT k, 1;

    -- Randomly select a FlightNumber
    SET j = CEIL(RAND() * route_count);
    SET k = j-1;
    SELECT FlightNumber INTO flight_number_var FROM Route LIMIT k, 1;
    SELECT Duration INTO duration_var FROM Route LIMIT k, 1;

    -- Set departure and arrival times within the input date
    SET departure_datetime_var = TIMESTAMPADD(SECOND, ROUND(RAND() * 86400), input_date);
    SET @hours := HOUR(duration_var);
    SET @minutes := MINUTE(duration_var);
    SET @seconds := SECOND(duration_var);
    SET arrival_datetime_var = 
    DATE_ADD(
    DATE_ADD(
        DATE_ADD(departure_datetime_var, INTERVAL @hours HOUR), 
        INTERVAL @minutes MINUTE), INTERVAL @seconds SECOND
    );

    -- Insert data into the Flight table
    INSERT INTO Flight (AircraftID, FlightNumber, DepartureDateTime, ArrivalDateTime)
    VALUES (aircraft_id_var, flight_number_var, departure_datetime_var, arrival_datetime_var);

    SET i = i + 1;
  END WHILE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE FillFlightsForMonth(IN input_year INT, IN input_month INT)
BEGIN
  DECLARE current_dat DATE;
  DECLARE last_day INT;
  DECLARE day_counter INT;

  -- Calculate the last day of the given month
  SET last_day = DAY(LAST_DAY(DATE(CONCAT(input_year, '-', input_month, '-01'))));
  SET day_counter = 1;

  -- Loop through each day of the month and call FillFlightTable procedure
  WHILE day_counter <= last_day DO
    SET current_dat = DATE(CONCAT(input_year, '-', input_month, '-', LPAD(day_counter, 2, '0')));
    CALL FillFlightTable(current_dat);
    SET day_counter = day_counter + 1;
  END WHILE;
END //

DELIMITER ;

CALL FillFlightsForMonth(2023, 10);

select * from flight