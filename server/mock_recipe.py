
def get_recipe():
	results = [{
	    "name": "Healthy Honey and Apple Muffins",
	    "ingredients": [
	        "2 egg whites",
	        "250g wholemeal plain flour",
	        "1 tablespoon baking powder",
	        "1/2 teaspoon salt",
	        "1 teaspoon ground cinnamon",
	        "3/4 cup low fat milk",
	        "4 tablespoons vegetable oil",
	        "4 tablespoons honey",
	        "125g chopped apples"
	    ],
	    "url": "http://allrecipes.com.au/recipe/733/healthy-honey-and-apple-muffins.aspx?o_ln=SimRecipes_Link_6&o_is=SimilarRecipes",
	    "servings": "Serves: 12",
	    "time": "30 min",
	    "imgUrl": "https://lh3.googleusercontent.com/Ottj5glw-aMbVu25GJssXjxmgKxh7E6AaK4-lrBNzMMJmZgjkqIlEDNkT41ucQ6NjqSUt0_0ohEV_1vAHbkP=s90",
	    "instructions": [
	        
	    ]
	},
	{
	    "name": "Apple Banana Smoothie",
	    "ingredients": [
	        "1 frozen bananas, peeled and chopped",
	        "1/2 cup orange juice",
	        "1 Gala apple, peeled, cored and chopped",
	        "1/4 cup milk"
	    ],
	    "url": "http://allrecipes.com/Recipe/apple-banana-smoothie/detail.aspx",
	    "servings": "2 servings",
	    "time": "5 Min",
	    "imgUrl": "http://lh4.ggpht.com/FR6dVW0THRw3ox9Y4BXieVGz8-5cvdD4R55D7uFn5Y3pGil9ONjujrgYugKv29xYB7Gi0p27V9-G_CyeKiROvg=s90",
	    "instructions": [
	        "In a blender combine frozen banana, orange juice, apple and milk. Blend until smooth. pour into glasses and serve."
	    ]
	},
	{
	    "name": "Apple Toast",
	    "ingredients": [
	        "1 tablespoon butter",
	        "4 slices white or whole wheat bread",
	        "1 tablespoon cinnamon",
	        "1 large apple, cored and thinly sliced"
	    ],
	    "url": "http://allrecipes.com/Recipe/apple-toast-2/detail.aspx",
	    "servings": "4 servings",
	    "time": "5 min",
	    "imgUrl": "http://lh3.ggpht.com/MpQq95RkQ3I3YbjevZ1dbvX1CWNaan2gAqepqu_aGaFUIGOAGxCNTSyUtqUqAeNdGhCZLmoqBV8XilVnpKcbFA=s90",
	    "instructions": [
	        "Set oven to broil.",
	        "Spread butter on one side of each slice of bread. Place apple slices on buttered side of bread. Sprinkle cinnamon on top. Place bread on a baking sheet.",
	        "Place in a preheated oven until toasted, about 2 minutes."
	    ]
	}]

	recipes = []
	for recipe in results:
		if recipe['instructions']:
			recipes.append(recipe)

	return recipes