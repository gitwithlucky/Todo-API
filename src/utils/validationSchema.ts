import * as Joi from "joi";

const validationSchemas = {
  createUserSchema: Joi.object().keys({
    first_name: Joi.string()
      .required()
      .label("First Name")
      .max(50)
      .regex(/^[A-Za-z_@'-]+$/)
      .messages({
        "string.pattern.base":
          "Firstname should not contain spaces, special characters or numbers except an underscore or hyphen",
      }),
    last_name: Joi.string()
      .required()
      .label("Last Name")
      .max(50)
      .regex(/^[A-Za-z_@'-]+$/)
      .messages({
        "string.pattern.base":
          "Lastname should not contain spaces, special characters or numbers except an underscore or hyphen",
      }),
    username: Joi.string()
      .required()
      .label("Username")
      .max(50)
      .regex(/^[A-Za-z_@'-]+$/)
      .messages({
        "string.pattern.base":
          "Username should not contain spaces, special characters or numbers except an underscore or hyphen",
      }),
    email: Joi.string().required().email().label("Email").trim().messages({
      "string.email": "Invalid email",
      "any.required": "Email is required",
    }),
    is_admin: Joi.boolean().label("Is Admin").default(false),
    password: Joi.string()
      .regex(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      .min(8)
      .max(16)
      .label("Password")
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase, one lowercase, one numerical and one special character",
      }),
  }),

  createTodoSchema: Joi.object().keys({
    task: Joi.string().required().label("Task").max(50),
    completed: Joi.boolean().label("Is completed").default(false),
    due_date: Joi.date()
      .required()
      .label("Due date")
      .min("now")
      .allow(null, "")
      .messages({
        "date.min": "Invalid date. Kindly enter a date in the future.",
      }),
  }),

  fetchTodoSchema: Joi.object().keys({
    id: Joi.string().required().label("ID"),
    task: Joi.string().label("Task").max(50),
    completed: Joi.boolean().label("Is completed"),
    due_date: Joi.date()
      .label("Due date")
      .min("now")
      .allow(null, "")
      .messages({
        "date.min": "Invalid date. Kindly enter a date in the future.",
      }),
  }),

  siginSchema: Joi.object().keys({
    email: Joi.string().required().email().label("Email").trim().messages({
      "string.email": "Invalid email",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().min(8),
    token: Joi.string(),
  }),
};

export { validationSchemas };
