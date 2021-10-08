const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

require("./db");

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3000


app.use("/api", require("./Routes/foodRoutes"));

app.post("/", async (req, res) => {

    const FoodModel = require("./Models/Food");

    try {
        const food = await FoodModel.create({
            mealType: "BREAKFAST",
            foods: [
                {
                    food: ["icecream", "idli", "roti"]
                }
            ]
        });

        return res.send(food);
    } catch (error) {
        return res.status(500).send(error.message);
    }

});

app.use((err, req, res, next) => {

    // console.log("errors", err.errStack.errors.mealType);
    if (err.errStack && err.errStack.errors && err.errStack.errors.mealType)
        res.status(403).send({ status: "error", message: "meal type can be either breakfast || lunch || dinner" })
    else
        res.status(500).send({ status: "error", message: "OOps something went wrong" });
});

app.listen(PORT, () => {
    console.log("application running at port", PORT);
})