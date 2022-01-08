-- creating tables in the database
create table IF NOT EXISTS car(
model varchar(225),
make varchar(225),
pricePerDay dec(5, 2),
`status` varchar(225),
`year` int,
topSpeed_KMperH dec(6, 2),
color varchar(225),
plateId int not null,
`image` varchar(500),
countryOfOrigin varchar(225),
primary key (plateId),
foreign key(countryOfOrigin) references office(country)
);

create table IF NOT EXISTS reservation(
reservationId int not null auto_increment,

startDate datetime,
endDate datetime,
pickUp datetime,
`return` datetime,
paid bit not null, 
primary key (reservationId) 
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

create table IF NOT EXISTS customer( 
customerId int not null auto_increment,
primary key (customerId),
foreign key(customerId) references systemUser(userId),
firstName varchar(225) not null,
lastName varchar(225) not null,
email varchar(225) not null
);

create table IF NOT EXISTS reserved(
    customerId int not null,
    reservationId int not null,
    foreign key(customerId) references customer(customerId),
    foreign key(reservationId) references reservation(reservationId),
    primary key(customerId, reservationId)
);

create table if not exists `admin`(
adminId int not null,
primary key(adminId),
foreign key(adminId) references systemUser(userId) 
); 

