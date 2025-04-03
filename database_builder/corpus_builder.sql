create table corpus(
    chapter INT NOT NULL,
    verse INT NOT NULL,
    `character` INT NOT NULL,
    token INT NOT NULL,
    word VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    tag VARCHAR(255) NOT NULL,
    info VARCHAR(255) NOT NULL,
    PRIMARY KEY(chapter, verse, `character`, token)
)

alter table corpus change column `character` word_num INT NOT NULL

select * from corpus;

delete from corpus;