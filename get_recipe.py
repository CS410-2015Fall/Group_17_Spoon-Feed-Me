from bs4 import BeautifulSoup
import requests

import os
import psycopg2
import urlparse

"""
returns dictionary
{

	{	recipe_name:	<recipe0>,
		url:			<url0>,
		instructions:	[step1'\n'...stepN'\n']
	}
	...
	{	recipe_name:	<recipeN>,
		url:			<urlN>,
		instructions:	[step1'\n'...stepN'\n']
	}
}
"""

def get_recipe(urls):

	ua = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0'
	headers = {'User-Agent': ua, 'Accept': '*/*'}

	all_recipes = {}
	for url in urls:
		if "allrecipes" in url[1]:
			try:
				resp = requests.get(url[1], headers=headers, timeout=2)
				soup = BeautifulSoup(resp.text)

				steps = []
				recipe = {}
				for step in soup.find_all('span', 'recipe-directions__list--item'):
					steps.append(step.text)

				recipe['url'] = url[1]
				recipe['instructions'] = steps
				all_recipes[url[0]] = recipe

			except requests.exceptions.Timeout:
				print "timeout"
			except requests.exceptions.ConnectionError:
				print "connection error"

	return all_recipes
