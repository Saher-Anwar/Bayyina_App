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

insert into corpus_isms (chapter, verse, `character`, token, word, tag, `status`, `number`, gender, `type`, lem)
VALUES (37, 130, 3, 1, 'إِلْيَاسِينَ', 'N', 'GEN', 'P', 'M', 'proper', 'إِلْياس');

select distinct word from corpus
where tag = "N" and info NOT like '%ROOT%'

SELECT info, MIN(word) AS word, MIN(chapter) AS chapter, MIN(verse) AS verse, MIN(word_num) AS word_num
FROM corpus
WHERE 
    tag = "N"
    AND info NOT LIKE "%ROOT%"
    AND info NOT LIKE "%PN%"
GROUP BY info;

select word 
from isms
where `root` IS NULL
GROUP BY word