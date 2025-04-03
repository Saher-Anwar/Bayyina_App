import unittest
import requests
from camel_tools.utils.dediac import dediac_ar 

class WordMatcher(unittest.TestCase):
    api = "http://localhost:5000/"

    def test_count_match_for_all_chapters(self):

        for i in range(1, 115):
            self.data = { "chapter": i }

            # get word count from mushaf from specific chapter
            res = requests.get(f"{self.api}get_chapter", json=self.data)
            mushaf = [word for verse in res.json()['verses'] for word in verse.split()]

            # get word count from corpus from specific chapter
            res = requests.get(f"{self.api}corpus_count_words_in_chapter", json=self.data)
            corpus = res.json()
            
            # for i in range(len(mushaf)):
            #     print(f"{mushaf[i]} {corpus[i] if i < len(corpus) else 'N/A'}\n")

            msg = f"{mushaf}\n{corpus}\nWord count doesn't match for Chapter: {self.data['chapter']}\nMushaf Count: {len(mushaf)}\nCorpus Count: {len(corpus)}"
            self.assertEqual(len(mushaf), len(corpus), msg)

if __name__ == '__main__':
    unittest.main()