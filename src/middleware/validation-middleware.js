const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateSync(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false }
    );
    return next();
  } catch (error) {
    const errorMessages = error.errors.map((errorMessage) => {
      return errorMessage.replace(/^body\./, "");
    });
    return res
      .status(400)
      .json({ type: "Validation Error", messages: errorMessages });
  }
};

export default validate;
