const express = require('express')
const router = express.Router()
const Kb = require('../models/kb')

//getting all
router.get('/', async  (req,res) => {
  try {
    const attributes = await Kb.find()
    res.json(attributes)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// Getting One
router.get('/:id', getGA, (req, res) => {
  res.json(res.grad_attr)
})

// Creating attribute
router.post('/', async (req, res) => {
  const attribute = new Kb({
    id: req.body.id,
    number: req.body.number,
    title: req.body.title,
    description: req.body.description
  })
  try {
    const newAttribute = await attribute.save()
    res.status(201).json(newAttribute)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

  //Updating One
  router.patch('/:id', getGA, async (req,res) => {

    if(req.body.ga_id != null) {
      res.grad_attr.ga_id = req.body.id
    }

    if(req.body.title !=null) {
      res.grad_attr.title = req.body.title
    }

    if(req.body.number != null) {
      res.grad_attr.number = req.body.number
    }

    if(req.body.description != null) {
      res.grad_attr.description = req.body.description
    }

  })

  // Deleting one 
  router.delete('/:id', getGA, async (req,res) => {
    try {
      await res.grad_attr.remove()
      res.json({message: 'Deleted attriute'})
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  })


//middleware
async function getGA (req, res, rext) {
  let grad_attr
  try {
    grad_attr = await Kb.findById(req,params,id)
    if (grad_attr == null) {
      return res.status(400).json({message: 'Cannot find attribute'})
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }

  res.grad_attr = grad_attr
  next()

}

module.exports = router