def parse_line(line):
    """
    Parses a line of text into a list of words.

    Args:
        line (str): The line of text to be parsed.

    Returns:
        list: location - word - tag - description.
    """
    parsed_line = line.split()

    if not parsed_line or not is_ism(parsed_line[2], parsed_line[3]):
        print("Not an ism")
        return None

    location = extract_location(parsed_line[0])
    description = extract_description(parsed_line[3])
    ism = parse_description(description)

    return ism

def extract_location(location):
    """
    Parses a location string into a list of integers.

    Args:
        location (str): The location string to be parsed.

    Returns:
        list: A list of integers representing the location -> chapter - verse - word - token.
    """
    return [int(x) for x in location.split(":")]

def is_ism(tag_segment, desc_segment):
    """
    Checks if the word is an ism (interrogative pronoun).

    Returns:
        bool: True if the word is an ism, False otherwise.
    """
    return False if "ROOT" not in desc_segment or tag_segment != "N" else True

def extract_description(description):
    """
    Segments a description string into a list of strings using \'|\' as the splitter.

    Args:
        description (str): The description string to be parsed.

    Returns:
        list: A list of strings representing the description.
    """       

    return description.split("|")

def parse_description(segments : list[str]):
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
        elif "INDEF" in segment:
            res["type"] = "common"
        else:
            temp = extract_gender_number(segment)
            if temp:
                res["gender"], res["number"] = temp
    
    if "type" not in res:
        res["type"] = "proper"

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
    
    return None

def start_parser():
    sample_text = "75:12:4:2	مُسْتَقَرُّ	N	PASS_PCPL|VF:10|ROOT:قرر|LEM:مُسْتَقَرّ|M|NOM"
    print(parse_line(sample_text))


if __name__ == "__main__":
    start_parser()