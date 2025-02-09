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
                                                  ('GP1@email.com','0feae16d55365acf07fe9f909834361ba6ee606854746539230bdc84a6a24cee','GP'),
                                                  ('GP2@email.com','0feae16d55365acf07fe9f909834361ba6ee606854746539230bdc84a6a24cee','GP'),
                                                  ('GP3@email.com','0feae16d55365acf07fe9f909834361ba6ee606854746539230bdc84a6a24cee','GP'),
                                                  ('GP4@email.com','0feae16d55365acf07fe9f909834361ba6ee606854746539230bdc84a6a24cee','GP'),
                                                  ('GP5@email.com','0feae16d55365acf07fe9f909834361ba6ee606854746539230bdc84a6a24cee','GP'),
                                                  ('GP6@email.com','0feae16d55365acf07fe9f909834361ba6ee606854746539230bdc84a6a24cee','GP'),
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
insert into user_profile(user_id, name,gender,phone,birth_date,profession,about_me) values
                                                                                        (1, 'Dr. Emily Roberts','male','+44 1212 343478','1964-10-2', 'General Practitioner', 'Cardiology: Focuses on heart and cardiovascular diseases.'),
                                                                                        (2, 'Dr. John Smith', 'male','+44 1234 343478','1988-08-09','General Practitioner',  'Neurology: Treats disorders of the nervous system, including the brain and spinal cord.'),
                                                                                        (3, 'Dr. Susan Lee', 'male','+44 1252 343478','1990-12-21','General Practitioner',  'Orthopedics: Deals with the musculoskeletal system, including bones, joints, and muscles. Pediatrics: Specializes in medical care for infants, children, and adolescents.'),
                                                                                        (4, 'Dr. Mark Johnson', 'male','+44 1282 343478','1978-12-02','General Practitioner', 'Oncology: Focuses on cancer diagnosis and treatment.'),
                                                                                        (5, 'Dr. John Doe', 'male','+44 1219 343478','1977-03-05','General Practitioner',  'Gastroenterology: Treats disorders of the digestive system.'),
                                                                                        (6, 'Dr. Mary Jane', 'male','+44 1211 343478','1989-06-09','General Practitioner',  'Psychiatry: Focuses on mental health and behavioral disorders.');

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

CREATE OR REPLACE FUNCTION generate_slots(gp_id INTEGER, start_date DATE, end_date DATE)
    RETURNS VOID AS $$
DECLARE
    currentDate DATE := start_date;
    hour INTEGER;
BEGIN
    WHILE currentDate <= end_date LOOP
            FOR hour IN 8..18 LOOP
                    INSERT INTO slots(gp_id, date, day_of_week, duration)
                    VALUES (gp_id, currentDate, trim(to_char(currentDate, 'Day')), hour::text || ':00-' || (hour + 1)::text || ':00');
                END LOOP;
            currentDate := currentDate + INTERVAL '1 day';
        END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT generate_slots(1, '2024-05-09', '2024-06-11');
SELECT generate_slots(2, '2024-05-09', '2024-06-11');
SELECT generate_slots(3, '2024-05-09', '2024-06-11');
SELECT generate_slots(4, '2024-05-09', '2024-06-11');
SELECT generate_slots(5, '2024-05-09', '2024-06-11');
SELECT generate_slots(6, '2024-05-09', '2024-06-11');

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
                                                                        (1, 'Dr. Emily Roberts', 'General Practitioner', 5, '1234567890'),
                                                                        (2, 'Dr. John Smith', 'General Practitioner', 6, '2345678901'),
                                                                        (3, 'Dr. Susan Lee', 'General Practitioner', 6, '3456789012'),
                                                                        (4, 'Dr. Mark Johnson', 'General Practitioner', 7, '4567890123'),
                                                                        (5, 'Dr. John Doe', 'General Practitioner', 1, '5678901234'),
                                                                        (6, 'Dr. Mary Jane', 'General Practitioner', 1, '7890123456');

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

drop table if exists notification;
create table notification(
                             id serial not null ,
                             user_id integer not null,
                             message varchar(255) not null,
                             status varchar(20) not null default 'unread',
                             created_at timestamp not null default now(),
                             updated_at timestamp not null default now()
);
