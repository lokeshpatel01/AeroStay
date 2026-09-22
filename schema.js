const Joi = require("joi");
const joi = require("joi");
const review = require("./models/review");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        country: joi.string().required(),
        location: joi.string().required(),
        image: joi.object({
            url: joi.string().allow("", null),
            filename: joi.string().allow("", null),
        }).allow(null),
        price: joi.number().min(0).required(),
        category: Joi.string().required()
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
    }).required(),
});