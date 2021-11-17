const express = require('express');
const router = express.Router();
const usuario = require('../models/usuario');
const passport = require("passport"); // Para autenticar el usuario en el momento en que está tratando de ingresar
const { isAuthenticated } = require("../helpers/auth"); //Para comprobar la autenticación de los usuarios

router.post(
    "/login",
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

router.get("/logout", (req, res) => {

    //Metodo global que cierra la sesión del usuario.
    req.logout();
  
    //Redirige a la pantalla de loggeo del app
    res.json({status:"logout"})
   
  });

router.get('/:identificacion',async(req,res)=>{
    await usuario.findOne({identificacion:req.params.identificacion},(err,result)=>{
        res.json(result)
    });
    
})

router.put('/:identificacion',async(req,res)=>{
    await usuario.findOneAndUpdate({identificacion:req.params.identificacion},req.body);
    res.json({status:"actualizado"});
})

router.delete("/:identificacion",async(req,res)=>{
    await usuario.findOneAndDelete({identificacion:req.params.identificacion});
    res.json({status:"eliminado"});
})

module.exports = router;