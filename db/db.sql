-- creating tables in the database
SET FOREIGN_KEY_CHECKS=0;
create table IF NOT EXISTS car(
plateId int not null,
countryOfOrigin varchar(225),
`year` int,
`status` varchar(225),
make varchar(225),
model varchar(225),
pricePerDay dec(5, 2),
topSpeed_KMperH dec(6, 2),
color varchar(225),
`image` varchar(500), 
primary key (plateId),
foreign key(countryOfOrigin) references office(country)
);

create table IF NOT EXISTS reservation(
plateId int not null,
customerId varchar(225) not null,
reservationId int not null auto_increment,
startDate datetime,
endDate datetime,
isPaid bit not null, 
primary key (reservationId),
foreign key (plateId) references car(plateId),
foreign key (customerId) references customer(customerId)
);

create table IF NOT EXISTS office(
    country varchar(225),
    primary key(country)
);

create table IF NOT EXISTS  systemUser(
userId varchar(225) not null,
`password` varchar(225), 
primary key(userId)
);

create table IF NOT EXISTS customer(    /*Weak entity from systemUser*/
customerId varchar(225) not null,
firstName varchar(225) not null,
lastName varchar(225) not null,
primary key (customerId),
foreign key(customerId) references systemUser(userId)
);

create table if not exists `admin`( /*Weak entity from systemUser*/
adminId varchar(225) not null,
primary key(adminId),
foreign key(adminId) references systemUser(userId) 
); 

SET FOREIGN_KEY_CHECKS=1;

-- some views

create view customer_reservation_car as
select *, car.pricePerDay * (datediff(reservation.endDate, reservation.startDate) + 1) as totalPrice
from customer natural join reservation natural join car;


select car.pricePerDay * (datediff(MIN(reservation.endDate,enteredEndDate),MAX(reservation.startDate,enteredStartDate)) + 1) as totalPrice
from customer_reservation_car;
