import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      validate: {
        validator: (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email),
        message: "Invalid email address format",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profile: {
      educationLevel: { type: String, required: true },
      currentField: { type: String, required: true },
      interestField: { type: String, required: true },
      pastExperience: { type: String },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      country: { type: String, required: true },
      streetAddress: { type: String },
    },
    // AIzaSyC-cH-p9Id1vFIoaXVpRZe7b-M7Cum4Ols
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods = {
  comparePassword: async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  },
};

export const User = mongoose.model("User", userSchema);
