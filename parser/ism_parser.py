def parse_line(line):
    """
    Parses a line of text into a list of words.

    Args:
        line (str): The line of text to be parsed.

    Returns:
        list: location - word - tag - description.
    """
    return line.split()  

def parse_location(location):
    """
    Parses a location string into a list of integers.

    Args:
        location (str): The location string to be parsed.

    Returns:
        list: A list of integers representing the location -> chapter - verse - word - token.
    """
    return [int(x) for x in location.split(":")]

def is_ism(segment):
    """
    Checks if the word is an ism (interrogative pronoun).

    Returns:
        bool: True if the word is an ism, False otherwise.
    """

    return True if "ROOT" in segment else False

def segment_desciption(description):
    """
    Segments a description string into a list of strings using \'|\' as the splitter.

    Args:
        description (str): The description string to be parsed.

    Returns:
        list: A list of strings representing the description.
    """
    return description.split("|")

def parse_segment(segments : list[str]):
    """
    Iterates over each segment and parses it accordingly.

    Args:
        segment (str): The segment string to be parsed.

    Returns:
        JSON: A JSON containing the root word, lemma, and properties of an ism.
    """ 
    res = {}
    cases = ["NOM", "ACC", "GEN"]
    for segment in segments:
        if "ROOT" in segment:
            res["root"] = segment.split(":")[1]
        elif "LEM" in segment:
            res["lemma"] = segment.split(":")[1]
        elif segment in cases:
            res["case"] = segment
        else:
            # parse to extract gender, number, and type
            res["gender"], res["number"] = extract_gender_number(segment)
            res["type"] = extract_specificity(segment)
            
    return res

def extract_gender_number(segment):
    """
    Extracts the gender from a segment string.

    Args:
        segment (str): The segment string to be parsed.

    Returns:
        str: The gender extracted from the segment.
    """
    possible_results = ["M", "F", "MD", "FD", "MP", "FP"]
    for gen_num in possible_results:
        if gen_num in segment:
            return (gen_num, "S") if len(gen_num) == 1 else (gen_num[0], gen_num[-1])
    
    print("Gender and Number not found")

def extract_specificity(segment):
    """
    Extracts the specificity from a segment string by checking if \'INDEF \' tag exists in the segment.
    If it does, that means the word is common. Otherwise, it's proper. 

    Note:
        \'INDEF\' is the only tag that exists to specify the specificity.

    Args:
        segment (str): The segment string to be parsed.

    Returns:
        str: The specificity extracted from the segment.
    """
    return "common" if "INDEF" in segment else "proper"

def start_parser():
    sample_text = "55:29:10:1	شَأْنٍ	N	ROOT:شأن|LEM:شَأْن|M|INDEF|GEN"
    parsed_line = parse_line(sample_text)
    location = parse_location(parsed_line[0])
    description = segment_desciption(parsed_line[3])
    ism = parse_segment(description)

    print(ism)

if __name__ == "__main__":
    start_parser()