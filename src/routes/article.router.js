import { Router } from 'express'
import {
  createArticle,
  updateArticleById,
  deleteArticleById,
  getArticles,
  getArticleById,
} from '../controllers/article.controller.js'

const articleRouter = Router()

articleRouter
  .get('/', getArticles)
  .get('/:id', getArticleById)
  .post('/', createArticle)
  .put('/:id', updateArticleById)
  .delete('/:id', deleteArticleById)

export default articleRouter
