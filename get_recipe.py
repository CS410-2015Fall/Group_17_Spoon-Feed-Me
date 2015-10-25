from bs4 import BeautifulSoup
from bs4 import SoupStrainer
import requests

import logging

logging.basicConfig(filename='debug_logs.log', level=logging.DEBUG)

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

	steps_list = SoupStrainer('ol')

	ua = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0'
	headers = {'User-Agent': ua, 'Accept': '*/*'}

	# urls =['http://allrecipes.com/recipe/10402/the-best-rolled-sugar-cookies/', 'http://allrecipes.com/recipe/146819/spooky-witches-fingers/', 'http://allrecipes.com/recipe/9920/peanut-blossoms-ii/']

	all_recipes = {}
	for url in urls:
		if "allrecipes" in url[1]:
			logging.warning(url[1])
			try:
				resp = requests.get(url[1], headers=headers, timeout=2)
				soup = BeautifulSoup(resp.text, "lxml", parse_only=steps_list)

				
				steps = []
				recipe = {}
				for step in soup.find_all('span', 'recipe-directions__list--item'):
					steps.append(step.text)

				recipe['url'] = url[1]
				recipe['ingredients'] = url[2]
				recipe['instructions'] = steps
				all_recipes[url[0]] = recipe

			except requests.exceptions.Timeout:
				logging.warning("TIMEOUT!!!!!!!!")
			except requests.exceptions.ConnectionError:
				logging.warning("CONNECTIONERROR!!!!!!!")

	logging.warning(all_recipes)
	return all_recipes