show databases;
show tables in registry;
show tables in registry like 'account';
use registry;

DROP TABLE IF EXISTS account;
CREATE TABLE account (
                         id INT NOT NULL AUTO_INCREMENT,
                         username VARCHAR(100) NOT NULL,
                         password VARCHAR(100) NOT NULL,
                         role_id INT NOT NULL,
                         PRIMARY KEY (id),
                         UNIQUE KEY (username),
                         KEY user_role_fk (role_id),
                         CONSTRAINT user_role_fk FOREIGN KEY (role_id) REFERENCES role (id)

)ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES account WRITE;
INSERT INTO account (id, username, password, role_id) VALUES (1, 'admin', 'admin', 1);
UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS role
(
    id   INT         NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (name)
    )ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES role WRITE;
INSERT INTO role (id, name) VALUES (1, 'admin');
UNLOCK TABLES;

DROP TABLE IF EXISTS car;
CREATE TABLE car (
                     id BIGINT NOT NULL,
                     license_plate VARCHAR(100) NOT NULL,
                     registration_date DATE NOT NULL,
                     registration_place VARCHAR(100) NOT NULL,
                     brand VARCHAR(100) NOT NULL,
                     model VARCHAR(100) NOT NULL,
                     type VARCHAR(100) NOT NULL,
                     color VARCHAR(100) NOT NULL,
                     frame_number VARCHAR(100) NOT NULL,
                     engine_number VARCHAR(100) NOT NULL,
                     purpose VARCHAR(100) NOT NULL,
                     owner_id VARCHAR(20) NOT NULL,
                     PRIMARY KEY (id),
                     UNIQUE KEY (license_plate),
                     UNIQUE KEY (frame_number),
                     UNIQUE KEY (engine_number),
                     UNIQUE KEY (owner_id)

)ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES car WRITE;
INSERT INTO car (id, license_plate, registration_date, registration_place, brand, model, type, color, frame_number, engine_number, purpose, owner_id) VALUES (288239, '29A-12508', '2020-12-20', 'Hà Nội', 'Toyota', 'S13', 'Ô tô con', 'Đỏ', 'KABM586MAHS87', 'GHE965151550', 'Dịch vụ chở khách', '038302892102');
INSERT INTO car (id, license_plate, registration_date, registration_place, brand, model, type, color, frame_number, engine_number, purpose, owner_id) VALUES (300000, '36D-27328', '2018-1-12', 'Thanh Hóa', 'Honda', 'H3000', 'Ô tô tải', 'Trắng', 'MHAN838HNGG82', 'NAG923323228', 'Đi lại cá nhân', '031422133767');
UNLOCK TABLES;

DROP TABLE IF EXISTS owner;

DROP TABLE IF EXISTS personal_object;
CREATE TABLE personal_object (
                                 name VARCHAR(20) NOT NULL,
                                 id VARCHAR(20) NOT NULL,
                                 place VARCHAR(50) NOT NULL,
                                 id_date DATE NOT NULL,
                                 birthday DATE NOT NULL,
                                 sex VARCHAR(10) NOT NULL,
                                 permanent_address VARCHAR(100) NOT NULL,
                                 phone VARCHAR(20) NOT NULL,
                                 PRIMARY KEY (id),
                                 KEY personal_object_fk (id),
                                 CONSTRAINT personal_object_fk FOREIGN KEY (id) REFERENCES car (owner_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES personal_object WRITE;
INSERT INTO personal_object (name, id, place, id_date, birthday, sex, permanent_address, phone) VALUES ('Đỗ Hoàng Anh', '038302892102', 'Cục trưởng cục cảnh sát', '2020-02-13', '1998-02-18', 'Nam', 'Phường Mỹ Đình, quận Nam Từ Liêm, Hà Nội', '0987633772');
UNLOCK TABLES;
ALTER TABLE personal_object DROP FOREIGN KEY personal_object_fk;

DROP TABLE IF EXISTS company_object;
CREATE TABLE company_object (
                                name VARCHAR(100) NOT NULL,
                                id VARCHAR(20) NOT NULL,
                                place VARCHAR(100) NOT NULL,
                                representative VARCHAR(20) NOT NULL,
                                phone VARCHAR(20) NOT NULL,
                                PRIMARY KEY (id),
                                KEY company_object_fk (id),
                                CONSTRAINT company_object_fk FOREIGN KEY (id) REFERENCES car (owner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES company_object WRITE;
INSERT INTO company_object (name, id, place, representative, phone) VALUES ('CÔNG TY CỔ PHẦN VIN GLOBAL ', '0105148109', 'Đội 8, Thị Trấn Liên Quan, Huyện Thạch Thất, Thành phố Hà Nội, Việt Nam', 'DƯƠNG VĂN DŨNG', '0972285058');
UNLOCK TABLES;
ALTER TABLE company_object DROP FOREIGN KEY company_object_fk;

DROP TABLE IF EXISTS technical_information;
CREATE TABLE technical_information (
                                       id BIGINT NOT NULL,
                                       size VARCHAR(50) NOT NULL,
                                       self_weight INT NOT NULL,
                                       max_people INT NOT NULL,
                                       axles_div_wheelbase VARCHAR(20) NOT NULL,
                                       container_size VARCHAR(20),
                                       max_container_weight INT,
                                       max_weight INT NOT NULL,
                                       towing_mass INT,
                                       PRIMARY KEY (id),
                                       KEY technical_information_fk (id),
                                       CONSTRAINT technical_information_fk FOREIGN KEY (id) REFERENCES car (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES technical_information WRITE;
INSERT INTO technical_information (id, size, self_weight, max_people, axles_div_wheelbase, container_size, max_container_weight, max_weight, towing_mass) VALUES (288239, '4410x1700x1475 mm', 1058, 5, '2/2550', null, null, 1500, null);
UNLOCK TABLES;
ALTER TABLE technical_information DROP FOREIGN KEY technical_information_fk;

DROP TABLE IF EXISTS registry_information;
CREATE TABLE registry_information(
                                     id BIGINT NOT NULL,
                                     GCN_id VARCHAR(20) NOT NULL,
                                     registry_date DATE NOT NULL,
                                     expired_date DATE NOT NULL,
                                     registry_name VARCHAR(20) NOT NULL,
                                     PRIMARY KEY (id),
                                     UNIQUE KEY (GCN_id),
                                     KEY registry_information_fk (id),
                                     CONSTRAINT registry_information_fk FOREIGN KEY (id) REFERENCES car (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES registry_information WRITE;
INSERT INTO registry_information (id, GCN_id, registry_date, expired_date, registry_name) VALUES (288239, '327A-32238', '2019-10-19', '2020-04-19', '2903S');
UNLOCK TABLES;
ALTER TABLE registry_information DROP FOREIGN KEY registry_information_fk;

SELECT * FROM account, role
WHERE role_id = role.id;