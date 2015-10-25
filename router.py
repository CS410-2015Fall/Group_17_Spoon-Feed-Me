from flask import Flask, make_response
from json import dumps
import search_yummly
import get_recipe

import logging

logging.basicConfig(filename='debug_logs.log', level=logging.WARNING)

app = Flask(__name__)

@app.route('/<search_params>')
def get_recipes(search_params):

	all_recipes = [{
	    "Chocolate-Covered OREO Cookie Cake": {
	      "ingredients": [
	        "1 (18.25 ounce) package devil's food chocolate cake mix", 
	        "4 (1 ounce) squares BAKER'S Semi-Sweet Chocolate", 
	        "1/4 cup butter", 
	        "1 (8 ounce) package PHILADELPHIA Cream Cheese, softened", 
	        "1/2 cup sugar", 
	        "2 cups thawed COOL WHIP Whipped Topping", 
	        "12 OREO Cookies, coarsely crushed"
	      ], 
	      "instructions": [
	        "Heat oven to 350 degrees F.", 
	        "Prepare cake batter and bake in 2 (9-inch) round pans as directed on package. Cool cakes in pans 10 min. Invert onto wire racks; gently remove pans. Cool cakes completely.", 
	        "Microwave chocolate and butter in small microwaveable bowl on HIGH 2 min. or until butter is melted. Stir until chocolate is completely melted. Cool 5 min. Meanwhile, beat cream cheese and sugar in large bowl with mixer until blended. Gently stir in COOL WHIP and crushed cookies.", 
	        "Place 1 cake layer on plate, spread with cream cheese mixture. Top with remaining cake layer. Spread top with chocolate glaze; let stand 10 min. or until firm. Keep refrigerated.", 
	        ""
	      ], 
	      "url": "http://allrecipes.com/Recipe/Chocolate-Covered-OREO-Cookie-Cake/Detail.aspx"
	    }, 
	    "Coconut Poke Cake": {
	      "ingredients": [
	        "1 (18.25 ounce) package white cake mix", 
	        "1 (14 ounce) can cream of coconut", 
	        "1 (14 ounce) can sweetened condensed milk", 
	        "1 (16 ounce) package frozen whipped topping, thawed", 
	        "1 (8 ounce) package flaked coconut"
	      ], 
	      "instructions": [
	        "Prepare and bake white cake mix according to package directions. Remove cake from oven. While still hot, using a utility fork, poke holes all over the top of the cake.", 
	        "Mix cream of coconut and sweetened condensed milk together. Pour over the top of the still hot cake. Let cake cool completely then frost with the whipped topping and top with the flaked coconut. Keep cake refrigerated.", 
	        ""
	      ], 
	      "url": "http://allrecipes.com/Recipe/coconut-poke-cake/detail.aspx"
	    }, 
	    "Gooey Butter Cake III": {
	      "ingredients": [
	        "1 (18.25 ounce) package yellow cake mix", 
	        "1/2 cup butter, melted", 
	        "2 eggs", 
	        "1 teaspoon vanilla extract", 
	        "1 (8 ounce) package cream cheese", 
	        "2 eggs", 
	        "1 teaspoon vanilla extract", 
	        "4 cups confectioners' sugar"
	      ], 
	      "instructions": [
	        "Preheat oven to 350 degrees F (175 degrees C).", 
	        "Mix cake mix, melted butter or margarine, 1 teaspoon vanilla, and 2 eggs with a spoon.  Pat into a 9 X 13 inch pan.", 
	        "Mix cream cheese, 2 eggs, and 1 teaspoon vanilla with an electric mixer.  Slowly beat in confectioner's sugar.  Pour over cake layer.", 
	        "Bake for 40 to 45 minutes. Cool.", 
	        ""
	      ], 
	      "url": "http://allrecipes.com/Recipe/gooey-butter-cake-iii/detail.aspx"
	    }, 
	    "Heavenly White Cake": {
	      "ingredients": [
	        "2 3/4 cups sifted cake flour", 
	        "4 teaspoons baking powder", 
	        "3/4 teaspoon salt", 
	        "4 egg whites", 
	        "1 1/2 cups white sugar", 
	        "3/4 cup butter", 
	        "1 cup milk", 
	        "1 teaspoon vanilla extract", 
	        "1 teaspoon almond extract"
	      ], 
	      "instructions": [
	        "Measure sifted cake flour, baking powder, and salt; sift together three times.", 
	        "In a mixing bowl, beat egg whites until foamy.  Add 1/2 cup sugar gradually, and continue beating only until meringue will hold up in soft peaks.", 
	        "Beat butter until smooth. Gradually add remaining 1 cup sugar, and cream together until light and fluffy. Add sifted ingredients alternately with milk a small amount at a time, beating after each addition until smooth. Mix in flavorings.  Add meringue, and mix thoroughly into batter.  Spread batter in a 15 x 10 x 1 inch pan which has been lined on the bottom with parchment paper.", 
	        "Bake at 350 degrees F (175 degrees C) for 30 to 35 minutes. Cool cake in pan 10 minutes, then remove from pan and transfer to a wire rack to finish cooling. This cake may also be baked in two 9 inch round pans for 30 to 35 minutes, or in three 8 inch round pans for 25 to 30 minutes.", 
	        ""
	      ], 
	      "url": "http://allrecipes.com/recipe/heavenly-white-cake/"
	    }, 
	    "Potato Cake": {
	      "ingredients": [
	        "2 cups mashed potatoes", 
	        "1 egg, beaten", 
	        "1/2 cup all-purpose flour", 
	        "salt to taste", 
	        "1 pinch garlic salt", 
	        "1 tablespoon butter", 
	        "1 cup shredded Cheddar cheese"
	      ], 
	      "instructions": [
	        "In a medium size mixing bowl combine mashed potatoes, egg, flour, salt (if needed) and garlic salt. Mix well.", 
	        "Melt butter in a large frying pan over a low heat. Drop pancake-size (4 inch circles) lumps of mashed potatoes into the frying pan. Pat to flatten to 1/2 to 1 inch thickness. Sprinkle some cheddar cheese onto the mashed potato cake. Spoon more potato mixture over the cheese. Flip the potato cake over when the bottom is browned (about 10 minutes). Brown the other side (about 10 minutes).", 
	        ""
	      ], 
	      "url": "http://allrecipes.com/Recipe/potato-cake-2/detail.aspx"
	    }, 
	    "Simple White Cake": {
	      "ingredients": [
	        "1 cup white sugar", 
	        "1/2 cup butter", 
	        "2 eggs", 
	        "2 teaspoons vanilla extract", 
	        "1 1/2 cups all-purpose flour", 
	        "1 3/4 teaspoons baking powder", 
	        "1/2 cup milk"
	      ], 
	      "instructions": [
	        "Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.", 
	        "In a medium bowl, cream together the sugar and butter. Beat in the eggs, one at a time, then stir in the vanilla. Combine flour and baking powder, add to the creamed mixture and mix well. Finally stir in the milk until batter is smooth. Pour or spoon batter into the prepared pan.", 
	        "Bake for 30 to 40 minutes in the preheated oven. For cupcakes, bake 20 to 25 minutes. Cake is done when it springs back to the touch.", 
	        ""
	      ], 
	      "url": "http://allrecipes.com/recipe/simple-white-cake/"
	    }
	  }]
	
	# urls = search_yummly.search(search_params)
	# logging.warning(str(len(urls)))
	# all_recipes = get_recipe.get_recipe(urls)
	# want to return array of json objects
	return make_response(dumps(all_recipes))


if __name__ == '__main__':
	app.run(debug=True)