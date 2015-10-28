import os
import unittest
import json

import mock_yummly
import mock_recipe

class TestServer(unittest.TestCase):

	def test_search_results(self):
		urls = mock_yummly.search('turkeysandwich')[0]

		self.assertEqual('Hot Turkey Salad Sandwiches', urls[0])
		self.assertEqual('http://allrecipes.com/Recipe/hot-turkey-salad-sandwiches/detail.aspx', urls[1])

		ingredients = urls[2]
		self.assertEqual('2 cups diced cooked turkey', ingredients[0])
		self.assertEqual('2 celery ribs, diced', ingredients[1])
		self.assertEqual('1 small onion, diced', ingredients[2])
		self.assertEqual('2 hard-cooked eggs, chopped', ingredients[3])
		self.assertEqual('3/4 cup mayonnaise', ingredients[4])
		self.assertEqual('1/2 teaspoon salt', ingredients[5])
		self.assertEqual('1/4 teaspoon pepper', ingredients[6])
		self.assertEqual('6 hamburger buns, split', ingredients[7])

		self.assertEqual('http://i2.yummly.com/Hot-Turkey-Salad-Sandwiches-Allrecipes.s.png', urls[3])
		self.assertEqual('30 Min', urls[4])
		self.assertEqual('6 servings', urls[5])

	def test_get_recipe(self):
		results = mock_recipe.get_recipe()
		"""
		the mock recipe has one result with no steps.  we want to be sure it is exluded from the 
		results the user sees.
		"""
		self.assertEqual(2, len(results))

		recipe = results[1]

		self.assertEqual('Apple Toast', recipe['name'])
		self.assertEqual('http://allrecipes.com/Recipe/apple-toast-2/detail.aspx', recipe['url'])
		self.assertEqual('4 servings', recipe['servings'])
		self.assertEqual('5 min', recipe['time'])
		self.assertEqual('http://lh3.ggpht.com/MpQq95RkQ3I3YbjevZ1dbvX1CWNaan2gAqepqu_aGaFUIGOAGxCNTSyUtqUqAeNdGhCZLmoqBV8XilVnpKcbFA=s90', recipe['imgUrl'])

		instructions = recipe['instructions']

		self.assertEqual('Set oven to broil.', instructions[0])
		self.assertEqual('Spread butter on one side of each slice of bread. Place apple slices on buttered side of bread. Sprinkle cinnamon on top. Place bread on a baking sheet.', instructions[1])
		self.assertEqual('Place in a preheated oven until toasted, about 2 minutes.', instructions[2])
