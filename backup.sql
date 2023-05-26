show databases;
create database registry;
show tables in registry;
show tables in registry like 'account';
use registry;

DROP TABLE IF EXISTS technical_information;
CREATE TABLE technical_information
(
    id                   BIGINT AUTO_INCREMENT NOT NULL,
    technical_id         VARCHAR(50)           NOT NULL,
    size                 VARCHAR(50)           NOT NULL,
    self_weight          INT                   NOT NULL,
    max_people           INT                   NOT NULL,
    axles_div_wheelbase  VARCHAR(20)           NOT NULL,
    container_size       VARCHAR(20),
    max_container_weight INT,
    max_weight           INT                   NOT NULL,
    towing_mass          INT,
    PRIMARY KEY (id),
    UNIQUE KEY (technical_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES technical_information WRITE;
INSERT INTO technical_information (technical_id, size, self_weight, max_people, axles_div_wheelbase, container_size,
                                   max_container_weight, max_weight, towing_mass)
VALUES ('KABM586MAHS87', '4410x1700x1475 mm', 1058, 5, '2/2550', null, null, 1500, null);
INSERT INTO technical_information (technical_id, size, self_weight, max_people, axles_div_wheelbase, container_size,
                                   max_container_weight, max_weight, towing_mass)
VALUES ('MHAN838HNGG82', '4410x1700x1475 mm', 1058, 5, '2/2550', null, null, 1500, null);
UNLOCK TABLES;
# ALTER TABLE technical_information DROP FOREIGN KEY technical_information_fk;

DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id                BIGINT       NOT NULL AUTO_INCREMENT,
    personal_id       VARCHAR(20)  NOT NULL,
    name              VARCHAR(20)  NOT NULL,
    place             VARCHAR(50)  NOT NULL,
    date_id            DATE         NOT NULL,
    birthday          DATE         NOT NULL,
    sex               VARCHAR(10)  NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone             VARCHAR(20)  NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (personal_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES personal WRITE;
INSERT INTO personal (name, personal_id, place, date_id, birthday, sex, address, phone)
VALUES ('Đỗ Hoàng Anh', '038302892102', 'Cục trưởng cục cảnh sát', '2020-02-13', '1998-02-18', 'Nam',
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
INSERT INTO company (name, company_id, address, representative, phone)
VALUES ('CÔNG TY CỔ PHẦN VIN GLOBAL ', '0105148109',
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
    type               VARCHAR(100)          NOT NULL,
    color              VARCHAR(100)          NOT NULL,
    frame_number       VARCHAR(100)          NOT NULL,
    engine_number      VARCHAR(100)          NOT NULL,
    purpose            VARCHAR(100)          NOT NULL,
    personal_id        VARCHAR(100),
    company_id         VARCHAR(100),
    technical_id       VARCHAR(100)          NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY (license_plate),
    UNIQUE KEY (frame_number),
    UNIQUE KEY (engine_number),
    UNIQUE KEY (car_id),

    KEY car_fk (personal_id),
    KEY car_fk_1 (company_id),
    KEY car_fk_2 (technical_id),
    CONSTRAINT car_fk FOREIGN KEY (personal_id) REFERENCES personal (personal_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT car_fk_1 FOREIGN KEY (company_id) REFERENCES company (company_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT car_fk_2 FOREIGN KEY (technical_id) REFERENCES technical_information (technical_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 12
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES car WRITE;
INSERT INTO car (car_id, license_plate, registration_date, registration_place, brand, model, type, color, frame_number,
                 engine_number, purpose, personal_id, company_id, technical_id)
VALUES (288239, '29A-12508', '2020-12-20', 'Hà Nội', 'Toyota', 'S13', 'Ô tô con', 'Đỏ', 'KABM586MAHS87', 'GHE965151550',
        'Dịch vụ chở khách', '038302892102', null, 'KABM586MAHS87');
INSERT INTO car (car_id, license_plate, registration_date, registration_place, brand, model, type, color, frame_number,
                 engine_number, purpose, personal_id, company_id, technical_id)
VALUES (300000, '36D-27328', '2018-1-12', 'Thanh Hóa', 'Honda', 'H3000', 'Ô tô tải', 'Trắng', 'MHAN838HNGG82',
        'NAG923323228', 'Đi lại cá nhân', null, '0105148109', 'MHAN838HNGG82');
UNLOCK TABLES;

DROP TABLE IF EXISTS registry_information;
CREATE TABLE registry_information
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    gcn_id        VARCHAR(20)           NOT NULL,
    registry_date DATE                  NOT NULL,
    expired_date  DATE                  NOT NULL,
    registry_name VARCHAR(20)           NOT NULL,
    car_id        BIGINT                NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (car_id),
    UNIQUE KEY (gcn_id),

    KEY registry_information_fk (car_id),
    CONSTRAINT registry_information_fk FOREIGN KEY (car_id) REFERENCES car (car_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES registry_information WRITE;
INSERT INTO registry_information (id, gcn_id, registry_date, expired_date, registry_name, car_id)
VALUES (288239, '327A-32238', '2019-10-19', '2020-04-19', '2903S', 288239);
UNLOCK TABLES;
# ALTER TABLE registry_information DROP FOREIGN KEY registry_information_fk;


DROP TABLE IF EXISTS registry_information;
DROP TABLE IF EXISTS car;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS personal;
DROP TABLE IF EXISTS technical_information;
