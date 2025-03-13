import requests
import re
from bs4 import BeautifulSoup

chapter = 114
verse = 1

url = f"https://corpus.quran.com/wordbyword.jsp?chapter={chapter}&verse={verse}"
response = requests.get(url)
res = {}

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

            # Extract <b> from third cell
            bold = cells[2].find("b")
            pos = bold.getText(strip=True)

            # Extract actual information
            info = "" if not bold else bold.find_next_sibling(string=True)

            # Extract number
            numbers = re.findall(r"\d+", location)
            numbers = tuple([int(num) for num in numbers])

            res[numbers] = f"{pos} => {info}"
else:
    print("Failed to retrieve the webpage")

print("\n".join([f"{key}: {value}" for key, value in res.items()]))