import Article from '../models/article.model.js'
import User from '../models/user.model.js'

export const getArticles = async (req, res, next) => {
  try {
    const { page = 1, limit = 3, title } = req.query
    const query = title ? { title: { $regex: title, $options: 'i' } } : {}

    const articles = await Article.find(query)
      .populate({
        path: 'owner',
        select: '-_id fullName email age',
      })
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit)
      .lean()

    res.json(articles)
  } catch (err) {
    next(err)
  }
}

export const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params

    const article = await Article.findById(id).populate({
      path: 'owner',
      select: '-_id fullName email age',
    })

    if (!article) {
      return res.status(404).json('Article not found')
    }

    return res.json(article)
  } catch (err) {
    next(err)
  }
}

export const createArticle = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.owner)
    if (!user) {
      return res.status(400).send('User not found')
    }

    const newArticle = await Article.create(req.body)
    await newArticle.save()

    user.numberOfArticles += 1
    await user.save()

    res.status(201).json(newArticle)
  } catch (err) {
    next(err)
  }
}

export const updateArticleById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, subtitle, description, category, userId } = req.body

    const article = await Article.findById(id)
    if (!article) {
      return res.status(404).json('Article not found')
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json('User not found')
    }

    if (userId !== article.owner.toString()) {
      return res.status(403).json('User does not have permission')
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        category,
      },
      { returnDocument: 'after' }
    )

    return res.json(updatedArticle)
  } catch (err) {
    next(err)
  }
}

export const deleteArticleById = async (req, res, next) => {
  try {
    const { id } = req.params
    const article = await Article.findById(id)

    if (!article) {
      return res.status(404).json('Article not found')
    }

    const user = await User.findById(article.owner)
    user.numberOfArticles--
    await user.save()

    await Article.deleteOne({ _id: id })

    return res.status(204)
  } catch (err) {
    next(err)
  }
}
