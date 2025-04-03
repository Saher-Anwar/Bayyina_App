import unittest
import requests

class WordMatcher(unittest.TestCase):
    data = {"chapter": 114}
    api = "http://localhost:5000/"

    def test_upper(self):
        # get word count from mushaf from specific chapter
        res = requests.get(f"{self.api}get_chapter", json=self.data)
        cnt = 0

        for verse in res.json()['verses']:
            for word in verse.split():
                print(word)
            cnt += len(verse.split())
        
        # get word count from corpus from specific chapter
        res = requests.get(f"{self.api}corpus_count_words_in_chapter", json=self.data)

        self.assertEqual(cnt, res.json()['count'], "Word count doesn't match")

if __name__ == '__main__':
    unittest.main()