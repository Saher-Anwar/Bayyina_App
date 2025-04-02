import unittest
from importlib.machinery import SourceFileLoader

class IsmParser_Test(unittest.TestCase):
    # Class-level variables
    longest_ism = "74:52:9:1	مُّنَشَّرَةً	N	PASS_PCPL|VF:2|ROOT:نشر|LEM:مُنَشَّرَة|F|INDEF|ACC|ADJ"
    verb = "74:55:2:1	شَآءَ	V	PERF|VF:1|ROOT:شيأ|LEM:شاءَ|3MS"
    particle = "74:55:1:1	فَ	P	REM|PREF|LEM:ف"
    empty = ""
    newLine = "\n"
    
    @classmethod
    def setUpClass(cls):
        """This is run once before any tests are run."""
        cls.ism_parser = SourceFileLoader("ism_parser", "./parser/ism_parser.py").load_module()

    def test_longest_ism(self):
        """Test for parsing the longest ISM line."""
        self.assertIsNotNone(self.ism_parser.parse_line(self.longest_ism))

    def test_verb(self):
        """Test for parsing a verb."""
        self.assertIsNone(self.ism_parser.parse_line(self.verb))

    def test_particle(self):
        """Test for parsing a particle."""
        self.assertIsNone(self.ism_parser.parse_line(self.particle))

    def test_empty(self):
        """Test for parsing an empty string."""
        self.assertIsNone(self.ism_parser.parse_line(self.empty))

    def test_newline(self):
        """Test for parsing a newline string."""
        self.assertIsNone(self.ism_parser.parse_line(self.newLine))

if __name__ == '__main__':
    unittest.main()