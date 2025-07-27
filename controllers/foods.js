// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Food = require('../models/food.js')

// router logic will go here - will be built later on in the lab
router
.get('/', (req, res) => {
  console.log(res.locals.user)
  res.render('foods/index.ejs',{user:res.locals.user});
})
.post('/', async (req, res) => {
  try{
    const user = req.session.user;
    if(user){
      const name = req.body.name;
      if(name){
        //add
        const newFood = await Food.create({name:name})
        await User.findByIdAndUpdate(user._id,{$push:{pantry:newFood._id}},{new:true})
        res.locals.user.pantry.push({name:name,_id:newFood._id})
        res.redirect(`/users/${user._id}/foods`)
      }else{
        res.sendStatus(422)//wrong format
      }
    }else{
      res.sendStatus(401)//unauthorized
    }
  }catch(e){
    console.log(e.message)
    res.redirect('/')
  }
});

router.get('/new', async (req, res) => {
    res.render('foods/new.ejs', {
        user: req.session.user,
    });
});

router
.get('/:itemId', async (req, res) => {
    res.render('foods/index.ejs', {
        user: req.session.user,
    });
})
.put('/:itemId', async (req, res) => {
    //update
const updatedItem = {}
    res.status(201).json(updatedItem)
})
.delete('/:itemId', async (req, res) => {
   try{
    const user = req.session.user;
    if(user){
      const itemId = req.params.itemId;
      if(itemId){
        await Food.deleteOne({_id:itemId})
        await User.findByIdAndUpdate(user._id,{$pull:{pantry:itemId}},{new:true})
        res.locals.user.pantry = res.locals.user.pantry.filter(item=>item._id !== itemId)
        res.redirect(`/users/${user._id}/foods`)
      }else{
        res.sendStatus(422)//wrong format
      }
    }else{
      res.sendStatus(401)//unauthorized
    }
  }catch(e){
    console.log(e.message)
    res.redirect('/')
  }
});

router.get('/:itemId/edit', async (req, res) => {
    res.render('foods/edit/index.ejs', {
        user: req.session.user,
    });
});

module.exports = router;
