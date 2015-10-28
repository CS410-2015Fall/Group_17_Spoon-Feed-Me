from lxml import html
import requests

import logging

logging.basicConfig(filename='debug_logs.log', level=logging.DEBUG)

"""
returns dictionary
{

	{	recipe_name:	<>,
		url:			<>,
		instructions:	[step1'\n'...stepN'\n'],
		ingredients:	[],
		imgUrl:			<>,
		time:			<>,
		servings:		<>
	}
	...

}
"""
def get_recipe(urls):

	ua = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0'
	headers = {'User-Agent': ua, 'Accept': '*/*'}

	all_recipes = []
	for url in urls:
		if "allrecipes" in url[1]:
			try:
				page = requests.get(url[1], headers=headers, timeout=2)

				tree = html.fromstring(page.text)
				path = '/html/body/div[1]/div[2]/div/div/section/section[3]/div/div/ol[1]/li/span/text()'
				steps = tree.xpath(path)
				
				recipe = {}
				recipe['name'] = url[0]
				recipe['url'] = url[1]
				recipe['ingredients'] = url[2]
				recipe['instructions'] = steps
				recipe['imgUrl'] = url[3]
				recipe['time'] = url[4]
				recipe['servings'] = url[5]

				if steps:
					all_recipes.append(recipe)

			except requests.exceptions.Timeout:
				logging.warning("TIMEOUT!!!!!!!!")
			except requests.exceptions.ConnectionError:
				logging.warning("CONNECTIONERROR!!!!!!!")

	return all_recipes