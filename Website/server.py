from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/medicinal-api')
def scrape():
   
    url = "https://www.drugs.com/condition/hiv-infection.html"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    elements = soup.find("div", class_="ddc-expand-read-more").find_all("p")

    data = []
    for element in elements:
        text = element.text
        data.append({"text": text})

    json_data = json.dumps(data)

    return render_template('scraped_data.html', paragraphs=json_data)

if __name__ == '__main__':
    app.run(debug=True)
