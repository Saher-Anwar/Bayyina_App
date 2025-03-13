import requests
import re
from bs4 import BeautifulSoup
from collections import defaultdict

chapter = 114
verse = 1

url = f"https://corpus.quran.com/wordbyword.jsp?chapter={chapter}&verse={verse}"
response = requests.get(url)
res = defaultdict(defaultdict)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('table', class_='morphologyTable')
    rows = table.find_all('tr')

    for row in rows:
        cells = row.find_all('td')
        if len(cells) >= 3:
            # Extract location
            span = cells[0].find('span', class_='location')
            location = span.getText(strip=True) if span else None

            if not location:
                continue

            # Extract number
            numbers = re.findall(r"\d+", location)
            numbers = tuple([int(num) for num in numbers])

            # Extract all <b> from third cell
            for b in cells[2].find_all('b'):
                res[numbers][b.getText(strip=True)] = b.find_next_sibling(string=True)

else:
    print("Failed to retrieve the webpage")

for numbers, data in res.items():
    for word, meaning in data.items():
        print(f"Location: {numbers} -> Word: {word} -> Meaning: {meaning}")
