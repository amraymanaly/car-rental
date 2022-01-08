-- creating tables in the database
create table IF NOT EXISTS car(
plateId int not null,
carCountry varchar(225),
`year` int,
`status` varchar(225),
make varchar(225),
model varchar(225),
pricePerDay dec(4, 2),
topSpeed_KMperH dec(4, 2),
color varchar(225),
carImg varchar(500), 
primary key (plateId),
foreign key(carCountry) references office(country)
);

create table IF NOT EXISTS reservation(
reservedPlateId int not null,
customerId int not null,
customerEmail varchar(225) not null,
reservationId int not null auto_increment,
startDate datetime,
endDate datetime,
isPaid bit not null, 
primary key (reservedPlateId,customerId,customerEmail) ,
foreign key (reservedPlateId) references car(plateId),
foreign key (customerId,customerEmail) references customer(customerId,email),
);

create table IF NOT EXISTS office(
    country varchar(225),
    primary key(country)
);

create table IF NOT EXISTS  systemUser(
userId int not null,
`password` varchar(225), 
primary key(userId)
);

create table IF NOT EXISTS customer(    /*Weak entity from systemUser*/
customerId int not null auto_increment,
firstName varchar(225) not null,
lastName varchar(225) not null,
email varchar(225) not null,
primary key (customerId,email),
foreign key(customerId) references systemUser(userId)
);

create table if not exists `admin`( /*Weak entity from systemUser*/
adminId int not null,
primary key(adminId),
foreign key(adminId) references systemUser(userId) 
); 




