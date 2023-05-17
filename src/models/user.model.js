import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 50,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 60,
      required: true,
      trim: true,
    },
    fullName: String,
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: props => `${props.value} is not a valid email address!`,
      },
      lowercase: true,
    },
    role: {
      type: String,
      enum: ['admin', 'writer', 'guest'],
    },
    age: {
      type: Number,
      max: 99,
    },
    numberOfArticles: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`

  if (this.age < 0) {
    this.age = 1
  }

  next()
})

const User = mongoose.model('User', userSchema)

export default User
