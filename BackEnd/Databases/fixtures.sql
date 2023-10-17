/* jeux de données pour démo et test */

/* données de la table constructeur */

INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('1','Bmw');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('2','Mercedes');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('3','Renault');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('4','Peugeot');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('5','Nissan');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('6','Ford');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('7','Audi');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('8','Hunday');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('9','Ferrari');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('10','Lamborghini');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('11','Porsche');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('12','Alfa Roméo');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('13','Citroën');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('14','Dacia');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('15','Fiat');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('16','DS Automobiles');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('18','Jeep');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('19','Lexus');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('20','Mini');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('21','Opel');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('22','Tesla');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('23','Toyota');
INSERT INTO ParrotDB.constructor (constructor_id, constructor_name)
VALUES ('24','Volkswagen');


/* données de la table fuel */

INSERT INTO ParrotDB.fuels (fuel_id, fuel_name)
VALUES ('1','Diesel');
INSERT INTO ParrotDB.fuels (fuel_id,fuel_name)
VALUES ('2','Essence');
INSERT INTO ParrotDB.fuels (fuel_id, fuel_name)
VALUES ('3','Hybride');
INSERT INTO ParrotDB.fuels (fuel_id, fuel_name)
VALUES ('4','Electrique');

/* données de la table towing_modes */

INSERT INTO ParrotDB.towing_modes (towing_id, mode_name)
VALUES ('1','Traction');
INSERT INTO ParrotDB.towing_modes (towing_id, mode_name)
VALUES ('2','Propulsion');
INSERT INTO ParrotDB.towing_modes (towing_id, mode_name)
VALUES ('3','Propulsion + integrale non permanente');
INSERT INTO ParrotDB.towing_modes (towing_id, mode_name)
VALUES ('4','4X4 permanent');
INSERT INTO ParrotDB.towing_modes (towing_id, mode_name)
VALUES ('5','Traction + integrale non permanente');
INSERT INTO ParrotDB.towing_modes (towing_id, mode_name)
VALUES ('6','Traction + integrale manuelle');
INSERT INTO ParrotDB.towing_modes (towing_id, mode_name)
VALUES ('7','Propulsion + integrale manuelle');


/* données de la table transmission_types */

INSERT INTO ParrotDB.transmission_types (transmission_type_id, transmission_type_name)
VALUES ('1','Manuel');
INSERT INTO ParrotDB.transmission_types (transmission_type_id, transmission_type_name)
VALUES ('2','Automatique');

/* données de la table equipement */

INSERT INTO ParrotDB.equipements (equipement_id, equipement_name)
VALUES ('1','CarPlay et Android Auto');
INSERT INTO ParrotDB.equipements (equipement_id, equipement_name)
VALUES ('2','Climatisation');
INSERT INTO ParrotDB.equipements (equipement_id, equipement_name)
VALUES ('3','Caméra recul');
INSERT INTO ParrotDB.equipements (equipement_id, equipement_name)
VALUES ('4','Caméra 360');
INSERT INTO ParrotDB.equipements (equipement_id, equipement_name)
VALUES ('5','Régulation de vitesse');
INSERT INTO ParrotDB.equipements (equipement_id, equipement_name)
VALUES ('6','Régulateur adaptatif');
INSERT INTO ParrotDB.equipements (equipement_id, equipement_name)
VALUES ('7','Feux automatique');

/* données de la table opening_hours */

INSERT INTO ParrotDB.opening_hours (opening_id,day, morning, afternoon)
VALUES (1,'Lundi', '8h - 12h', '14h - 19h');
INSERT INTO ParrotDB.opening_hours (opening_id,day, morning, afternoon)
VALUES (2,'Mardi', '8h - 12h', '14h - 19h');
INSERT INTO ParrotDB.opening_hours (opening_id,day, morning, afternoon)
VALUES (3,'Mercredi', '8h - 12h', '14h - 16h');
INSERT INTO ParrotDB.opening_hours (opening_id,day, morning, afternoon)
VALUES (4,'Jeudi', '8h - 12h', '14h - 19h');
INSERT INTO ParrotDB.opening_hours (opening_id,day, morning, afternoon)
VALUES (5,'Vendredi', '8h - 12h', '14h - 19h');
INSERT INTO ParrotDB.opening_hours (opening_id,day, morning, afternoon)
VALUES (6,'Samedi', '10h - 12h', '14h - 16h');
INSERT INTO ParrotDB.opening_hours (opening_id,day, morning, afternoon)
VALUES (7,'Dimanche', 'Fermé', 'fermé');

/* données de la table profils */

INSERT INTO ParrotDB.profils (profil_id,profil_name)
VALUES (2,'utilisateur');
INSERT INTO ParrotDB.profils (profil_id,profil_name)
VALUES (1,'administrateur');

