var URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

$(document).ready(function () {
    $("#findIngredients").click(function () {
        $('#errorMessage').text("");
        $('#input_message').text("______");
        // var found_meals = 
        // Collect input data and making URLs
        var input = document.getElementById("ingredientInput").value;
        var ingredient_URLs = [];
        var input_split = input.split(" ");
        for (var i = 0; i < input_split.length; i++) {
            ingredient_URLs.push(URL + input_split[i]);
        }

        // Get Meals from API
        var total_meals = [];
        for (var i = 0; i < ingredient_URLs.length; i++) {
            console.log("HERE");
            var xhReq = new XMLHttpRequest();
            xhReq.open("GET", ingredient_URLs[i], false);
            xhReq.send(null);
            var website_data = JSON.parse(xhReq.responseText);
            var meals = website_data['meals'];
            if (meals == null) {
                continue;
            }
            var meal_names = [];

            for (var j = 0; j < meals.length; j++) {
                meal_names.push(meals[j]['strMeal']);
            }
            total_meals.push(meal_names);
        }

        if (total_meals.length > 0) {
            // Find Common Meals
            var result = total_meals.shift().filter(function(v) {
                return total_meals.every(function(a) {
                    return a.indexOf(v) !== -1;
                });
            });


            // Outputting information to HTML
            var output = "";
            for (var i = 0; i < input_split.length; i++) {
                if (i == input_split.length - 1) {
                    output += input_split[i];
                    break
                }
                var temp = input_split[i] + " and "
                output += temp;
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
            $('#errorMessage').text("No dishes use all ingredients inputted. Please enter new set of ingredients.");
            $('#dish_list').empty();
        }
        
    });
});