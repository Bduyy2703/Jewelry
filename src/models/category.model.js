const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    category_parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    category_slug: {
      type: String,
      slug: "category_name",
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "Categories",
  }
);

module.exports = model("Category", categorySchema);
