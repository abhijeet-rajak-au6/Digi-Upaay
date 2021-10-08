const FoodModel = require("../Models/Food");
const Response = require("../utils/responseHandler");
const AppError = require("../utils/appErrorHandler");
const mongoose = require("mongoose");



module.exports = {

    async createFood(req, res, next) {
        try {

            const { mealType, foods } = req.body;
            const food = await FoodModel.create({
                mealType,
                foods
            })

            req.locals = new Response("success", 201, (food.toObject()));
            return next();

        } catch (err) {

            next(new AppError(err.message, 500, err));

        }
    },

    async updateFood(req, res, next) {
        try {

            const { updateValue } = req.params;
            const { target } = req.body;

            const result = await FoodModel.updateMany({ "foods.food": target }, { $set: { "foods.$[].food.$[b]": updateValue } }, { arrayFilters: [{ "b": target }  ] });

            // console.log(result);
            if (result.modifiedCount > 0)
                 req.locals = new Response("success", 201, "");
            else
                req.locals = new Response("Already Modified", 200, "");
            return next();

        } catch (err) {
            console.log(err);
            next(new AppError(err.message, 500, err));
        }
    },

    async deleteFood(req, res, next) {
        try {

            const { foodId } = req.params;

            const result = await FoodModel.updateOne({ "foods._id": mongoose.Types.ObjectId(foodId) }, { $pull: { "foods": { _id: mongoose.Types.ObjectId(foodId) } } });

            if (result.modifiedCount > 0)
                req.locals = new Response("success", 201, "");
            else
                req.locals = new Response("Not Found", 404, "");

            return next();
        } catch (err) {
            next(new AppError(err.message, 500, err));
        }
    },

    async getAllFood(req, res, next) {
        try {

            const result = await FoodModel.find();

            req.locals = new Response("success", 200, result);

            return next();
        } catch (err) {
            next(new AppError(err.message, 500, err));
        }
    },

    async getFoodByMealType(req, res, next) {
        try {
            const { mealType } = req.params;
            // const upperCaseMealType = mealType.toUpperCase
            const result = await FoodModel.find({ mealType: mealType.toUpperCase() });

            req.locals = new Response("success", 200, result);

            return next();

        } catch (err) {
            next(new AppError(err.message, 500, err));
        }
    }

}