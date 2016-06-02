var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    body: String,
    author: String,
    upvotes: {type: Number, default:0},
    post:{type: mongoose.Schema.Types.ObjectId, ref:'Post'} // IMPORTANT
});

commentSchema.methods.upvote = function(cb){
    this.upvotes += 1;
    this.save(cb);
};

mongoose.model('Comment', commentSchema); //registering the schema model. and Don't forget to import it to models.js using require