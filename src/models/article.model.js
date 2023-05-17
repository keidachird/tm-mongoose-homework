import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 5,
      maxLength: 400,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      minLength: 5,
    },
    description: {
      type: String,
      minLength: 5,
      maxLength: 5000,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['sport', 'games', 'history'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Article = mongoose.model('Article', articleSchema)

export default Article
