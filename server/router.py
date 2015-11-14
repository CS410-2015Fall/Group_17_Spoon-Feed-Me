from flask import Flask, make_response
from json import dumps
import search_yummly
import get_recipe

import logging

logging.basicConfig(filename='debug_logs.log', level=logging.WARNING)

app = Flask(__name__)

@app.route('/<search_params>')
def get_recipes(search_params):
	
	urls = search_yummly.search(search_params)
	# [(recipe_name, url, ingredients, imgUrl, time, servings), ...]
	steps = get_recipe.get_recipe(urls)

	# logging.warning(urls)
	# logging.warning(steps)

	# print urls
	# print steps

	all_recipes = []
	for url in urls:
		name = url[0]
		if name in steps:
			recipe = {}
			recipe['name'] = name
			recipe['url'] = url[1]
			recipe['ingredients'] = url[2]
			recipe['instructions'] = steps[name]
			recipe['imgUrl'] = url[3]
			recipe['time'] = url[4]
			recipe['servings'] = url[5]

			all_recipes.append(recipe)

	return make_response(dumps(all_recipes))


if __name__ == '__main__':
	app.run(debug=True)