from yummly import Client

"""
returns list of tuples 
[(recipe_name0, url0), ..., (recipe_nameN, urlN)]
"""

def search(search_terms):
	TIMEOUT = 5.0
	RETRIES = 0
	API_ID = 'c819bcc2'
	API_KEY = 'ad115aa1ff83ff347a2b40c3091a6cf0'

	client = Client(api_id=API_ID, api_key=API_KEY, timeout=TIMEOUT, retries=RETRIES)

	query = 'allrecipes+'+search_terms
	print query
	params = {
		'q': query,
		'maxResult': 10
	}

	search = client.search(**params)
	matches = search.matches

	urls = []
	for match in matches:
		recipe = client.recipe(match.id)
		recipe_source = recipe['source']
		
		urls.append((recipe.name, recipe_source['sourceRecipeUrl'], recipe.ingredientLines))

	return urls