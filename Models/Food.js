const { Schema, model } = require("mongoose");

const FoodSchema = Schema({

    mealType: {
        type: String,
        validate: {
            validator: function (value) {
                const meal = ["BREAKFAST", "LUNCH", "DINNER"];
                if (meal.includes(value.toUpperCase())) return true;
                return false;
            },
            message: "meal type can be either breakfast || lunch || dinner",
        }
    },
    foods: [
        {
            food: [{
                type: String
            }]
        }
    ]

});

const FoodModel = model("food", FoodSchema);

module.exports = FoodModel;