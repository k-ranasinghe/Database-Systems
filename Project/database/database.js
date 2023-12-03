import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();



const FLIGHT='Flight';

const pool=mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE

}).promise();

export async function getAibusList(){
    const result =await pool.query('SELECT * FROM airbus');
    return result[0];
}

export async function getAibusById(id){
    const result =await pool.query('SELECT * FROM airbus WHERE id=?',[id]);
    return result[0];
}
export async function createAibus(ID ,Name){
    const result =await pool.query('INSERT INTO airbus (ID,type) values (?, ?)',[ID,Name]);
    return result[0];
};

export async function getFlightsFromDB (from,to,departureDate){
    // console.log(new Date(departureDate).toISOString().slice(0,10))
    console.log(from,to,departureDate)
    // const result=await pool.query(`select * from  ${FLIGHT} where desitination ='${from}' and origin ='${to}' and departure like '%${departureDate}%'`);
    const result =await pool.query('select * from Flight inner join Route  using (FlightNumber)  where Origin=? and Destination=? and DepartureDateTime like ?',[from,to,departureDate+'%'])
    console.log(result[0])
    return result[0];
}

export async function getFlightsWithPricesFromDB (from,to,departureDate){
    // console.log(new Date(departureDate).toISOString().slice(0,10))
    console.log(from,to,departureDate)
    // const result=await pool.query(`select * from  ${FLIGHT} where desitination ='${from}' and origin ='${to}' and departure like '%${departureDate}%'`);
    const result =await pool.query('select * from Flight inner join Route on Flight.FlightNumber=Route.FlightNumber inner join Price on Price.FlightId=Flight.FlightId where Origin=? and Destination=? and DepartureDateTime like ?',[from,to,departureDate+'%'])
    console.log(result[0])
    return result[0];
}

export async function getEconomySeatsFromDB (flightId){
    const result =await pool.query('select * from Seat where FlightId=? and TravelClass="Economy"',[flightId])
    console.log(result[0])
    return result[0];
}

export async function getPlatinumSeatsFromDB (flightId){
    const result =await pool.query('select * from Seat where FlightId=? and TravelClass="Platinum"',[flightId])
    console.log(result[0])
    return result[0];
}
export async function getBussinessSeatsFromDB (flightId){
    const result =await pool.query('select * from Seat where FlightId=? and TravelClass="Business"' ,[flightId])
    console.log(result[0])
    return result[0];
}

export async function getBookingById(id){
    const result =await pool.query('select * from Booking inner join Flight on Flight.FlightID = Booking.FlightID inner join Passenger on Passenger.PassengerID =Booking.PassengerID inner join Seat on Seat.SeatID=Booking.SeatID where BookingID=?',[id])
    return result[0];
}

export async function getAirportLocation(origin,desitination){
    const result =await pool.query('select  countrynew.locationname as countryname, statenew.locationname as statename, citynew.locationname as cityname, airportcode, airportname from countrynew  left join statenew on (countrynew.LocationId = statenew.ParentID) join citynew on ((countrynew.LocationID= citynew.ParentID) or (statenew.LocationID= citynew.ParentID)) join Airport on (Airport.LocationID = citynew.LocationID) where Airport.AirportCode=? or Airport.AirportCode=? order by countrynew.locationname asc ; ',[origin,desitination])
    console.log(result[0],origin,desitination)
    return result[0];
}



export async function bookTicket(flight,passengerDetails,seat){

    const result=await pool.query('insert into ticket (flight_id,passenger_id,seat_id) values (${flight.flight_id},${passengerDetails.passenger_id},${seat.seat_id})');
}


