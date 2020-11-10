import mongoose from 'mongoose'

const Word = { title: String }

export default mongoose.model('Word', Word)
