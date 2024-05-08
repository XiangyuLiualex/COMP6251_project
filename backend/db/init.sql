drop table if exists user_account;
create table user_account (
                              id serial NOT NULL ,
                              email varchar(255) not null,
                              password varchar(255) not null,
                              role varchar(255) not null default 'PATIENT',
                              created_at timestamp not null default now(),
                              updated_at timestamp not null default now(),
                              if_patient_valid boolean default false
);

insert into user_account(email,password,role) values
                                                  ('GP1@email.com','305c82f74c5299549bdf1eecbfdc1174fa3bb781a405ca46cd9d871a6077cdbd','GP'),
                                                  ('GP2@email.com','c041a879a6ef1c83f7c5eeb09346fcfa32b529b4d10d9230cd1dcf3108f57714','GP'),
                                                  ('patient@email.com', '2295ff7a8bd8b3f2884c6482146e3ded0417f72072c079fbe223e13e83a0388e', 'PATIENT'),
                                                  ('patient2@email.com', '35dd16d588bd48e2d4410199fdae3b5ded6ea110823c5fb7614ba267506a12bc', 'PATIENT'),
                                                  ('admin@email.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'ADMIN')
;

drop table if exists user_profile;
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


drop table if exists self_reg;
create table self_reg(
                         id serial NOT NULL ,
                         patient_id integer not null,
                         status varchar(10) not null default 'PENDING',
                         form json not null,
                         create_date_time_string varchar(255) not null,
                         created_at timestamp not null default now(),
                         updated_at timestamp not null default now()
);
COMMENT ON COLUMN self_reg.status IS 'PENDING, APPROVED, REJECTED';

drop table if exists medical_history;
create table medical_history(
                                id  serial not null ,
                                patient_id INTEGER not null ,
                                disease varchar(255) not null,
                                disease_details varchar(255),
                                diagnosed_date date,
                                created_at timestamp not null default now(),
                                updated_at timestamp not null default now()
);

drop table if exists slots;
create table slots(
                      id serial not null ,
                      gp_id integer not null,
                      date date not null,
                      day_of_week varchar(20) not null,
                      duration varchar(100) not null,
                      status varchar(20) not null default 'open',
                      booked_by_id integer default null,
                      created_at timestamp not null default now(),
                      updated_at timestamp not null default now()
);
insert into slots(gp_id, date, day_of_week, duration)values
                                                         (1, '2024-05-08', 'Monday', '8:00-9:00'),
                                                         (1, '2024-05-08', 'Monday', '9:00-10:00'),
                                                         (1, '2024-05-08', 'Monday', '10:00-11:00'),
                                                         (1, '2024-05-08', 'Monday', '11:00-12:00'),
                                                         (1, '2024-05-09', 'Monday', '8:00-9:00'),
                                                         (1, '2024-05-09', 'Monday', '9:00-10:00'),
                                                         (1, '2024-05-09', 'Monday', '10:00-11:00'),
                                                         (1, '2024-05-09', 'Monday', '11:00-12:00');


-- **********************************************************************************
drop table if exists gp;
create table gp(
                   id serial not null ,
                   user_id integer not null,
                   name varchar(255) not null,
                   treatments varchar(255) not null,
                   years_in_practice integer not null,
                   phone varchar(255) not null,
                   created_at timestamp not null default now(),
                   updated_at timestamp not null default now()
);
insert into gp(user_id, name, treatments, years_in_practice, phone) values
                                                                        (1, 'Dr. John Doe', 'General Practitioner', 5, '1234567890'),
                                                                        (2, 'Dr. Mary Jane', 'General Practitioner', 10, '1234567890');


drop table if exists appointment;
create table appointment(
                            id serial not null ,
                            patient_id integer not null,
                            gp_id integer not null,
                            slot_id integer not null,
                            status varchar(20) not null default 'before Approve',
                            reason varchar(255) default null,
                            created_at timestamp not null default now(),
                            updated_at timestamp not null default now()
);


drop table if exists medical_test;
create table medical_test(
                             id serial not null ,
                             patient_id integer not null,
                             tester_id integer ,
                             appointment_id integer not null,
                             name varchar(255) not null,
                             date date not null,
                             time varchar(255) not null,
                             description varchar(1000) ,
                             result varchar(1000) ,
                             status varchar(20) not null default 'undo',
                             created_at timestamp not null default now(),
                             updated_at timestamp not null default now()
);
drop table if exists prescription;
create table prescription(
                             id serial not null ,
                             patient_id integer not null,
                             gp_id integer not null,
                             appointment_id integer not null,
                             medication_name varchar(255) not null,
                             medication_instruction varchar(255) not null,
                             quantity integer not null,
                             created_at timestamp not null default now(),
                             updated_at timestamp not null default now()
);