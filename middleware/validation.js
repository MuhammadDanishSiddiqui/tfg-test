const Joi = require("joi");

const validateProductId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });

  const { error } = schema.validate({ id: parseInt(req.params.id) });

  if (error) {
    return res.status(400).json({
      error: "Invalid product ID",
      message: "Product ID must be a positive integer",
    });
  }

  next();
};

const validatePriceUpdate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
    title: Joi.string().optional(),
    current_price: Joi.object({
      value: Joi.number().positive().required(),
      currency_code: Joi.string()
        .valid("USD", "EUR", "GBP", "CAD")
        .default("USD"),
    }).required(),
  });

  const { error } = schema.validate({
    id: parseInt(req.params.id),
    ...req.body,
  });

  if (error) {
    return res.status(400).json({
      error: "Invalid request body",
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = {
  validateProductId,
  validatePriceUpdate,
};
