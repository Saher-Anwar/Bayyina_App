import requests

def build_corpus_database(api_path, file_path):
    """
    Build a corpus database from a text file containing URLs.

    This function reads a text file specified by file_path, where each line
    contains a URL. It then fetches the content from each URL and creates a
    dictionary where the keys are the URLs and the values are the fetched content.

    Parameters:
    file_path (str): The path to the text file containing URLs.

    Returns:
    dict: A dictionary where keys are URLs and values are the fetched content.
          If a URL cannot be fetched, its value will be None.

    Raises:
    FileNotFoundError: If the specified file_path does not exist.
    """
    with open(file_path, 'r') as file:
        for line in file:
            segments = line.split()
            if len(segments) < 3:  # Ensure there's enough data to process
                print(f"Skipping invalid line: {line.strip()}")
                continue

            # Extract common fields
            chapter, verse, word_num, token = segments[0].split(':')

            # Construct data dictionary
            data = {
                "chapter": int(chapter),
                "verse": int(verse),
                "word_num": int(word_num),
                "token": int(token),
                "tag": segments[1],
                "info": segments[2]
            }

            # Add 'word' field only if there are at least 4 segments
            if len(segments) >= 4:
                data["word"] = segments[1]
                data["tag"] = segments[2]
                data["info"] = segments[3]

            try:
                response = requests.post(api_path, json=data)
                response.raise_for_status()  # Raises HTTPError for bad responses
                print(f"Success: {response.status_code}")
            except requests.RequestException as e:
                print(f"Request failed: {e}")
                print(data)

if __name__ == "__main__":
    file_path = "quran-morphology.txt"
    api_path = "http://localhost:5000/submit_corpus_data"
    build_corpus_database(api_path, file_path)
