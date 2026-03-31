const validateUser = (req, res, next) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      message: err.errors[0].message,
    });
  }
};

// | Tool              | Style               | Best For           |
// | ----------------- | ------------------- | ------------------ |
// | express-validator | middleware chaining | simple apps        |
// | Joi               | schema-based        | backend-heavy apps |
// | Zod               | schema + type-safe  | modern Node/TS     |
// | Yup               | simple schema       | frontend           |
// | Ajv               | JSON schema         | high performance   |

