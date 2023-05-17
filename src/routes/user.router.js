import { Router } from 'express'
import {
  createUser,
  getUsers,
  updateUserById,
  deleteUserById,
  getUserByIdWithArticles,
} from '../controllers/user.controller.js'

const userRouter = Router()

userRouter
  .get('/', getUsers)
  .get('/:id', getUserByIdWithArticles)
  .post('/', createUser)
  .put('/:id', updateUserById)
  .delete('/:id', deleteUserById)

export default userRouter
