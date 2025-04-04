CREATE TABLE isms(
    chapter INT NOT NULL,
    verse INT NOT NULL,
    word_num INT NOT NULL,
    token INT NOT NULL,
    word VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    tag VARCHAR(255) NOT NULL,
    `status` ENUM('NOM', 'ACC', 'GEN') NOT NULL,
    gender ENUM('M', 'F') NOT NULL,
    `number` ENUM('S', 'D', 'P') NOT NULL,
    `type` ENUM('proper', 'common') NOT NULL,
    heaviness ENUM('light', 'heavy'),
    flexibility ENUM('flexible', 'partial', 'non-flexible'),
    `root` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    lem VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    PRIMARY KEY(chapter, verse, word_num, token)
);

create table morphology(
    chapter INT NOT NULL,
    verse INT NOT NULL,
    word_num INT NOT NULL,
    token INT NOT NULL,
    word VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    tag VARCHAR(255) NOT NULL,
    info VARCHAR(255) NOT NULL,
    PRIMARY KEY(chapter, verse, word_num, token)
)