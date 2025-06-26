import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://socialdev:edqPbJbTQMABuU1p@cluster-db-social-dev.dwm77pe.mongodb.net/socialdev?retryWrites=true&w=majority&appName=cluster-db-social-dev'

const databaseMiddleware = async (req, res, next) => {
  try {
    if (!global.mongoose){
      global.mongoose = await mongoose.connect(MONGODB_URI)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('database error')
  }
  return next()
}

export default databaseMiddleware