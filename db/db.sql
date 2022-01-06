-- creating tables in the database
create table IF NOT EXISTS car(
model varchar(225),
pricePerDay int,
`status` varchar(225),
`year` int,
topSpeed int,
color varchar(225),
plateId int not null,
carImg varchar(500),
primary key (plateId) 
);

create table IF NOT EXISTS reservation(
reservationId int not null auto_increment,
startDate datetime,
endDate datetime,
isPaid bit not null, 
price float, 
primary key (reservationId)
);

create table IF NOT EXISTS office(
    country varchar(225),
    primary key(country)
);

create table IF NOT EXISTS  systemUser(
userId int not null auto_increment,
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

create table if not exists `admin`(
adminId int not null auto_increment,
primary key(adminId),
foreign key(adminId) references systemUser(userId) 
); 




