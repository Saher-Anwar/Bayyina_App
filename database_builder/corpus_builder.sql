create table corpus(
    chapter INT NOT NULL,
    verse INT NOT NULL,
    word_num INT NOT NULL,
    token INT NOT NULL,
    word VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    tag VARCHAR(255) NOT NULL,
    info VARCHAR(255) NOT NULL,
    PRIMARY KEY(chapter, verse, `character`, token)
)

SELECT 
    verse, 
    word_num, 
    GROUP_CONCAT(word ORDER BY token SEPARATOR '') AS combined_word
FROM corpus
WHERE chapter = 114
GROUP BY verse, word_num
ORDER BY verse, word_num;
