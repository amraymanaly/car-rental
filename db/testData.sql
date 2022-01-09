SET FOREIGN_KEY_CHECKS=0;

insert into customer(customerId,firstName,lastName) values
('khaled', 'khaled','gamal'),
('mazen', 'mazen','abouelhassan'),
('amr', 'amr','ayman'),
('abdallah', 'abdallah','aloush');


insert into car(make,model,pricePerDay,`status`,`year`,topSpeed_KMperH,color,plateId,countryOfOrigin,`image`) values
('ferrari','458',100,'available',2012,314,'red',1234,'italy','http://www.renault.com.eg/CountriesData/Egypt/images/conceptcars/renault-concept-car-014_ig_w800_h450.jpg'),
('ford','Mustang',80,'available',2016,300,'blue',2234,'usa','https://www.1auto.co/storage/ready_for_sales/20210914113121_photo-1552519507-da3b142c6e3d.jpg'),
('mercedes','C180',50,'out of service',2020,280,'black',3234,'egypt','https://1auto.co/storage/ready_for_sales/20210709155718_2022-chevrolet-corvette-z06-1607016574.jpg'),
('Nissan','Sunny',30,'out of service',2018,250,'yellow',4545,'egypt','https://1auto.co/storage/ready_for_sales/20210709155718_2022-chevrolet-corvette-z06-1607016574.jpg'),
('Fiat','Punto',35,'available',2020,230,'green',8787,'italy','https://1auto.co/storage/ready_for_sales/20210709155718_2022-chevrolet-corvette-z06-1607016574.jpg'),
('Bugati','veyron',150,'available',2014,350,'red',8965,'russia','https://1auto.co/storage/ready_for_sales/20210709155718_2022-chevrolet-corvette-z06-1607016574.jpg');

insert into office (country) values
('egypt'), ('italy'), ('usa'), ('germany'), ('russia');


insert into reservation(plateId,customerId,startDate,endDate,isPaid) values
 (1234,'khaled','2019-01-05 00:00:00', '2019-02-03 00:00:00',1),
 (2234,'mazen','2019-03-10 00:00:00', '2019-03-25 00:00:00',0),
 (3234,'amr','2019-05-15 00:00:00', '2019-05-20 00:00:00',1)
 ;

insert into `admin` values ('aloush');

SET FOREIGN_KEY_CHECKS=1;