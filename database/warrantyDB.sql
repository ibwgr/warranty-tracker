CREATE DATABASE IF NOT EXISTS warrantydb;
USE warrantydb;

CREATE TABLE IF NOT EXISTS warranty
    (
    id mediumint unsigned auto_increment primary key,
    date_ date not null,
    machine varchar(30) not null,
    customer varchar(30) not null,
    contact varchar(30) not null,
    issue varchar(50) not null,
    employee varchar(30) not null,
    time_ time not null
    );

