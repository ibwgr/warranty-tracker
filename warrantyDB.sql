create database if not exists warrantyDB;
use warrantyDB;

create table if not exists warranty
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

# test data
insert into warranty (date_, machine, customer, contact, issue, employee, time_)
    values
        ('2020-04-12', 'Master250', 'CCL USA', 'M. Muster', 'Download Update', 'S. Hutter', '10:00:00'),
        ('2020-05-12', 'Master250', 'CCL USA', 'M. Muster', 'Download Update', 'S. Hutter', '20:00:00'),
        ('2020-06-12', 'Master250', 'CCL USA', 'M. Muster', 'Download Update', 'S. Hutter', '30:00:00'),
        ('2020-07-12', 'Master250', 'CCL USA', 'M. Muster', 'Download Update', 'S. Hutter', '40:00:00');