export async function createPassenger( flight, passengerDetails){
    console.log( "flight", flight)
    console.log("passenger", passengerDetails);
    const result =await pool.query('insert into Passenger (FirstName,LastName, Nationality,PassportNumber ,DateOfBirth ,ContactNumber, EmailAddress ,Registered ) values ( "?","?",?,?,?,?,?,?); ',[passengerDetails.firstName,passengerDetails.lastName,'Sri lankan','20343434','2001-07-12','0774077017',passengerDetails.emailAddress,'1'])
    console.log(result[0].insertId)
    return result[0].insertId;
}


export async function createBooking (flight,passenger_id,seat,paymentStatus){
    console.log("seat",seat)

    
    const result =await pool.query('insert into Booking (FlightId,PassengerID, SeatID, PaymentStatus) values ( "?","?","?",?);',[flight.FlightID,passenger_id,seat,paymentStatus])
    /// udpate seat availability
    const result1 =await pool.query('update Seat set Availability=0 where SeatID=?',[seat])
    
    return result[0].insertId;
}

export async function createPayment (booking_id ){
    const result =await pool.query('insert into Payment (BookingID ,TimeStamp) values ( "?" ,?);',[booking_id, new Date().toISOString().slice(0, 19).replace('T', ' ')])
    return result
}


export async function getAriports(){
    const result =await pool.query('select  countrynew.locationname as countryname, statenew.locationname as statename, citynew.locationname as cityname, airportcode, airportname from countrynew  left join statenew on (countrynew.LocationId = statenew.ParentID) join citynew on ((countrynew.LocationID= citynew.ParentID) or (statenew.LocationID= citynew.ParentID)) join Airport on (Airport.LocationID = citynew.LocationID)  order by countrynew.locationname asc ; ')


    return result[0];
}

export async function updateBooking(booking_id){    
    const result =await pool.query('update Booking set PaymentStatus=1 where BookingID=?',[booking_id])
    return result[0];
}

// flightinfo 
export async function getFlightData0 (flightnumber){
    console.log(flightnumber)
    const result =await pool.query('SELECT flightid, flightnumber, aircraftid, DepartureDateTime FROM flight WHERE flightnumber like ? limit 1', [flightnumber])   
    console.log(result[0])
    return result[0];
}

// flightdata for passenger age > 18
export async function getFlightData1 (flightnumber){
    console.log(flightnumber)
    const result =await pool.query('CREATE VIEW immflight1 AS SELECT flightid, aircraftid, departuredatetime FROM flight WHERE flightnumber like ? limit 1', [flightnumber])
    const result1 =await pool.query('select @rownum:=@rownum+1 ID, seatid, booking.PassengerID as passengerid, firstname, lastname, passportnumber, dateofbirth,contactnumber from immflight1 join booking on (immflight1.flightid = booking.flightid) join passenger on (booking.passengerid = passenger.passengerid) , (SELECT @rownum:=0) r where DateOfBirth < date_sub(now(), interval 18 year)')
    const result2 =await pool.query('drop view immflight1')    
    console.log(result1[0])
    return result1[0];
}

// flightdata for passenger age < 18
export async function getFlightData2 (flightnumber){
    console.log(flightnumber)
    const result =await pool.query('CREATE VIEW immflight AS SELECT flightid, aircraftid, departuredatetime FROM flight WHERE flightnumber like ? limit 1', [flightnumber])
    const result1 =await pool.query('select @rownum:=@rownum+1 ID, seatid, booking.PassengerID as passengerid, firstname, lastname, passportnumber, dateofbirth,contactnumber from immflight join booking on (immflight.flightid = booking.flightid) join passenger on (booking.passengerid = passenger.passengerid) , (SELECT @rownum:=0) r where DateOfBirth > date_sub(now(), interval 18 year)')
    const result2 =await pool.query('drop view immflight')    
    console.log(result1[0])
    return result1[0];
}

