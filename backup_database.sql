create database IF NOT EXISTS registry;
use registry;

DROP TABLE IF EXISTS registry_information;
DROP TABLE IF EXISTS car;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS personal;
DROP TABLE IF EXISTS technical_information;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

DROP TABLE IF EXISTS technical_information;
CREATE TABLE technical_information
(
    id                   BIGINT AUTO_INCREMENT NOT NULL,
    size                 VARCHAR(50)           NOT NULL,
    self_weight          INT                   NOT NULL,
    max_people           INT                   NOT NULL,
    length               INT                   NOT NULL,
    container_size       VARCHAR(20),
    max_container_weight INT,
    max_weight           INT                   NOT NULL,
    towing_mass          INT,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES technical_information WRITE;
INSERT INTO technical_information (id, size, self_weight, max_people, length, container_size,
                                   max_container_weight, max_weight, towing_mass)
VALUES (1, '4850 x 1825 x 1470', 1480, 4, 2775, null, null, 2000, null);
INSERT INTO technical_information (id, size, self_weight, length, max_people, container_size,
                                   max_container_weight, max_weight, towing_mass)
VALUES (2, '3801 x 1682 x 1487', 972, 4, 2405, null, null, 1347, null);
UNLOCK TABLES;
# ALTER TABLE technical_information DROP FOREIGN KEY technical_information_fk;

DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id                 BIGINT       NOT NULL AUTO_INCREMENT,
    personal_id        VARCHAR(20)  NOT NULL,
    name               VARCHAR(20)  NOT NULL,
    registration_place VARCHAR(50)  NOT NULL,
    registration_date  DATE         NOT NULL,
    DOB                DATE         NOT NULL,
    gender             VARCHAR(10)  NOT NULL,
    address            VARCHAR(100) NOT NULL,
    phone              VARCHAR(20)  NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (personal_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES personal WRITE;
INSERT INTO personal (id, name, personal_id, registration_place, registration_date, DOB, gender, address, phone)
VALUES (1, 'Đỗ Hoàng Anh', '038302892102', 'Cục trưởng cục cảnh sát', '2020-02-13', '1998-02-18', 'Nam',
        'Phường Mỹ Đình, quận Nam Từ Liêm, Hà Nội', '0987633772');
UNLOCK TABLES;
# ALTER TABLE personal DROP FOREIGN KEY personal_object_fk;

DROP TABLE IF EXISTS company;
CREATE TABLE company
(
    id             BIGINT       NOT NULL AUTO_INCREMENT,
    company_id     VARCHAR(20)  NOT NULL,
    name           VARCHAR(100) NOT NULL,

    address        VARCHAR(100) NOT NULL,
    representative VARCHAR(20)  NOT NULL,
    phone          VARCHAR(20)  NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (company_id)

) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES company WRITE;
INSERT INTO company (id, name, company_id, address, representative, phone)
VALUES (1, 'CÔNG TY CỔ PHẦN VIN GLOBAL ', '0105148109',
        'Đội 8, Thị Trấn Liên Quan, Huyện Thạch Thất, Thành phố Hà Nội, Việt Nam', 'DƯƠNG VĂN DŨNG', '0972285058');
UNLOCK TABLES;
# ALTER TABLE company_object DROP FOREIGN KEY company_object_fk;


DROP TABLE IF EXISTS car;
CREATE TABLE car
(
    id                 BIGINT AUTO_INCREMENT NOT NULL,
    license_plate      VARCHAR(100)          NOT NULL,
    car_id             BIGINT                NOT NULL,
    registration_date  DATE                  NOT NULL,
    registration_place VARCHAR(100)          NOT NULL,
    brand              VARCHAR(100)          NOT NULL,
    model              VARCHAR(100)          NOT NULL,
    patch              VARCHAR(100)          NOT NULL,
    color              VARCHAR(100)          NOT NULL,
    frame_number       VARCHAR(100)          NOT NULL,
    engine_number      VARCHAR(100)          NOT NULL,
    purpose            VARCHAR(100)          NOT NULL,
    personal_id        BIGINT,
    company_id         BIGINT,
    technical_id       BIGINT                NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY (license_plate),
    UNIQUE KEY (frame_number),
    UNIQUE KEY (engine_number),
    UNIQUE KEY (car_id),

    KEY car_fk (personal_id),
    KEY car_fk_1 (company_id),
    KEY car_fk_2 (technical_id),
    CONSTRAINT car_fk FOREIGN KEY (personal_id) REFERENCES personal (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT car_fk_1 FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT car_fk_2 FOREIGN KEY (technical_id) REFERENCES technical_information (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 12
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES car WRITE;
INSERT INTO car (id, car_id, license_plate, registration_date, registration_place, brand, model, patch, color,
                 frame_number,
                 engine_number, purpose, personal_id, company_id, technical_id)
VALUES (1, 288239, '29A-12508', '2020-12-20', 'Hà Nội', 'Toyota', 'Toyota Camry', 'Camry 2.0E', 'Đỏ',
        'JTNBF3EK70J007654',
        '2AZFE315728',
        'Đi lại cá nhân', 1, null, 1);
INSERT INTO car (id, car_id, license_plate, registration_date, registration_place, brand, model, patch, color,
                 frame_number,
                 engine_number, purpose, personal_id, company_id, technical_id)
VALUES (2, 300000, '36D-27328', '2018-1-12', 'Thanh Hóa', 'Honda', 'Honda Brio', 'Brio RS', 'Trắng',
        'MFJHNB4V7LY000123',
        'L13B2031567', 'Kinh doanh chở khách', null, 1, 2);
UNLOCK TABLES;

DROP TABLE IF EXISTS registry_information;
CREATE TABLE registry_information
(
    id              BIGINT AUTO_INCREMENT NOT NULL,
    gcn             VARCHAR(20)           NOT NULL,
    registry_date   DATE                  NOT NULL,
    expired_date    DATE                  NOT NULL,
    registry_center VARCHAR(100)          NOT NULL,
    registry_car_id BIGINT                NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (gcn),

    KEY registry_information_fk (registry_car_id),
    CONSTRAINT registry_information_fk FOREIGN KEY (registry_car_id) REFERENCES car (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES registry_information WRITE;
INSERT INTO registry_information (id, gcn, registry_date, expired_date, registry_center, registry_car_id)
VALUES (1, '327A-32238', '2019-10-19', '2020-04-19', '2903S', 1);
INSERT INTO registry_information (id, gcn, registry_date, expired_date, registry_center, registry_car_id)
VALUES (2, '327A-32987', '2019-10-19', '2020-04-19', '3003S', 2);
INSERT INTO registry_information (id, gcn, registry_date, expired_date, registry_center, registry_car_id)
VALUES (3, '327A-32939', '2019-10-19', '2020-04-19', '2903S', 1);
UNLOCK TABLES;
# ALTER TABLE registry_information DROP FOREIGN KEY registry_information_fk;


DROP TABLE IF EXISTS users;
CREATE TABLE users
(
    id                BIGINT AUTO_INCREMENT NOT NULL,
    email             VARCHAR(50)           NOT NULL,
    name              VARCHAR(50)           NOT NULL,
    password          VARCHAR(120)          NOT NULL,
    username          VARCHAR(50)           NOT NULL,
    created_time      DATETIME DEFAULT (now()),
    last_updated_time DATETIME DEFAULT (now()),
    PRIMARY KEY (id),
    unique (username),
    unique (email)


) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES users WRITE;
INSERT INTO users (id, email, name, password, username)
VALUES (1, 'admin@gmail.com', 'Registry Admin System', '$2a$10$1uJwpUKQ3fwqmN.4TO0yned3WYrGcUmVygzORWnPAWfHPuTioK326',
        'admin');
INSERT INTO users (id, email, name, password, username)
VALUES (2, '1000S@gmail.com', 'Trung Tâm Đăng Kiểm 1000S',
        '$2a$10$NKbnbm0n2OoCdOCHL2lOhuBCuScjIOcejqmKWLfUUTjktSyd5fC.G', '1000S');
INSERT INTO users (id, email, name, password, username)
VALUES (3, '32000S@gmail.com', 'Trung Tâm Đăng Kiểm 32000S',
        '$2a$10$vN9S6zid9S7CDAZGocIxiuTLvgcWXtmRNSCFtVgdysc8pijXvO7wW', '32000S');
UNLOCK TABLES;

DROP TABLE IF EXISTS roles;
CREATE TABLE roles
(
    id                BIGINT AUTO_INCREMENT NOT NULL,
    name              VARCHAR(20)           NOT NULL,
    created_time      DATETIME              null,
    last_updated_time DATETIME              null,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES roles WRITE;
INSERT INTO roles (id, name)
VALUES (1, 'ROLE_USER');
INSERT INTO roles (id, name)
VALUES (2, 'ROLE_ADMIN');
UNLOCK TABLES;

DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles
(
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,

    PRIMARY KEY (user_id, role_id),

    KEY user_roles_fk (user_id),
    KEY user_roles_fk_1 (role_id),
    CONSTRAINT user_roles_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT user_roles_fk_1 FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES user_roles WRITE;
INSERT INTO user_roles (user_id, role_id)
VALUES (1, 2);
INSERT INTO user_roles (user_id, role_id)
VALUES (2, 1);
INSERT INTO user_roles (user_id, role_id)
VALUES (3, 1);
UNLOCK TABLES;


