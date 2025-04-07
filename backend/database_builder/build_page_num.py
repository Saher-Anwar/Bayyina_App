import json
import requests

url = "http://localhost:5000/add_page_info"
if __name__ == "__main__":
    with open('quran_page_info.json', 'r') as f:
        page_info = json.load(f)
        res = requests.post(url, json=page_info)
        print(res)