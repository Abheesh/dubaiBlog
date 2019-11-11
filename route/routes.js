var express = require('express')
var bcrypt = require('bcryptjs');
const passport = require('passport');
var router = express.Router();
const dubaiBlog = require('../model/dubaiNews');
const userModel = require('../model/userSchema');

router.get('/users', (req, res, next) => {
    userModel.find((err, blog) => {
        if (err) {
            res.json(err);
        } else {
            res.json(blog);

        }
    });
});
router.post('/register', (req, res, next) => {
    let user = new userModel({
        name: req.body.name,
        uname: req.body.uname,
        password: req.body.password
    });
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            console.log(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
            } else {
                user.password = hash;
                user.save((err, blog) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({ msg: 'user added successfully' });
                    }
                });
            }
        });
    });
    //   user.save((err, blog) => {
    //     if(err){
    //         res.json(err);
    //     } else {
    //         res.json({msg: 'user added successfully'});
    //     }
    //   });
});

router.post('/login', (req, res, next) => {
    // passport.authenticate('local', { successFlash: 'Welcome!' });
    let query = { uname: req.body.uname, };
    userModel.findOne(query, function (err, userdata) {
        if (err) throw err;
        if (!userdata) {
            res.json({ err: 'Invalid user' });
        }
        bcrypt.compare(req.body.password, userdata.password, function (err, ismatch) {
            if (err) throw err;
            if (ismatch) {
                res.json({ succcess: 'Logged in successfully', data: userdata });
            } else {
                res.json({ err: 'Invalid password' });

            }
        })
    });

});
router.get('/blog', (req, res, next) => {
    dubaiBlog.find((err, blog) => {
        if (err) {
            res.json(err);
        } else {
            res.json(blog);

        }
    });
    //  res.send('tested success');
});
router.post('/blog', (req, res, next) => {
    //  res.send('tested success');
    let postBlog = new dubaiBlog({
        blogName: req.body.blogName,
        blogDescription: req.body.blogDesc,
        author: req.body.author,
        uid: req.body.uid
    });
    postBlog.save((err, blog) => {
        if (err) {
            res.json(err);
        } else {
            res.json({ msg: 'Blog added successfully' });
        }
    });
});
router.put('/blog/:id', (req, res, next) => {
    dubaiBlog.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            blogName: req.body.blogName,
            blogDescription: req.body.blogDesc
        }
    }, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    // res.send('tested success');
});
router.delete('/blog/:id', (req, res, next) => {
    dubaiBlog.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});
module.exports = router;

