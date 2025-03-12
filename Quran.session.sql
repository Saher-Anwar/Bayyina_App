CREATE TABLE isms (
    word VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin PRIMARY KEY,
    `case` ENUM('nominative', 'accusative', 'genitive') NOT NULL,
    heaviness ENUM('light', 'heavy') NOT NULL,
    flexibility ENUM('flexible', 'partial', 'none') NOT NULL,
    `number` ENUM('singular', 'pair', 'plural') NOT NULL,
    gender ENUM('m', 'f') NOT NULL,
    `type` ENUM('proper', 'common') NOT NULL
);

select * from isms;