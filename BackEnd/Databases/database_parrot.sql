/* Suppression des tables */

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS cars_equipements;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS profils;

DROP TABLE IF EXISTS constructor;
DROP TABLE IF EXISTS equipements;
DROP TABLE IF EXISTS fuels;
DROP TABLE IF EXISTS towing_modes;
DROP TABLE IF EXISTS transmission_types;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS opening_hours;
DROP TABLE IF EXISTS comments;

/* Suppression des vues */

DROP VIEW IF EXISTS car_view;
DROP VIEW IF EXISTS car_equipements_view;

/* Suppression des Triggers */
    DROP TRIGGER IF EXISTS UpdateCarsID;

/* Creation table des heures d'ouverture */

CREATE TABLE opening_hours
(
    opening_id INT AUTO_INCREMENT NOT NULL,
    day        VARCHAR(255)       NOT NULL,
    morning    VARCHAR(255)       NOT NULL,
    afternoon  VARCHAR(255)       NOT NULL,
    CONSTRAINT openingHours_pk PRIMARY KEY (opening_id)
);

/* création table des services du garage */

CREATE TABLE services
(
    service_id         INT AUTO_INCREMENT NOT NULL,
    service_name        VARCHAR(255)       NOT NULL,
    service_description VARCHAR(255)       NOT NULL,
    CONSTRAINT services_pk PRIMARY KEY (service_id),
    CONSTRAINT UNIQUE (service_name)
);

/* création table des profils */

CREATE TABLE profils
(
    profil_id   INT AUTO_INCREMENT NOT NULL,
    profil_name varchar(255)       NOT NULL,
    CONSTRAINT profil_pk PRIMARY KEY (profil_id),
    CONSTRAINT UNIQUE (profil_name)
);

/* création table utilisateur */

CREATE TABLE users
(
    user_uuid VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    email     VARCHAR(255) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    profil_id INT          NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (user_uuid),
    CONSTRAINT profil_id_fk FOREIGN KEY (profil_id) REFERENCES profils (profil_id),
    CONSTRAINT UNIQUE (email)
);
/* création table Equipements */

CREATE TABLE equipements
(
    equipement_id   INT AUTO_INCREMENT NOT NULL,
    equipement_name VARCHAR(255)       NOT NULL,
    CONSTRAINT equipement_pk PRIMARY KEY (equipement_id),
    CONSTRAINT UNIQUE (equipement_name)
);

/* Création table fuels */

CREATE TABLE fuels
(
    fuel_id   INT AUTO_INCREMENT NOT NULL,
    fuel_name VARCHAR(255)       NOT NULL,
    CONSTRAINT fuel_pk PRIMARY KEY (fuel_id),
    CONSTRAINT UNIQUE (fuel_name)
);

/* création table towing_modes */

CREATE TABLE towing_modes
(
    towing_id INT AUTO_INCREMENT NOT NULL,
    mode_name VARCHAR(255),
    CONSTRAINT towing_mode_pk PRIMARY KEY (towing_id),
    CONSTRAINT UNIQUE (mode_name)
);

/* création table constructor */

CREATE TABLE constructor
(
    constructor_id   INT AUTO_INCREMENT NOT NULL,
    constructor_name VARCHAR(255)       NOT NULL,
    CONSTRAINT constructor_pk PRIMARY KEY (constructor_id),
    CONSTRAINT UNIQUE (constructor_name)

);



/* création table transmission_types */

CREATE TABLE transmission_types
(
    transmission_type_id   INT AUTO_INCREMENT NOT NULL,
    transmission_type_name VARCHAR(255)       NOT NULL,
    CONSTRAINT transmission_type_pk PRIMARY KEY (transmission_type_id),
    CONSTRAINT UNIQUE (transmission_type_name)
);

/* Création de la table comments */

