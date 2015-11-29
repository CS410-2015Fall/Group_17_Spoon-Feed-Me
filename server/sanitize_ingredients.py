def sanitize(ingredient):
	fractions = ['1/4', '1/3', '1/2', '2/3', '3/4']
	cooking_terms = ['diced', 'chopped', 'split', 'halved', 'sliced', 'pureed', 'frozen', 'cups', 'cup', 'ounces', 'teaspoons', 'teaspoon', 'tablespoons', 'tablespoon']
	for word in ingredient.split():
		if word in cooking_terms or word in fractions or word.isdigit():
			ingredient = ingredient.replace(word, '').strip()
	return ingredient