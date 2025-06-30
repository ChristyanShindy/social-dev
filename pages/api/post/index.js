import { withIronSessionApiRoute } from 'iron-session/next'
import createHandle from '../../../lib/middlewares/nextConnect'
import validate from '../../../lib/middlewares/validation'
import { ironConfig } from "../../../lib/middlewares/ironSession"
import { createPostSchema, deletePostSchema } from '../../../modules/post/post.schema'
import { createPost, deletePost, getPost } from '../../../modules/post/post.service'

const handle = createHandle()

handle 
  .post(validate({ body: createPostSchema }), async ( req, res) => {
    try {
      if (!req.session.user) return res.status(401).send()

      const newPost = await createPost(req.body, req.session.user)
      res.status(201).send(newPost)
    } catch(err) {
      return res.status(500).send(err.message)
    }
  })
  .get(async (req, res) => {
    try {
      if (!req.session.user) return res.status(401).send()

      const posts = await getPost()
      res.status(200).send(posts)
    } catch(err) {
      return res.status(500).send(err.message)
    }
  })
.delete(validate(deletePostSchema), async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).send()
    const deletedPost = await deletePost(req.body.id, req.session.user)
    if (deletedPost)
      return res.status(200).send({ ok: true})
    
    return res.status(400).send('Post not found')
  } catch(err) {
    return res.status(500).send(err.message)
  }
})

  export default withIronSessionApiRoute(handle, ironConfig)