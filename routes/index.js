var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post'); //importing the required schema models from app.js
var Comment = mongoose.model('Comment'); //in app.js we had imported them using require('./models/post.js')

//====THE POSTS MECHANISM 

//Get all posts
router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts){
        if(err){ return next(err); }

        res.json(posts);
    });
});

//middleware for handling the :post parameter
router.param('post', function(req,res,next,id){  //whenever we hit the route with /posts/:post, it will run this function first.
    //whenever it has the paramenter of :post it will hit this function.
    var query = Post.findById(id);
    query.exec(function (err, post){
        if (err) {return next(err);}
        if(!post) { return next (new Error('/can\'t find post'));}

        req.post = post;
        //console.log(req.post.title);
        return next();
    });
});
router.get('/posts/:post', function(req,res){
    res.json(req.post);
});

//post upvote 
router.put('/posts/:post/upvote', function(req, res, next) {
    req.post.upvote(function(err, post){ //in models/Posts.js we defined a "schema.method.upvote" 'upvote' named schema method 
        if (err) { return next(err); }

        res.json(post);
    });
});

//add a new post
router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);
    post.save(function(err, post){ //first part (post.save) is query, second part error handling.
        if(err){ return next(err); }

        res.json(post);
    });
});

//=== THE COMMENTS ROUTES

router.param('comment', function(req, res, next, id){
    var query = Comment.findById(id);
    
    query.exec(function(err, comment){
        if(err){return next(err);}
        if(!comment) {return next(new Error('Can\'t find comment'))};
          
        req.comment = comment;
        return next();
    });
});
/*router.get('posts/:post/comments/:comment', function(req, res){
    res.json(req.comment);
})*/

router.get('/posts/:post/comments', function(req, res, next) {
    console.log('hey');
    Comment.find(function(err, posts){
        if(err){ return next(err); }

        res.json(posts);
    });
});

// add a new comment
router.post('/posts/:post/comments',function(req,res,next){
    var comment = new Comment(req.body); //creating the comment as object.
    comment.post = req.post;
    //console.log("comment post:" + JSON.stringify(req.body));
    comment.save(function(err, comment){
        if(err){return next(err);}

        req.post.comments.push(comment);
        req.post.save(function(err, push){
            if(err){return next(err); }
            res.json(comment);
        });
    });

});

router.put('/posts/:post/comments', function(req, res, next) {
    req.post.upvote(function(err, post){
        if (err) { return next(err); }

        res.json(post);
    });
});

module.exports = router;