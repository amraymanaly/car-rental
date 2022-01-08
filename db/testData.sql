SET FOREIGN_KEY_CHECKS=0;
/*
insert into customer(customerId,firstName,lastName) values ('khaled','gamal');
insert into customer(customerId,firstName,lastName) values ('mazen','abouelhassan');
insert into customer(customerId,firstName,lastName) values ('amr','ayman');
insert into customer(customerId,firstName,lastName) values ('abdallah','aloush');
*/

insert into car(model,pricePerDay,`status`,`year`,topSpeed_KMperH,color,plateId,`image`) values ('ferrari',100,'available',2012,314,'red',1234,'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cars.com%2Fresearch%2Fferrari-458_italia-2012%2F&psig=AOvVaw1iaXBEk8LduLQzlYUsLBFt&ust=1641520142761000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOjF2pqBnPUCFQAAAAAdAAAAABAD');
insert into car(model,pricePerDay,`status`,`year`,topSpeed_KMperH,color,plateId,`image`) values ('ford',80,'available',2016,300,'blue',2234,'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenewswheel.com%2F2017-ford-mustang-overview%2F&psig=AOvVaw2wE1DzhPNq5qSEx2sRJeej&ust=1641520232815000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOjJmcuBnPUCFQAAAAAdAAAAABAK');
insert into car(model,pricePerDay,`status`,`year`,topSpeed_KMperH,color,plateId,`image`) values ('mercedes',150,'available',2020,280,'black',3234,'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercedes-benz-montrealest.ca%2Fen%2Fnew-catalog%2Fmercedes-benz%2F2021-mercedes-benz-g-class-amg-63-id17318&psig=AOvVaw0dDnFwGDumQqn4DAQgq2kp&ust=1641520375999000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJCt9IuCnPUCFQAAAAAdAAAAABAK');


insert into office (country) values ('egypt');
insert into office (country) values ('italy');
insert into office (country) values ('usa');
insert into office (country) values ('germany');
insert into office (country) values ('russia');


insert into reservation values (3, CURRENT_DATE(), CURRENT_DATE(), CURRENT_DATE(), CURRENT_DATE(), 1);

insert into reserved values (5, 3);


SET FOREIGN_KEY_CHECKS=1;