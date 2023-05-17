import { Router } from 'express'
import userRouter from './user.router.js'
import articleRouter from './article.router.js'

const router = Router()

router.use('/users', userRouter)
router.use('/articles', articleRouter)

export default router
