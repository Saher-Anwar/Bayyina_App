from enum import Enum

class Ism:
    def __init__(self, word):
        self.word = word
        self.meaning = None

    def set_properties(self, properties):
        self.status = ''
        self.gender = ''
        self.number = ''
        self.type = ''

    def print(self):
        print(f"Word: {self.word} -> Meaning: {self.meaning} -> Status: {self.status} -> Gender: {self.gender} -> Number: {self.number} -> Type: {self.type}")