const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(express.static( __dirname + '/cakes/dist/cakes' ));
mongoose.connect('mongodb://localhost/rate_my_cakes', { useNewUrlParser: true });

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

const CakeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    baker: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    comments: [CommentSchema]
}, { timestamps: true });

const Cake = mongoose.model('Cake', CakeSchema);

// GET: Retrieve all Cakes
app.get('/cakes', function(req, res){
    Cake.find({}, function(err, cakes){
        if(err){
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
           res.json({message: 'All Cakes:', data: cakes})
        }
     });
});

// GET: Retrieve a Cake by ID
app.get('/cakes/:id', function(req, res){
    Cake.findOne({ _id: req.params.id }, function(err, cake){
        if (err) {
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            res.json({message: 'Cake:', data: cake})
        }
    });
});

// POST: Create a Cake
app.post('/cakes', function(req, res){
    var newCake = new Cake();
    newCake.title = req.body.title;
    newCake.baker = req.body.baker;
    newCake.imageURL = req.body.imageURL;
    newCake.save(function(err, cake){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            res.json({message: 'New Cake:', data: cake})
        }
    });
});

// GET: Retrieve all Comments
app.get('/comments', function(req, res){
    Comment.find({}, function(err, comments){
        if(err){
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
           res.json({message: 'All Comments:', data: comments})
        }
     });
});

// POST: Create a Comment
app.post('/comments', function(req, res){
    console.log('----------', req.body)
    var newComment = new Comment();
    newComment.content = req.body.content;
    newComment.rating = req.body.rating;
    newComment.save(function(err, comment){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            Cake.findOne({_id: req.body.cakeId}, function(err, cake){
                cake.comments.push(comment);
                cake.save(function(err){
                    if (err) {
                        console.log('*********************');
                        console.log('Returned Error: ', err);
                        res.json({message: 'Error', error: err})
                    }
                    else {
                        res.json({message: 'New Comment:', data: comment._id})
                    }
                })
            })
        }
    });
});

// DELETE: Delete a Comment by ID
app.delete('/comments/:id/', function(req, res){
    Comment.remove({ _id: req.params.id }, function(err){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            Comment.find({}, function(err, comments){
                if(err){
                    console.log('*********************');
                    console.log('Returned Error: ', err);
                    res.json({message: 'Error', error: err})
                }
                else {
                   res.json({message: 'Deletion Successful:', data: comments})
                }
            });
        }
    });
});

app.listen(8000, function () {
    console.log('listening on port 8000');
});