from importlib.machinery import SourceFileLoader
import requests 
from camel_tools.utils.dediac import dediac_ar

def find_longest_ism_in_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        longest = ""
        location = ""

        for line in lines:
            segments = line.split()

            if len(segments) < 3:
                print(segments)
            if segments[2] != "N":
                continue

            if len(segments[3]) > len(longest):
                longest = segments[3]
                location = segments[0]
        
        print(location)
        return longest
    
def find_label(file_path, label):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        
        for line in lines:
            segments = line.split()

            if segments[2] != "N":
                continue
            
            if label in segments[3]:
                # get the label from segments
                start_index = segments[3].find(label)
                if segments[3][start_index-2:start_index + len(label)] == "INDEF":
                    print(line)
                    continue
                else:
                    print(line)
                    break
        
def compare_word_count(file_path, chapter):
    corpus_locations = {}
    actual_locations = {}
    corpus_count = count_corpus_words_in_chapter(file_path, chapter, corpus_locations)
    actual_count = count_actual_words_in_chapter(chapter, actual_locations)

    print(f"Corpus count: {corpus_count}")
    print(f"Actual count: {actual_count}")

    for key,val in corpus_locations.items():
        if key not in actual_locations:
            print(f"Missing: {key}")

    for key, val in actual_locations.items():
        if key not in corpus_locations:
            print(f"Extra: {key}")
            print(f"Val: {val}")

    return corpus_count == actual_count

def count_corpus_words_in_chapter(file_path, chapter, corpus_locations):
    cnt = 0
    with open(file_path, 'r') as file:
        for line in file:
            location = line.split()[0]
            curr_chapter, verse, word, token = location.split(":")
            if int(curr_chapter) == chapter and int(token) == 1:
                corpus_locations[(curr_chapter, verse, word)] = line
                cnt += 1
    
    return cnt

def count_actual_words_in_chapter(chapter, actual_locations):
    res = requests.get(f"https://quranapi.pages.dev/api/{chapter}.json")
    ayahs = res.json()["arabic2"]
    cnt = 0

    for i,ayah in enumerate(ayahs):
        for word_num, word in enumerate(ayah.split()):
            actual_locations[(str(chapter), str(i+1), str(word_num+1))] = ayah.split()
        cnt += len(ayah.split())

    return cnt

def count_corpus_words_in_ayah(file_path, chapter, ayah):
    cnt = 0
    with open(file_path, 'r') as file:
        for line in file:
            location = line.split()[0]
            curr_chapter, verse, word, token = location.split(":")
            if int(curr_chapter) == chapter and int(verse) == ayah and int(token) == 1:
                cnt += 1

    return cnt

def is_same(file_path, chapter, ayah_num, actual_ayah):
    corpus_cnt = count_corpus_words_in_ayah(file_path, chapter, ayah_num)
    actual_cnt = len(actual_ayah.split())

    print(f"Corpus count: {corpus_cnt}")
    print(f"Actual count: {actual_cnt}")
    return corpus_cnt == actual_cnt

if __name__ == "__main__":
    file_path = "quran-morphology.txt"
    # find_label(file_path, "DEF")
    # print(compare_word_count("quran-morphology.txt", 18))
    sentence = 'قالوا ياذا القرنين إن يأجوج ومأجوج مفسدون في الأرض فهل نجعل لك خرجا على أن تجعل بيننا وبينهم سدا'
    print(is_same(file_path, 18, 94, sentence))