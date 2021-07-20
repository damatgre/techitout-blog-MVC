const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models')

router.get('/', (req, res) => {
    //can accept object as second argument which includes all data passed to template
    Post.findAll({
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          // pass a single post object into the homepage template
          res.render('homepage', dbPostData[0]);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

module.exports = router;