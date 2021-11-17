const express = require('express');
const router = express.Router();
const vehiculo = require('../models/vehiculo');

router.get('/',async(req,res)=>{
    const vehiculos = await vehiculo.find();
    console.log(vehiculos);
    res.json(vehiculos);
})

router.post('/',async (req,res)=>{
    const nuevo = new vehiculo(req.body);
    await nuevo.save();
    res.json({status:"agregado"})
})

router.put('/:placa',async(req,res)=>{
    await vehiculo.findOneAndUpdate({placa:req.params.placa},req.body);
    res.json({status:"actualizado"});
})

router.delete("/:placa",async(req,res)=>{
    await vehiculo.findOneAndDelete({placa:req.params.placa});
    res.json({status:"eliminado"});
})

module.exports = router;