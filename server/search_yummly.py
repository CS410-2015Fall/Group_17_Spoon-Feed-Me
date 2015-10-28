from yummly import Client

"""
returns list of tuples 
[(recipe_name, url, ingredients, imgUrl, time, servings), ...]
"""

def search(search_terms):
	TIMEOUT = 5.0
	RETRIES = 0
	API_ID = 'c819bcc2'
	API_KEY = 'ad115aa1ff83ff347a2b40c3091a6cf0'

	client = Client(api_id=API_ID, api_key=API_KEY, timeout=TIMEOUT, retries=RETRIES)

	query = 'allrecipes+'+search_terms
	
	params = {
		'q': query,
		'maxResult': 5
	}

	search = client.search(**params)
	matches = search.matches

	urls = []
	for match in matches:
		recipe = client.recipe(match.id)
		recipe_source = recipe['source']
		recipe_img = recipe['images']

		url = (recipe.name, recipe_source['sourceRecipeUrl'], recipe.ingredientLines, recipe_img[0].hostedSmallUrl, recipe.totalTime, recipe.yields)
		urls.append(url)

	return urls