var URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

$(document).ready(function () {
    $("#findDishes").click(function () {
        $('#errorMessage').text("");
        var input = document.getElementById("dishInput").value;
        input = input.replace(" ", "%20");
        var input_URL = URL + input;
        var dishes;

        // Collecting ingredients of dish name from API
        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", input_URL, false);
        xhReq.send(null);
        var dishes = JSON.parse(xhReq.responseText);
        dishes = dishes["meals"];
        if (dishes) { // Make sure that we don't have a null value when showing the results
            var ingredients = {}
            for (var i = 0; i < dishes.length; i++) {
                for (var key of Object.keys(dishes[i])) {
                    var key_string = key;
                    if (key_string != null) {
                        if (key_string.includes("strIngredient")) {
                            if (dishes[i][key] != null && dishes[i][key].length > 1) {
                                if (dishes[i][key] in ingredients) {
                                    ingredients[dishes[i][key]] += 1;
                                } else {
                                    ingredients[dishes[i][key]] = 1;
                                }
                            }
                        }
                    }   
                }
            }
        
            // Sorting the ingredients by frequency

            var sorted_ingredients = [];
            for (var ingredient in ingredients) {
                sorted_ingredients.push([ingredient, ingredients[ingredient]]);
            }

            sorted_ingredients.sort(function(a, b) {
                return b[1] - a[1];
            });

            // Tags to ensure that the document writes however many top ingredients actually exist
            var ingredient_tags = ['#firstIngredient', '#secondIngredient', '#thirdIngredient'];
            var count_tags = ['#firstCount','#secondCount','#thirdCount'];

            var data_array = [] // Array for the top 3 ingredients over all dishes used to visualize the results
            for (var i = 0; i < 3; i++) {
                data_array.push({"ingredient": sorted_ingredients[i][0], "count": sorted_ingredients[i][1]});
            }

            for (var i = 0; i < data_array.length; i++) {
                $(ingredient_tags[i]).text(sorted_ingredients[i][0]);
                $(count_tags[i]).text(sorted_ingredients[i][1]);
            }

            var vlSpec = {
                $schema: "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
                width: 450,
                height: 450,
                background: "white",
                autosize: {
                    "type": "fit",
                    "contains": "padding"
                  },
                data: {values: data_array
                  },
                  mark: 'bar',
                  encoding: {
                    y: {field: "count", type: 'quantitative', title: "Occurence of each dish"},
                    x: {field: "ingredient", type: 'nominal', title: "Top 3 ingredients used"},
                    color: {
                        field: "ingredient",
                        type: "nominal",
                    }
                  }
            }
            vegaEmbed("#vis", vlSpec);
            
        } else {
            // Display error message if dish does not exist in database
            $('#errorMessage').text("Dish does not exist in database. Please enter another dish.");
            $('#firstIngredient').text("____");
            $('#secondIngredient').text("____");
            $('#thirdIngredient').text("____");

            $('#firstCount').text("__");
            $('#secondCount').text("__");
            $('#thirdCount').text("__");
        }

        
    });
});


