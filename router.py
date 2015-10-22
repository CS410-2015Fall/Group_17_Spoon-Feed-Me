from flask import Flask
from flask import jsonify
import search_yummly

app = Flask(__name__)

@app.route('/<search_params>')
def get_recipes(search_params):
	urls = search_yummly.search(search_params)
	return jsonify(searched=search_params,urls=urls)



if __name__ == '__main__':
	app.run(debug=True)