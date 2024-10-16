const { model, Schema } = require("mongoose");

const productDetailSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    material: { 
      type: String, 
      default: "" 
    },
    color: { 
      type: String, 
      default: "" 
    },
    length: { 
      type: String, 
      default: "" 
    },  // Example: '40cm + 5cm'
    care_instructions: { 
      type: String, 
      default: "" 
    },
    stone_size: { 
      type: String, 
      default: "" 
    },  // Example: '1.5x8 mm'
    stone_type: { 
      type: String, 
      default: "" 
    },  // Example: 'CZ'
    design_style: { 
      type: String, 
      default: "" 
    },  // Example: 'Trendy'
  },
  {
    timestamps: true,
    collection: "ProductDetails"
  }
);

module.exports = model("ProductDetail", productDetailSchema);
