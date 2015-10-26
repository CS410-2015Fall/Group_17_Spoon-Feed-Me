from flask import Flask, make_response
from json import dumps
import search_yummly
import get_recipe

import logging

logging.basicConfig(filename='debug_logs.log', level=logging.WARNING)

app = Flask(__name__)

@app.route('/<search_params>')
def get_recipes(search_params):

	all_recipes = [
	{
		"url": "http://allrecipes.com/recipe/easy-banana-brownies/",
		 "instructions": 
		 	[
		 		"Preheat an oven to 325 degrees F (165 degrees C). Grease an 8 inch square pan.", 
		 		"Melt butter in sauce pan over medium-low heat. Remove from heat, add chips, and stir until melted. Set aside to cool for 5 minutes.",
		 		"Lightly beat the egg in a medium bowl. Stir in the brown sugar, banana, vanilla, and salt. Pour the melted chocolate mixture into the banana mixture, and stir until well combined. Add the flour, stirring just until incorporated. Spread the batter into the prepared pan.",
		 	 	"Bake in the preheated oven until a toothpick inserted near the center comes out with moist crumbs, about 30 minutes. Don't over bake. Remove, and cool pan on wire rack before cutting."
		 	 ],
		 	"name": "Easy Banana Brownies",
		 	"ingredients": 
			 	[
			 		"1/2 cup butter",
			 		"2/3 cup semisweet chocolate chips", 
			 		"1 large egg", 
			 		"2/3 cup packed light brown sugar", 
			 		"1 small ripe banana, mashed", 
			 		"1/2 teaspoon vanilla extract", 
			 		"1/4 teaspoon salt", 
			 		"3/4 cup all-purpose flour"
			 	]
	},
	{
		"url": "http://allrecipes.com/recipe/quick-and-easy-brownies/", 
		"instructions": 
			[
				"Melt the butter or margarine and mix all ingredients in the order given.", 
				"Bake at 350 degrees F (175 degrees C) for 20 to 30 minutes in a 9 x 13 inch greased pan."
			], 
		"name": "Quick and Easy Brownies", 
		"ingredients": 
			[
				"2 cups white sugar", 
				"1 cup butter", 
				"1/2 cup cocoa powder", 
				"1 teaspoon vanilla extract", 
				"4 eggs", 
				"1 1/2 cups all-purpose flour", 
				"1/2 teaspoon baking powder", 
				"1/2 teaspoon salt", 
				"1/2 cup walnut halves"
			]
	}, 
	{
		"url": "http://allrecipes.com/recipe/mmmmm-brownies/", 
		"instructions": 
			[
				"Preheat the oven to 325 degrees F (165 degrees C). Grease an 8x8 inch square pan.", 
				"In a medium saucepan, combine the sugar, butter and water. Cook over medium heat until boiling. Remove from heat and stir in chocolate chips until melted and smooth. Mix in the eggs and vanilla. Combine the flour, baking soda and salt; stir into the chocolate mixture. Spread evenly into the prepared pan.", 
				"Bake for 25 to 30 minutes in the preheated oven, until brownies set up. Do not overbake! Cool in pan and cut into squares."
			], 
		"name": "MMMMM... Brownies", 
		"ingredients": 
			[
				"1/2 cup white sugar", 
				"2 tablespoons butter", 
				"2 tablespoons water", 
				"1 1/2 cups semisweet chocolate chips", 
				"2 eggs", 
				"1/2 teaspoon vanilla extract", 
				"2/3 cup all-purpose flour", 
				"1/4 teaspoon baking soda", 
				"1/2 teaspoon salt"
			]
	}
]
	
	# urls = search_yummly.search(search_params)

	# all_recipes = get_recipe.get_recipe(urls)
	# want to return array of json objects
	return make_response(dumps(all_recipes))


if __name__ == '__main__':
	app.run(debug=True)