CREATE TABLE comments
(
    comment_id   INT AUTO_INCREMENT NOT NULL,
    sender_name  VARCHAR(255)       NOT NULL,
    comment_text VARCHAR(255)       NOT NULL,
    garage_note  INT                NOT NULL,
    status INT NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY (comment_id)
);

/* création tables cars */

CREATE TABLE cars
(
    car_id             INT AUTO_INCREMENT NOT NULL,
    price                FLOAT        NOT NULL,
    circulation_year     INT          NOT NULL,
    mileage              INT          NOT NULL,
    horse_power          INT          NOT NULL,
    fiscal_power         INT          NOT NULL,
    doors                INT          NOT NULL,
    cylinder_capacity    INT          NOT NULL,
    motor_type           VARCHAR(255) NOT NULL,
    model_name           VARCHAR(255) NOT NULL,
    color                VARCHAR(50)  NOT NULL,
    fuel_id              INT          NOT NULL,
    towing_id            INT          NOT NULL,
    transmission_type_id INT          NOT NULL,
    constructor_id       INT          NOT NULL,
    CONSTRAINT car_pk PRIMARY KEY (car_id),
    CONSTRAINT fuel_fk FOREIGN KEY (fuel_id) REFERENCES fuels (fuel_id),
    CONSTRAINT towing_fk FOREIGN KEY (towing_id) REFERENCES towing_modes (towing_id),
    CONSTRAINT transmission_type_fk FOREIGN KEY (transmission_type_id) REFERENCES transmission_types (transmission_type_id),
    CONSTRAINT constructor_fk FOREIGN KEY (constructor_id) REFERENCES constructor (constructor_id)


);

/* création, table photos */

CREATE TABLE photos
(
    photo_id  INT AUTO_INCREMENT NOT NULL,
    photo_name VARCHAR(255)       NOT NULL,
    primary_photo VARCHAR(1) NOT NULL ,
    car_id  INT       NOT NULL,
    CONSTRAINT photo_pk PRIMARY KEY (photo_id),
    CONSTRAINT UNIQUE (photo_name),
    CONSTRAINT cars_fk FOREIGN KEY (car_id) REFERENCES cars (car_id)

);

/* création table d'association cars_equipement */

CREATE TABLE cars_equipements
(
    equipement_id INT          NOT NULL,
    car_id     INT NOT NULL,
    CONSTRAINT cars_equipements_pk PRIMARY KEY (equipement_id, car_id),
    CONSTRAINT cars_equipements_equipement_fk FOREIGN KEY (equipement_id) REFERENCES equipements (equipement_id),
    CONSTRAINT cars_equipement_cars_fk FOREIGN KEY (car_id) REFERENCES cars (car_id)
);

/* création de la vue car_view */

CREATE VIEW car_view AS
SELECT c.car_id,
       c2.constructor_name,
       c.color,
       c.price,
       c.circulation_year,
       c.mileage,
       c.horse_power,
       c.fiscal_power,
       c.doors,
       c.cylinder_capacity,
       c.motor_type,
       c.model_name,
       f.fuel_name,
       tm.mode_name,
       tt.transmission_type_name


FROM cars AS c
         JOIN ParrotDB.constructor c2 on c2.constructor_id = c.constructor_id
         JOIN ParrotDB.fuels f on f.fuel_id = c.fuel_id
         JOIN ParrotDB.towing_modes tm on tm.towing_id = c.towing_id
         JOIN ParrotDB.transmission_types tt on tt.transmission_type_id = c.transmission_type_id;

CREATE VIEW car_equipements_view AS
    SELECT c.car_id,
           e.equipement_name
FROM cars_equipements
JOIN cars c on c.car_id = cars_equipements.car_id
JOIN equipements e on cars_equipements.equipement_id = e.equipement_id

CREATE TRIGGER UpdateCarsID
    BEFORE INSERT ON ParrotDB.photos FOR EACH ROW
    BEGIN


        SET NEW.car_id = SUBSTRING_INDEX(SUBSTRING_INDEX(NEW.photo_name, "_", -1),".",1);


end;