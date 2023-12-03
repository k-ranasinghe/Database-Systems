DELIMITER //

CREATE PROCEDURE GenerateSeatInserts(
  IN FlightIDParam INT,
  IN PlatinumCapacity INT,
  IN BusinessCapacity INT,
  IN EconomyCapacity INT
)
BEGIN
  DECLARE PlatinumRowCount INT;
  DECLARE BusinessRowCount INT;
  DECLARE EconomyRowCount INT;
  DECLARE RowN INT;
  DECLARE ColumnN INT;
  DECLARE Class ENUM('Platinum', 'Business', 'Economy');
  
  SET PlatinumRowCount = CEIL(PlatinumCapacity / 4);
  
  IF BusinessCapacity < 100 THEN
    SET BusinessRowCount = CEIL(BusinessCapacity / 6);
  ELSEIF BusinessCapacity < 300 THEN
    SET BusinessRowCount = CEIL(BusinessCapacity / 8);
  ELSE
    SET BusinessRowCount = CEIL(BusinessCapacity / 10);
  END IF;

  IF EconomyCapacity < 150 THEN
    SET EconomyRowCount = CEIL(EconomyCapacity / 8);
  ELSEIF EconomyCapacity < 300 THEN
    SET EconomyRowCount = CEIL(EconomyCapacity / 10);
  ELSE
    SET EconomyRowCount = CEIL(EconomyCapacity / 12);
  END IF;
  
  -- Insert Platinum seats
  SET RowN = 1;
  SET Class = 'Platinum';
  WHILE PlatinumRowCount > 0 DO
    SET ColumnN = 1;
    WHILE ColumnN <= 4 DO
      INSERT INTO Seat (FlightID, RowN, ColumnN, Availability, TravelClass)
      VALUES (FlightIDParam, RowN, ColumnN, 1, Class);
      SET ColumnN = ColumnN + 1;
    END WHILE;
    SET PlatinumRowCount = PlatinumRowCount - 1;
    SET RowN = RowN + 1;
  END WHILE;

  -- Insert Business seats
  SET RowN = RowN + 1;
  SET Class = 'Business';
  WHILE BusinessRowCount > 0 DO
    SET ColumnN = 1;
    IF BusinessCapacity < 100 THEN
      WHILE ColumnN <= 6 DO
        INSERT INTO Seat (FlightID, RowN, ColumnN, Availability, TravelClass)
        VALUES (FlightIDParam, RowN, ColumnN, 1, Class);
        SET ColumnN = ColumnN + 1;
      END WHILE;
    ELSE
      WHILE ColumnN <= 8 DO
        INSERT INTO Seat (FlightID, RowN, ColumnN, Availability, TravelClass)
        VALUES (FlightIDParam, RowN, ColumnN, 1, Class);
        SET ColumnN = ColumnN + 1;
      END WHILE;
    END IF;
    SET BusinessRowCount = BusinessRowCount - 1;
    SET RowN = RowN + 1;
  END WHILE;

  -- Insert Economy seats
  SET Class = 'Economy';
  WHILE EconomyRowCount > 0 DO
    SET ColumnN = 1;
    IF EconomyCapacity < 150 THEN
      WHILE ColumnN <= 8 DO
        INSERT INTO Seat (FlightID, RowN, ColumnN, Availability, TravelClass)
        VALUES (FlightIDParam, RowN, ColumnN, 1, Class);
        SET ColumnN = ColumnN + 1;
      END WHILE;
    ELSEIF EconomyCapacity < 300 THEN
      WHILE ColumnN <= 10 DO
        INSERT INTO Seat (FlightID, RowN, ColumnN, Availability, TravelClass)
        VALUES (FlightIDParam, RowN, ColumnN, 1, Class);
        SET ColumnN = ColumnN + 1;
      END WHILE;
    ELSE
      WHILE ColumnN <= 12 DO
        INSERT INTO Seat (FlightID, RowN, ColumnN, Availability, TravelClass)
        VALUES (FlightIDParam, RowN, ColumnN, 1, Class);
        SET ColumnN = ColumnN + 1;
      END WHILE;
    END IF;
    SET EconomyRowCount = EconomyRowCount - 1;
    SET RowN = RowN + 1;
  END WHILE;
  
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE FillAllFlightSeats()
BEGIN
    DECLARE flight_id_var INT;
    DECLARE platinum_seats INT;
    DECLARE business_seats INT;
    DECLARE economy_seats INT;

    -- Declare a cursor to iterate through the Flight table
    DECLARE flight_cursor CURSOR FOR 
        SELECT FlightID FROM Flight;
    
    -- Declare handlers for exceptions
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET @finished = 1;

    -- Open the cursor
    OPEN flight_cursor;

    -- Start iterating through the Flight table
    flight_loop: LOOP
        -- Fetch the next flight ID from the cursor
        FETCH flight_cursor INTO flight_id_var;
        -- Exit the loop if no more rows to fetch
        IF @finished = 1 THEN
            LEAVE flight_loop;
        END IF;

        -- Get seat capacities for the current flight from Model table
        SELECT PlatinumSeats, BusinessSeats, EconomySeats INTO platinum_seats, business_seats, economy_seats
        FROM Model
        WHERE Model IN (SELECT Model FROM Aircraft WHERE AircraftID IN (SELECT AircraftID FROM Flight WHERE FlightID = flight_id_var));

        -- Call GenerateSeatInserts procedure for the current flight and seat capacities
        CALL GenerateSeatInserts(flight_id_var, platinum_seats, business_seats, economy_seats);
    END LOOP;

    -- Close the cursor
    CLOSE flight_cursor;
END //

DELIMITER ;


CALL FillAllFlightSeats();

select * from seat
