import mongoose, { Schema, model,Model, connect } from "mongoose";

interface todoModel {
  _id?: String;
  task: String;
  initiator: Schema.Types.ObjectId;
  due_date: Date;
  completed: Boolean;
}

const todo = {
  task: {
    type: String,
    index: true,
    required: true,
    trim: true,
  },
  initiator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  due_date: {
    type: Date,
    required: true,
    min: new Date(),
},
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
};

const todoSchema = new Schema(todo, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

const todoRepository: Model<todoModel> = model<todoModel>('todo', todoSchema);

export { todoRepository };
