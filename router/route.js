const express = require('express')
const multer = require('multer');
const fs = require('fs');
const Task = require('../models/inventorySchema')
const router = express.Router()


const upload = multer({
    dest: 'image',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        console.log(file)
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
})

// app.post('/image', upload.single('upload'), async (req, res) => {
//     try {
//         //  await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req.file.originalname}`)
//          res.status(201).send('Image uploaded succesfully')
//     } catch (error) {
//         console.log(error)
//         res.status(400).send(error)
//     }
// })

router.post('/image', upload.single('upload'), async (req, res) => {
    
    try{
          console.log(req.file.originalname)
           
          res.status(201).send('Image uploaded succesfully')
    }
    catch(e){
        console.log(error)
        res.status(400).send(error)
    }
})




router.get('/',(req,res)=>{
    res.send('HEllo from user')
})

router.post('/data', async (req, res)=>{

    // const task = new Task({
    //     inventory_name : 'fridge',
    //     inventory_category : 'electronic',
    //     expiry_time : 27-12-2050,
    //     quantity : 5,
    //     manufacturing_time : 02-02-2015})


    // try 
    //   { 
    //     await  task.save()
    //      res.status(201).send(task)
    // } catch (e) 
    //    {
    //       res.status(400).send(e)
    //   }

   const task =  await Task.insertMany(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

// router.get('/data', async (req,res)=>{
//     try{
//         console.log('1')
//           const tasks = await Task.find({})
//           console.log(tasks)
//           res.send(tasks)

//     }catch(e){
//         res.status(500).send()
//     }
// })


router.get('/data', async (req,res)=>{
    try{
        // console.log('1')
          const tasks = await Task.find( {$or:[{"inventory_category":"wood"},{"inventory_name": "TV"}]} )
        //   console.log(tasks)
          res.send(tasks)

    }catch(e){
        res.status(500).send()
    }
})

router.get('/data/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send('Not Found')
        }
          res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


router.delete('/data/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/data/:id', async (req, res) => {
    
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, { "inventory_category":"Sandel_wood"},req.body)
            if (!task) {
                return res.status(404).send()
            }
               res.send(task)
        } catch (e) {
            res.status(400).send(e)
        }
    })
    

module.exports = router;