export async function getDestinationData (Destination, fromDate, toDate){
    console.log(Destination, fromDate, toDate)
    const result =await pool.query('SELECT booking.flightid as flightid, flightnumber, aircraftid, COUNT(*) as passengers, ArrivalDateTime FROM booking join flight on (flight.flightid = booking.flightid) WHERE booking.flightid IN (SELECT flight.flightid FROM flight JOIN route ON flight.flightnumber = route.flightnumber WHERE route.destination LIKE ? AND flight.ArrivalDateTime BETWEEN ? AND ?) GROUP BY flightid', [Destination, fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getDestinationTotal (Destination, fromDate, toDate){
    console.log(Destination, fromDate, toDate)
    const result =await pool.query('SELECT SUM(subquery.passengers) as total_passengers FROM ( SELECT booking.flightid as flightid, flightnumber, aircraftid, COUNT(*) as passengers, ArrivalDateTime FROM booking join flight on (flight.flightid = booking.flightid) WHERE booking.flightid IN (SELECT flight.flightid FROM flight JOIN route ON flight.flightnumber = route.flightnumber WHERE route.destination LIKE ? AND flight.ArrivalDateTime BETWEEN ? AND ?) GROUP BY flightid ) as subquery', [Destination, fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getPassengerDataGold (fromDate, toDate){
    console.log(fromDate, toDate)
    const result =await pool.query('select passenger.passengerid as passengerid, passenger.firstname as firstname, passenger.lastname as lastname, passenger.nationality as nationality, passenger.passportnumber as passportnumber from passenger join registeredpassenger on (passenger.passengerid = registeredpassenger.passengerid) join registereduser on (registeredpassenger.username = registereduser.username) join booking on (passenger.passengerid = booking.PassengerID) join payment on (payment.bookingid = booking.bookingid) where usertype like "gold" AND timestamp BETWEEN ? AND ?', [fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getPassengerDataFrequent (fromDate, toDate){
    console.log(fromDate, toDate)
    const result =await pool.query('select passenger.passengerid as passengerid, passenger.firstname as firstname, passenger.lastname as lastname, passenger.nationality as nationality, passenger.passportnumber as passportnumber from passenger join registeredpassenger on (passenger.passengerid = registeredpassenger.passengerid) join registereduser on (registeredpassenger.username = registereduser.username) join booking on (passenger.passengerid = booking.PassengerID) join payment on (payment.bookingid = booking.bookingid) where usertype like "frequent" AND timestamp BETWEEN ? AND ?', [fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getPassengerDataGuest (fromDate, toDate){
    console.log(fromDate, toDate)
    const result =await pool.query('SELECT passenger.passengerid as passengerid, firstname, lastname, nationality, passportnumber FROM Passenger LEFT JOIN RegisteredPassenger ON Passenger.PassengerID = RegisteredPassenger.PassengerID join booking on (passenger.passengerid = booking.PassengerID) join payment on (payment.bookingid = booking.bookingid) WHERE RegisteredPassenger.PassengerID IS NULL AND timestamp BETWEEN ? AND ?', [fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getPassengerDataTotal (fromDate, toDate){
    console.log(fromDate, toDate)
    const result =await pool.query('SELECT (SELECT COUNT(*) FROM (SELECT passenger.passengerid FROM passenger JOIN registeredpassenger ON passenger.passengerid = registeredpassenger.passengerid JOIN registereduser ON registeredpassenger.username = registereduser.username JOIN booking ON passenger.passengerid = booking.PassengerID JOIN payment ON payment.bookingid = booking.bookingid WHERE usertype LIKE "gold" AND timestamp BETWEEN ? AND ?) AS GoldPassengers) AS Gold, (SELECT COUNT(*) FROM (SELECT passenger.passengerid FROM passenger JOIN registeredpassenger ON passenger.passengerid = registeredpassenger.passengerid JOIN registereduser ON registeredpassenger.username = registereduser.username JOIN booking ON passenger.passengerid = booking.PassengerID JOIN payment ON payment.bookingid = booking.bookingid WHERE usertype LIKE "frequent" AND timestamp BETWEEN ? AND ?) AS FrequentPassengers) AS Frequent, (SELECT COUNT(*) FROM (SELECT passenger.passengerid FROM passenger LEFT JOIN registeredpassenger ON passenger.passengerid = registeredpassenger.passengerid JOIN booking ON passenger.passengerid = booking.PassengerID JOIN payment ON payment.bookingid = booking.bookingid WHERE registeredpassenger.passengerid IS NULL AND timestamp BETWEEN ? AND ?) AS GuestPassengers) AS Guest', [fromDate+'%', toDate+'%', fromDate+'%', toDate+'%', fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getRouteData (origin, Destination){
    console.log(origin, Destination)
    const result =await pool.query('SELECT flight.flightid, flight.aircraftid, flight.DepartureDateTime, flight.ArrivalDateTime, (SELECT COUNT(*) FROM Booking WHERE Booking.FlightID = flight.FlightID) AS PassengerCount FROM flight JOIN route ON flight.flightnumber = route.flightnumber WHERE route.origin LIKE ? AND route.destination LIKE ? AND flight.ArrivalDateTime < now()', [origin, Destination])    
    console.log(result[0])
    return result[0];
}

export async function getRouteInfo (origin, Destination){
    console.log(origin, Destination)
    const result =await pool.query('select flight.FlightNumber as flightnumber, duration from flight join route on (flight.flightnumber = route.flightnumber) where origin like ? and Destination like ? limit 1', [origin, Destination])    
    console.log(result[0])
    return result[0];
}

export async function getRouteTotal (origin, Destination){
    console.log(origin, Destination)
    const result =await pool.query('SELECT COUNT(*) as totalcount FROM Booking join flight on (Booking.FlightID = flight.FlightID) join route on (flight.flightnumber = route.FlightNumber) where origin like ? and Destination like ? and ArrivalDateTime < now()', [origin, Destination])    
    console.log(result[0])
    return result[0];
}

export async function getModelRevenue (){
    const result =await pool.query('SELECT m.Model AS Model, COUNT(DISTINCT a.AircraftID) AS FleetSize, COUNT(DISTINCT f.FlightID) AS TotalFlights, ROUND(SUM(p.PlatinumPrice * m.PlatinumSeats + p.BusinessPrice * m.BusinessSeats + p.EconomyPrice * m.EconomySeats) / 1000000, 4) AS Revenue FROM Model m LEFT JOIN Aircraft a ON m.Model = a.Model LEFT JOIN Flight f ON a.AircraftID = f.AircraftID LEFT JOIN Price p ON f.FlightID = p.FlightID GROUP BY m.Model')    
    console.log(result[0])
    return result[0];
}

export async function getTotalRevenue (){
    const result =await pool.query('SELECT SUM(NumberOfAircrafts) AS TotalFleetSize, SUM(NumberOfFlights) AS TotalFlights, ROUND(SUM(TotalRevenueInMillions), 4) AS TotalRevenue FROM ( SELECT m.Model AS Model, ROUND(SUM(p.PlatinumPrice * m.PlatinumSeats + p.BusinessPrice * m.BusinessSeats + p.EconomyPrice * m.EconomySeats) / 1000000, 4) AS TotalRevenueInMillions, COUNT(DISTINCT a.AircraftID) AS NumberOfAircrafts, COUNT(DISTINCT f.FlightID) AS NumberOfFlights FROM Model m LEFT JOIN Aircraft a ON m.Model = a.Model LEFT JOIN Flight f ON a.AircraftID = f.AircraftID LEFT JOIN Price p ON f.FlightID = p.FlightID GROUP BY m.Model) AS Subquery')    
    console.log(result[0])
    return result[0];
}

// const result1=await getAibusList();
// console.log(result1);
// const result2=await getAibusById("Bog-737-1");
// console.log(result2);
// const result3=await createAibus(3,'A380');
// console.log(result3);

getModelRevenue();
// getSeatsFromDB(525)
export default pool;



