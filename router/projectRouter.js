const express = require('express')
const db = require('../data/helpers/projectModel')
const router = express.Router()

//CREATE
router.post('/', (req, res) => {
    const {name, description, completed} = req.body;

    if(!name || !description){
        res.status(400).json({ error: 'Missing project name or description'})
    }

    db.insert(req.body)
    .then( proj => {
        res.status(201).json(proj)
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'Could not add project'})
    })

})

//READ
router.get('/', (req,res) => {
    db.get()
    .then( proj => {
        res.status(200).json(proj)
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'Could not retrieve projects'})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.get(id)
    .then(proj => {
        if(proj){
            res.status(200).json(proj)
        } else {
            res.status(404).json({ error: 'ID does not exist'})
        }
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'Could not retrieve project by ID'})
    })
    
})

router.get('/projectActions/:id', (req, res) => {
    db.getProjectActions(req.params.id)
    .then(proj => {
        if(proj){
            res.status(200).json(proj)
        } else {
            res.status(404).json({ error: 'ID not found'})
        }
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'Could not retrieve project Actions'})
    })
})

//EDIT

router.put('/:id', (req, res)=> {
    const {name, description} = req.body;

    if(!name || !description){
        res.status(400).json({ error: 'Required Name and Description'})
    } 

    db.update(req.params.id, req.body)
    .then( proj => {
        if(proj){
            res.status(200).json(proj)
        } else {
            res.status(404).json({ error: 'cannot find that post'})
        }
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'Sorry couldn\'t edit that'})
    })
})


//DELETE

router.delete('/:id', (req,res) => {
    const id = req.params.id
    
    db.remove(id)
    .then( proj => {
        if(proj){
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'ID was not found'})
        }
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'Could not delete project from Database' })
    })
})


module.exports = router;  