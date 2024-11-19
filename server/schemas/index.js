import Joi from 'joi';

const userSchema = Joi.object({
  user_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().required(),
  due_date: Joi.date(),
  status: Joi.string(),
  user_id: Joi.string(),
  task_id: Joi.string(),
});

export { userSchema, taskSchema };
