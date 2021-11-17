const express = require('express');
const router = express.Router();
const usuario = require('../models/usuario');
const passport = require("passport"); // Para autenticar el usuario en el momento en que está tratando de ingresar
const { isAuthenticated } = require("../helpers/auth"); //Para comprobar la autenticación de los usuarios

router.post(
    "/loguear",
    //Autenticar el usuario: si es autenticado: redirigir a la pagina home: si no: redirigir a la pagina de login para que se autentique.
    passport.authenticate("local", {
      successRedirect: "/usuarios/home",
      failureRedirect: "/usuarios/",
      failureFlash: true,
    })
  );

router.get('/home',(req,res)=>{
    res.json({mensaje:"you are in home"});
})

router.get('/',async(req,res)=>{
    const usuarios = await usuario.find();
    console.log(usuarios);
    res.json(usuarios);
})

router.post('/',async (req,res)=>{
    const nuevo = new usuario(req.body);
    await nuevo.save();
    res.json({status:"agregado"})
})

router.put('/:placa',async(req,res)=>{
    await usuario.findOneAndUpdate({placa:req.params.placa},req.body);
    res.json({status:"actualizado"});
})

router.delete("/:placa",async(req,res)=>{
    await usuario.findOneAndDelete({placa:req.params.placa});
    res.json({status:"eliminado"});
})

module.exports = router;