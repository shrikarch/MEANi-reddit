var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: String,
    link: String,
    upvotes: {type: Number, default:0},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]//referrring to another schema IMPORTANT
});

postSchema.methods.upvote = function (cb){
    this.upvotes += 1;
    this.save(cb);
};

mongoose.model('Post', postSchema); //registering the schema model. and Don't forget to import it to app.js using require

// we can add a method to go with this schema. and upvote method.