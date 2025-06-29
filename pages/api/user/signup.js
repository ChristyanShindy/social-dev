import Joi from 'joi'
import { ironConfig } from "../../../lib/middlewares/ironSession"
import { withIronSessionApiRoute } from 'iron-session/next'
import createHandle from '../../../lib/middlewares/nextConnect'
import validate from '../../../lib/middlewares/validation'
import { signupUser } from "../../../modules/user/user.service"
import { signupSchema } from '../../../modules/user/user.schema'


const signup = createHandle()


signup.post(validate({ body: signupSchema }), async (req, res) => {
  try {
    const user = await signupUser(req.body)
    req.session.user = {
      id: user._id,
      user: user.user
    }
    await req.session.save()
    res.status(201).json({ ok: true })
  } catch (err) {
    if(err.code === 11000){
      return res.status(400).send({
        code: 11000,
        duplicateKey: Object.keys(err.keyPattern)[0]
      })
    }
    throw err
  }
})

export default withIronSessionApiRoute(signup, ironConfig)