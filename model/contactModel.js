const { default: mongoose } = require("mongoose")

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter contact name"],
    },
    email: {
      type: String,
      required: [true, "Please enter contact email"],
    },
    phone: {
      type: Number,
      required: [true, "Please enter contact number"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Contact", contactSchema)
