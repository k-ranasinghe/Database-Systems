insert into Delay (FlightID, ExpectedTime, isArrival) values (1, '00:15:30', 1);
insert into Delay (FlightID, ExpectedTime, isArrival) values (2, '00:05:40', 0);
insert into Delay (FlightID, ExpectedTime, isArrival) values (3, '00:12:30', 1);
insert into Delay (FlightID, ExpectedTime, isArrival) values (4, '00:08:15', 0);
insert into Delay (FlightID, ExpectedTime, isArrival) values (5, '00:02:50', 1);


insert into Passenger (FirstName, LastName, Nationality, PassportNumber, DateOfBirth, ContactNumber, EmailAddress, Registered) values ('Sajeethiran', 'Sajeethiran', 'Sri Lankan', 'ABCD12345', '2001-01-01', 123456789, 'ABCD@gmail.com', TRUE);
insert into Passenger (FirstName, LastName, Nationality, PassportNumber, DateOfBirth, ContactNumber, EmailAddress, Registered) values ('Praveen', 'Praveen', 'Sri Lankan', 'ABCD12345', '2010-01-01', 123456789, 'ABCD@gmail.com', FALSE);
insert into Passenger (FirstName, LastName, Nationality, PassportNumber, DateOfBirth, ContactNumber, EmailAddress, Registered) values ('Sandali', 'Sandali', 'Sri Lankan', 'ABCD12345', '2001-01-01', 123456789, 'ABCD@gmail.com', TRUE);
insert into Passenger (FirstName, LastName, Nationality, PassportNumber, DateOfBirth, ContactNumber, EmailAddress, Registered) values ('Indeera', 'Indeera', 'Sri Lankan', 'ABCD12345', '2010-01-01', 123456789, 'ABCD@gmail.com', FALSE);
insert into Passenger (FirstName, LastName, Nationality, PassportNumber, DateOfBirth, ContactNumber, EmailAddress, Registered) values ('Kumudh', 'Kumudh', 'Sri Lankan', 'ABCD12345', '2001-01-01', 123456789, 'ABCD@gmail.com', TRUE);


insert into Booking (FlightID, PassengerID, SeatID, PaymentStatus) values (1, 1, 1, TRUE);
insert into Booking (FlightID, PassengerID, SeatID, PaymentStatus) values (1, 2, 2, TRUE);
insert into Booking (FlightID, PassengerID, SeatID, PaymentStatus) values (1, 3, 3, TRUE);
insert into Booking (FlightID, PassengerID, SeatID, PaymentStatus) values (1, 4, 4, TRUE);
insert into Booking (FlightID, PassengerID, SeatID, PaymentStatus) values (1, 5, 6, TRUE);


insert into Payment (BookingID, PassengerID, Timestamp) values (1, 1, now());
insert into Payment (BookingID, PassengerID, Timestamp) values (2, 2, now());
insert into Payment (BookingID, PassengerID, Timestamp) values (3, 3, now());
insert into Payment (BookingID, PassengerID, Timestamp) values (4, 4, now());
insert into Payment (BookingID, PassengerID, Timestamp) values (5, 5, now());


insert into UserType (UserType, Discount) values ('Guest', 0);
insert into UserType (UserType, Discount) values ('Frequent', 0.05);
insert into UserType (UserType, Discount) values ('Gold', 0.09);


insert into RegisteredUser (Username, Password, FirstName, LastName, Nationality, PassportNumber, DateOfBirth, UserType, ContactNumber, EmailAddress) values ('user1', 'pass1', 'Sajeethiran', 'Sajeethiran', 'Sri Lankan', 'ABCD12345', '2001-01-01', 'Frequent', 123456789, 'ABCD@gmail.com');
insert into RegisteredUser (Username, Password, FirstName, LastName, Nationality, PassportNumber, DateOfBirth, UserType, ContactNumber, EmailAddress) values ('user2', 'pass2', 'Praveen', 'Praveen', 'Sri Lankan', 'ABCD12345', '2010-01-01', 'Gold', 123456789, 'ABCD@gmail.com');
insert into RegisteredUser (Username, Password, FirstName, LastName, Nationality, PassportNumber, DateOfBirth, UserType, ContactNumber, EmailAddress) values ('user3', 'pass3', 'Sandali', 'Sandali', 'Sri Lankan', 'ABCD12345', '2001-01-01', 'Frequent', 123456789, 'ABCD@gmail.com');
insert into RegisteredUser (Username, Password, FirstName, LastName, Nationality, PassportNumber, DateOfBirth, UserType, ContactNumber, EmailAddress) values ('user4', 'pass4', 'Indeera', 'Indeera', 'Sri Lankan', 'ABCD12345', '2010-01-01', 'Gold', 123456789, 'ABCD@gmail.com');
insert into RegisteredUser (Username, Password, FirstName, LastName, Nationality, PassportNumber, DateOfBirth, UserType, ContactNumber, EmailAddress) values ('user5', 'pass5', 'Kumudh', 'Kumudh', 'Sri Lankan', 'ABCD12345', '2001-01-01', 'Frequent', 123456789, 'ABCD@gmail.com');



insert into RegisteredPassenger (PassengerID, Username) values (1, 'user1');
insert into RegisteredPassenger (PassengerID, Username) values (2, 'user2');
insert into RegisteredPassenger (PassengerID, Username) values (3, 'user3');
insert into RegisteredPassenger (PassengerID, Username) values (4, 'user4');
insert into RegisteredPassenger (PassengerID, Username) values (5, 'user5');


insert into Admin (Username, Password, FirstName, LastName, ContactNumber, EmailAddress, AccessStartDateTime, AccessEndDateTime) values ('user1', 'pass1', 'Sajeethiran', 'Sajeethiran', 123456789, 'ABCD@gmail.com', '2010-01-01 08:15:30', '2020-01-01 08:15:30');
insert into Admin (Username, Password, FirstName, LastName, ContactNumber, EmailAddress, AccessStartDateTime, AccessEndDateTime) values ('user2', 'pass2', 'Praveen', 'Praveen', 123456789, 'ABCD@gmail.com', '2010-01-01 08:15:30', '2020-01-01 08:15:30');
insert into Admin (Username, Password, FirstName, LastName, ContactNumber, EmailAddress, AccessStartDateTime, AccessEndDateTime) values ('user3', 'pass3', 'Sandali', 'Sandali', 123456789, 'ABCD@gmail.com', '2010-01-01 08:15:30', '2020-01-01 08:15:30');
insert into Admin (Username, Password, FirstName, LastName, ContactNumber, EmailAddress, AccessStartDateTime, AccessEndDateTime) values ('user4', 'pass4', 'Indeera', 'Indeera', 123456789, 'ABCD@gmail.com', '2010-01-01 08:15:30', '2020-01-01 08:15:30');
insert into Admin (Username, Password, FirstName, LastName, ContactNumber, EmailAddress, AccessStartDateTime, AccessEndDateTime) values ('user5', 'pass5', 'Kumudh', 'Kumudh', 123456789, 'ABCD@gmail.com', '2010-01-01 08:15:30', '2020-01-01 08:15:30');