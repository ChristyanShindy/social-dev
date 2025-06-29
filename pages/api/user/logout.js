import { withIronSessionApiRoute } from 'iron-session/next'
import createHandle from '../../../lib/middlewares/nextConnect'
import { ironConfig } from '../../../lib/middlewares/ironSession'

const logout = createHandle()

logout.post( async (req, res) => {
  req.session.destroy()
  res.send({ ok: true })
} )

export default withIronSessionApiRoute(logout, ironConfig)