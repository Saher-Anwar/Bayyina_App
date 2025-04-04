select distinct word from morphology
where tag = "N" and info NOT like '%ROOT%'

SELECT info, MIN(word) AS word, MIN(chapter) AS chapter, MIN(verse) AS verse, MIN(word_num) AS word_num
FROM morphology
WHERE 
    tag = "N"
    AND info NOT LIKE "%ROOT%"
    AND info NOT LIKE "%PN%"
GROUP BY info;