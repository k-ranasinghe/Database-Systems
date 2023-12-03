DELIMITER //

CREATE PROCEDURE FillRouteTable()
BEGIN
  DECLARE i INT;

  -- Declare handlers for exceptions
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET @finished = 1;

  -- Open a loop to insert data into the Route table
  SET i = 1;
  WHILE i <= 100 DO
    -- Generate a random flight number
    REPEAT
      SET @FlightNumberVar = CONCAT('BA', LPAD(FLOOR(100 + (RAND() * 900)), 3, '0'));
      SELECT COUNT(*) INTO @FlightExists FROM Route WHERE FlightNumber = @FlightNumberVar;
    UNTIL @FlightExists = 0 END REPEAT;

    -- Select a random origin airport
    SELECT AirportCode INTO @OriginVar FROM Airport ORDER BY RAND() LIMIT 1;

    -- Select a random destination different from the origin
    REPEAT
      SELECT AirportCode INTO @DestinationVar FROM Airport WHERE AirportCode != @OriginVar ORDER BY RAND() LIMIT 1;
    UNTIL @DestinationVar IS NOT NULL END REPEAT;

    -- Generate a random duration
    SET @DurationVar = SEC_TO_TIME(FLOOR(RAND() * 36000));

    -- Insert data into the Route table
    INSERT INTO Route (FlightNumber, Origin, Destination, Duration)
    VALUES (@FlightNumberVar, @OriginVar, @DestinationVar, @DurationVar);
    
    SET i = i + 1;
  END WHILE;

END //

DELIMITER ;



call fillroutetable();

select * from route
order by origin asc
