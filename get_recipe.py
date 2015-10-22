from bs4 import BeautifulSoup
import requests

import os
import psycopg2
import urlparse


# def get_recipe(url):
# url = 'http://allrecipes.com/Recipe/macaroni-and-cheese-with-bacon-and-onions/detail.aspx'
url = 'http://allrecipes.com/Recipe/the-best-stuffed-mushrooms/detail.aspx'

# if (url[len(url)-1] == '/'):
# 	url = url + 'detail.aspx'

ua = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0'
headers = {'User-Agent': ua, 'Accept': '*/*'}

resp = requests.get(url, headers=headers)
print resp.status_code
# potentially check response status for error handling purposes
# if resp.status_code == 200:
soup = BeautifulSoup(resp.text)

for step in soup.find_all('span', 'recipe-directions__list--item'):
	step_text = step.text
	print step_text
