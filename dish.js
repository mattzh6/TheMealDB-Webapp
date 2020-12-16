var URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

$(document).ready(function () {
    $("#findDishes").click(function () {
        $('#errorMessage').text("");
        var input = document.getElementById("dishInput").value;
        var input_URL = URL + input;
        var dishes;

        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", input_URL, false);
        xhReq.send(null);
        var dishes = JSON.parse(xhReq.responseText);
        dishes = dishes["meals"];
        if (dishes) {
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
        

            var sorted_ingredients = [];
            for (var ingredient in ingredients) {
                sorted_ingredients.push([ingredient, ingredients[ingredient]]);
            }

            sorted_ingredients.sort(function(a, b) {
                return b[1] - a[1];
            });

            for (var i = 0; i < 3; i++) {
                console.log(sorted_ingredients[i]);
            }

            $('#firstIngredient').text(sorted_ingredients[0][0]);
            $('#secondIngredient').text(sorted_ingredients[1][0]);
            $('#thirdIngredient').text(sorted_ingredients[2][0]);

            $('#firstCount').text(sorted_ingredients[0][1]);
            $('#secondCount').text(sorted_ingredients[1][1]);
            $('#thirdCount').text(sorted_ingredients[2][1]);
        } else {
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


