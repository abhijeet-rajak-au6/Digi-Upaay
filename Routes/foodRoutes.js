const { Router } = require("express");
const { createFood, updateFood, deleteFood, getAllFood, getFoodByMealType } = require("../Collections/foodController");
const { Send } = require("../middleware/Send");

const router = Router();


router.post("/create", [createFood, Send]);
router.patch("/update/:updateValue", [updateFood, Send]);
router.delete("/delete/:foodId", [deleteFood, Send]);
router.get("/getAll", [getAllFood, Send]);
router.get("/:mealType",[getFoodByMealType, Send]);

module.exports = router;