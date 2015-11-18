from lxml import html
import requests

import logging

logging.basicConfig(filename='debug_logs.log', level=logging.DEBUG)

def picture(ingredients):
	ua = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:32.0) Gecko/20100101 Firefox/32.0'
	headers = {'User-Agent': ua, 'Accept': '*/*'}

	all_imgs = {}
	for ingredient in ingredients:
		extra_stuff = '&tbm=isch'
		query = 'https://www.google.ca/search?q=' + ingredient + extra_stuff

		try:
			page = requests.get(query, headers=headers, timeout=2)

			tree = html.fromstring(page.text)
			path = '/html/body/div[5]/div[4]/div[2]/div[3]/div/div[2]/div[2]/div/div/div/div/div[1]/div[1]/div[1]/div[1]/a/@href'
			img = tree.xpath(path)
			
			if len(img) > 0:
				img = img[0]
				img_url = img[img.find("imgurl=")+7:img.find("&")]
				all_imgs[ingredient] = img_url
			else:
				all_imgs[ingredient] = []

		except requests.exceptions.Timeout:
				logging.warning("TIMEOUT GETTING PICTURE")
		except requests.exceptions.ConnectionError:
				logging.warning("CONNECTIONERROR GETTING PICTURE")

	return all_imgs