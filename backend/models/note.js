import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true, // ensure controller always sets it
    },
    content: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "General",
    },
    color: {
      type: String,
      default: "zinc",
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
    reminderDate: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ❌ REMOVE this — handled in controller for better uniqueness
// noteSchema.pre("save", function (next) {
//   if (!this.slug || this.isModified("title")) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }
//   next();
// });

export default mongoose.model("Note", noteSchema);
