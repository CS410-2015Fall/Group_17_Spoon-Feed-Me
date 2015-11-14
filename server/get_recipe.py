from lxml import html
import requests

import logging

logging.basicConfig(filename='debug_logs.log', level=logging.DEBUG)

"""
returns list of steps
"""
def get_recipe(urls):

	ua = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0'
	headers = {'User-Agent': ua, 'Accept': '*/*'}

	all_recipes = {}
	for url in urls:
		if "allrecipes" in url[1]:
			try:
				page = requests.get(url[1], headers=headers, timeout=2)

				tree = html.fromstring(page.text)
				path = '/html/body/div[1]/div[2]/div/div/section/section[3]/div/div/ol[1]/li/span/text()'
				steps = tree.xpath(path)

				name = url[0]
				all_recipes[name] = steps

			except requests.exceptions.Timeout:
				logging.warning("TIMEOUT!!!!!!!!")
			except requests.exceptions.ConnectionError:
				logging.warning("CONNECTIONERROR!!!!!!!")

	return all_recipes