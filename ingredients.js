var URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

$(document).ready(function () {
    $("#findIngredients").click(function () {
        // Reset output values
        $('#errorMessage').text("");
        $('#input_message').text("______");
        $('#dish_list').empty();

        // Collect input data and making URLs
        var input = document.getElementById("ingredientInput").value;
        var ingredient_URLs = [];
        var input_split = input.split(" ");
        for (var i = 0; i < input_split.length; i++) {
            if (input_split[i] != "") { // Make sure that the current input token is not a space
                ingredient_URLs.push(URL + input_split[i]);
            }
        }

        // Get meals from API
        var total_meals = [];
        var meal_invalid = false;
        for (var i = 0; i < ingredient_URLs.length; i++) {
            // XML Code: https://stackoverflow.com/questions/3038901/how-to-get-the-response-of-xmlhttprequest
            var xhReq = new XMLHttpRequest();
            xhReq.open("GET", ingredient_URLs[i], false);
            xhReq.send(null);
            var website_data = JSON.parse(xhReq.responseText);
            var meals = website_data['meals'];
            if (meals == null) {
                meal_invalid = true;
                continue;
            }
            var meal_names = [];

            for (var j = 0; j < meals.length; j++) {
                meal_names.push(meals[j]['strMeal']);
            }
            total_meals.push(meal_names);
        }

        if (total_meals.length > 0 && !meal_invalid) {
            // Find common meals
            var result = total_meals.shift().filter(function(v) {
                return total_meals.every(function(a) {
                    return a.indexOf(v) !== -1;
                });
            });
            if (result.length > 0) {
                // Outputting information to HTML
                var output = "";
                for (var i = 0; i < input_split.length; i++) {
                    if (input_split[i] != "") { // Make sure we get non-empty strings
                        if (i == input_split.length - 1) {
                            output += input_split[i];
                            break
                        }
                        var temp = input_split[i] + " and "
                        output += temp;
                    }   
                }
                output += ":";
                $('#input_message').text(output);
                $(document).ready(function() {
                    for (var i = 0; i < result.length; i++) {
                        var output = '<li class="list-group-item">' + result[i] + '</li>';
                        $("#dish_list").append(output);
                    }
                });
            } else {
                // Display error message when no common dishes are found
                $('#errorMessage').text("No dishes use all ingredients inputted. Please enter new set of ingredients.");
                $('#dish_list').empty();
            }
        } else {
            // Display error message when an ingredient field is invalid
            $('#errorMessage').text("No dishes use all ingredients inputted. Please enter new set of ingredients.");
            $('#dish_list').empty();
        }
        
    });
});