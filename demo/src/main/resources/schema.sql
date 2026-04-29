create table if not exists student (
    id serial primary key,
    name varchar(100),
    email varchar(100),
    course varchar(100)
);