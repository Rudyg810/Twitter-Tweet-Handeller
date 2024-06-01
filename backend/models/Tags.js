const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema({
  tags: {
    type: [String],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ip:{
    type:String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Hashtag", hashtagSchema);
