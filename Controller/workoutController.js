const Workout = require('../modules/workoutModel')
const mongoose = require('mongoose')


const getallworkouts = async (req , res) =>{
    const workouts = await Workout.find({}).sort({createdAt:-1})


    res.status(200).json(workouts)
}

const getworkout = async (req , res) =>{
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
      }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:'no such workout'})
    }
    res.status(200).json(workout)
}

const createworkout = async(req , res)=>{
    const {title, reps, load} = req.body

    let emptyField =[]

    if(!title){
      emptyField.push('title')
    }
    if(!reps){
      emptyField.push('reps')
    }
    if(!load){
      emptyField.push('load')
    }
    if(emptyField.length>0){
      return res.status(400).json({error:'Please fill in all fields', emptyField})
    }
    
    try {
      const workout = await Workout.create({title, reps, load})
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

const deleteworkout = async (req,res)=>{
    const {id} = req.params
      
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
      }
    const workout = await Workout.findByIdAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error:'no such workout'})
    }
    res.status(200).json(workout)
  }

const updateworkout = async(req,res)=>{
  const {id} = req.params
      
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
      }
    const workout = await Workout.findByIdAndUpdate({_id: id},{
      ...req.body
    })
      
    if(!workout){
        return res.status(404).json({error:'no such workout'})
    }
    res.status(200).json(workout)
}




module.exports={
    getallworkouts,
    getworkout,
    createworkout,
    deleteworkout,
    updateworkout
}