/* donnée de la table cars */
INSERT INTO ParrotDB.cars (car_id, price, circulation_year, mileage, horse_power, fiscal_power, doors,
                           cylinder_capacity, motor_type, model_name, color, fuel_id, towing_id, transmission_type_id,
                           constructor_id)
VALUES (1, 25000, 2015, 150000,  200, 8, 2, 2000, 'GTI', '208', 'Noire', 2,
        2, 1, 4);
INSERT INTO ParrotDB.cars (car_id, price, circulation_year, mileage, horse_power, fiscal_power, doors,
                           cylinder_capacity, motor_type, model_name, color, fuel_id, towing_id, transmission_type_id,
                           constructor_id)
VALUES (2, 22000, 2020, 15000,  100, 4, 4, 1600, 'DCI', '316i', 'Noire', 2,
        2, 2, 1);


/* Ajout d'utilisateurs */
INSERT INTO ParrotDB.users (user_uuid, first_name, last_name, email, password, profil_id) VALUES ('395e2d3c-283d-4188-879a-767ce549e4d3', 'herve', 'demuylder', 'demuylder.herve@gmail.com', '$2b$10$aTqCf5Jaq.qnZfYzWlk80eJxh9/aEDBMvQw7.miVZX/ncst6izVdq', 2);
INSERT INTO ParrotDB.users (user_uuid, first_name, last_name, email, password, profil_id) VALUES ('b23ecd86-9493-4178-88ab-af0bb92c36ef', 'Vincent', 'Parrot', 'vincent.parrot@geek2tech.Fr', '$2b$10$aTqCf5Jaq.qnZfYzWlk80eJxh9/aEDBMvQw7.miVZX/ncst6izVdq', 1);
INSERT INTO ParrotDB.users (user_uuid, first_name, last_name, email, password, profil_id) VALUES ('0631713d-63db-4e3f-9b17-f6f2c2c93268', 'Eric', 'Cruvelier', 'eric.cruvelier@geek2tech.Fr', '$2b$10$aTqCf5Jaq.qnZfYzWlk80eJxh9/aEDBMvQw7.miVZX/ncst6izVdq', 2);


/* AJout de services */
INSERT INTO ParrotDB.services (service_id, service_name, service_description) VALUES (1, 'Pre-visite', 'Controle du véhicule en prévision du controle technique');
INSERT INTO ParrotDB.services (service_id, service_name, service_description) VALUES (2, 'Vidange', 'Replacement des filtres et huile ');
INSERT INTO ParrotDB.services (service_id, service_name, service_description) VALUES (3, 'Changement Pneu', 'Remplacement des pneumatiques usés');
INSERT INTO ParrotDB.services (service_id, service_name, service_description) VALUES (4, 'Réparation Mécanique', 'Réparation de panne mécanique');
INSERT INTO ParrotDB.services (service_id, service_name, service_description) VALUES (5,'Réparation Carosserie', 'Réparation de dégats sur la  carosserie');

/* Ajout de relation équipements / Voitures */
INSERT INTO ParrotDB.cars_equipements (equipement_id, car_id) VALUES (1, 1);
INSERT INTO ParrotDB.cars_equipements (equipement_id, car_id) VALUES (2, 1);
INSERT INTO ParrotDB.cars_equipements (equipement_id, car_id) VALUES (3, 1);
INSERT INTO ParrotDB.cars_equipements (equipement_id, car_id) VALUES (5, 1);
INSERT INTO ParrotDB.cars_equipements (equipement_id, car_id) VALUES (1, 2);
INSERT INTO ParrotDB.cars_equipements (equipement_id, car_id) VALUES (2, 2);
INSERT INTO ParrotDB.cars_equipements (equipement_id, car_id) VALUES (3, 2);
INSERT INTO ParrotDB.cars_equipements (equipement_id, car_id) VALUES (6, 2);
INSERT INTO ParrotDB.cars_equipements (equipement_id, car_id) VALUES (7, 2);

/* Ajout de commentaires */

INSERT INTO ParrotDB.comments (comment_id,sender_name, comment_text, garage_note, status) VALUES (1,'herve', 'Super acceuil et travaille nickel', 5, 0);
INSERT INTO ParrotDB.comments (comment_id,sender_name, comment_text, garage_note, status) VALUES (2,'Mr vilock', 'Travail rapide et efficace', 4, 1);
INSERT INTO ParrotDB.comments (comment_id,sender_name, comment_text, garage_note, status) VALUES (3,'débora baliru', 'Remplacement plaquettes et liquide de frein , tarif abordable et personnels sympas', 5, 0);

/* Ajout de photo par defaut pour les deux voitures */
INSERT INTO ParrotDB.photos (photo_name, primary_photo) VALUES ('791459_1', 'y');
INSERT INTO ParrotDB.photos (photo_name, primary_photo) VALUES ('6969321_2', 'Y');