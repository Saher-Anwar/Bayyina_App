import unittest
from importlib.machinery import SourceFileLoader

class IsmParser_Test(unittest.TestCase):

    longest_ism = "74:52:9:1	مُّنَشَّرَةً	N	PASS_PCPL|VF:2|ROOT:نشر|LEM:مُنَشَّرَة|F|INDEF|ACC|ADJ"
    verb = "74:55:2:1	شَآءَ	V	PERF|VF:1|ROOT:شيأ|LEM:شاءَ|3MS"
    particle = "74:55:1:1	فَ	P	REM|PREF|LEM:ف"
    empty = ""
    newLine = "\n"

    def test_longest_ism(self):
        ism_parser = SourceFileLoader("ism_parser", "./parser/ism_parser.py").load_module()
             
        self.assertIsNotNone(ism_parser.parse_line(self.longest_ism))

if __name__ == '__main__':
    unittest.main()