CREATE TABLE isms (
    word VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin PRIMARY KEY,
    `case` ENUM('nominative', 'accusative', 'genitive') NOT NULL,
    heaviness ENUM('light', 'heavy') NOT NULL,
    flexibility ENUM('flexible', 'partial', 'none') NOT NULL,
    `number` ENUM('singular', 'pair', 'plural') NOT NULL,
    gender ENUM('m', 'f') NOT NULL,
    `type` ENUM('proper', 'common') NOT NULL
);

drop table isms;

CREATE TABLE corpus_isms(
    chapter INT NOT NULL,
    verse INT NOT NULL,
    `character` INT NOT NULL,
    token INT NOT NULL,
    word VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    tag VARCHAR(255) NOT NULL,
    `status` ENUM('nominative', 'accusative', 'genitive') NOT NULL,
    gender ENUM('m', 'f') NOT NULL,
    `number` ENUM('singular', 'pair', 'plural') NOT NULL,
    `type` ENUM('proper', 'common') NOT NULL,
    heaviness ENUM('light', 'heavy'),
    flexibility ENUM('flexible', 'partial', 'non-flexible'),
    `root` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    lem VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    PRIMARY KEY(chapter, verse, `character`)
);

ALTER TABLE corpus_isms MODIFY COLUMN `number` ENUM('S', 'D', 'P') NOT NULL;
ALTER TABLE corpus_isms MODIFY COLUMN `status` ENUM('NOM', 'ACC', 'GEN') NOT NULL;
ALTER TABLE corpus_isms MODIFY COLUMN `gender` ENUM('M', 'F') NOT NULL;
ALTER TABLE corpus_isms
DROP PRIMARY KEY,
ADD PRIMARY KEY (chapter, verse, `character`, token);

select * from corpus
where chapter = 37 and verse = 130;