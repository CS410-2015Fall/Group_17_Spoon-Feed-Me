from flask import Flask
from flask import jsonify
import search_yummly
import get_recipe

app = Flask(__name__)

@app.route('/<search_params>')
def get_recipes(search_params):
	urls = search_yummly.search(search_params)
	all_recipes = get_recipe.get_recipe(urls)

	return jsonify(all_recipes)


if __name__ == '__main__':
	app.run(debug=True)