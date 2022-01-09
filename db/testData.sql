SET FOREIGN_KEY_CHECKS=0;

insert into customer(customerId,firstName,lastName) values
('khaled', 'khaled','gamal'),
('mazen', 'mazen','abouelhassan'),
('amr', 'amr','ayman'),
('abdallah', 'abdallah','aloush');


insert into car(model,pricePerDay,`status`,`year`,topSpeed_KMperH,color,plateId,`image`) values
('ferrari',100,'available',2012,314,'red',1234,'http://www.renault.com.eg/CountriesData/Egypt/images/conceptcars/renault-concept-car-014_ig_w800_h450.jpg'),
('ford',80,'available',2016,300,'blue',2234,'https://www.1auto.co/storage/ready_for_sales/20210914113121_photo-1552519507-da3b142c6e3d.jpg'),
('mercedes',150,'available',2020,280,'black',3,'https://1auto.co/storage/ready_for_sales/20210709155718_2022-chevrolet-corvette-z06-1607016574.jpg');

insert into office (country) values
('egypt'), ('italy'), ('usa'), ('germany'), ('russia');


insert into reservation values (3, CURRENT_DATE(), CURRENT_DATE(), CURRENT_DATE(), CURRENT_DATE(), 1);


SET FOREIGN_KEY_CHECKS=1;