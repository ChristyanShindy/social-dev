import connect from 'next-connect'
import mongooseMiddleware from './mongoose'

export default function createHandle() {
  return connect().use(mongooseMiddleware)
}