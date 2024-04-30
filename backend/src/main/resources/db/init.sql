drop table if exists user_account;
create table user_account (
    id serial NOT NULL ,
    email varchar(255) not null,
    password varchar(255) not null,
    role varchar(255) not null default 'PATIENT',
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);


create table user_profile(
    id serial NOT NULL ,
    user_id integer not null,
    name varchar(255) default null,
    gender varchar(255) default null,
    phone varchar(255) default null,
    birth_date date default null,
    profession varchar(255) default null,
    about_me varchar(255) default null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);
