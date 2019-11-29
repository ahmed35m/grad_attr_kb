const express = require('express')
const router = express.Router()
const Kb = require('../models/kb')

// Getting all
router.get('/', async (req,res) => {
   try {
    const kb = await Kb.find()
    res.json(kb)
   }catch (err) {
       res.status(500).json({message: err.message})

   }
    
})
//Getting one
router.get('/:id', getKb, (req,res) => {
    res.json(res.grad_attr)
})
//Creating One
router.post('/', async (req,res) => {
    const kb = new Kb ({
        number: req.body.number,
        title: req.body.title,
        description: req.body.description,
        sub_ga: [{
            number: req.body.number,
            title: req.body.title
        }]
    })

    try {
        const newKb = await kb.save()
        res.status (201).json(newKb)
    } catch (err) {
        res.status(400).json({message: err.message})

    }
})
// Updating One
router.patch('/:id', getKb, async(req,res) => {
    if(req.body.number != null){
        res.grad_attr.number = req.body.number
    }
    if(req.body.title != null) {
        res.grad_attr.title = req.body.title
    }
    if(req.body.description != null) {
        res.grad_attr.description = req.body.description
    }
    try {
        const updatedKb = await res.grad_attr.save()
        res.json({updatedKb})
    } catch (err) {
        res.status(500).json({message: err.message})

    }
    
})
// Deleting one
router.delete('/:id', getKb, async (req,res) => {
    try {
        await res.grad_attr.remove()
        res.json({message:'Deleted'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }

})

//deteling all
router.delete('/', async (req,res) => {
    try {
     const kb = await Kb.remove()
     res.json(kb)
    }catch (err) {
        res.status(500).json({message: err.message})
 
    }
     
 })

//middleware
async function getKb(req,res,next) {
    let grad_attr
    try {
        grad_attr = await Kb.findById(req.params.id)
        if(grad_attr == null) {
            return res.status(404).json({message: 'Cannot find'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.grad_attr = grad_attr
    next()
}

module.exports = router