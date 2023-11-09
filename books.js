const express=require('express');
const router=express.Router();
const cors=require("cors");
router.use(cors());

const dbKnex=require('./data/db_config');
const req = require('express/lib/request');
const res = require('express/lib/response');

router.get('/', async(req, res)=>{
    try{
        const books= await dbKnex("books").orderBy("id", "desc");
        res.status(200).json(books);
    }catch(error){
        res.status(400).json({msg:error.message});
    }
});

router.post('/', async (req, res)=>{
    const {Titulo, Autor, Ano, Preco, Foto}=req.body;

    if(!Titulo || !Autor || !Ano || !Preco || !Foto){
        res.status(400).json({msg:"Enviar título, auto, ano, preço e foto do livro!"});
        return;
    }

    try{
        const noveau = await dbKnex("books").insert({Titulo, Autor, Ano, Preco, Foto});
        res.status(201).json({id:noveau[0]});
    }catch(error){
        res.status(400).json({msg: error.message});
    }
});

router.put("/:id", async(req, res)=>{
    const id=req.params.id;
    const { preco }=req.body;

    try{
        await dbKnex("books").update({preco}).where("id", id);
        res.status(200).json();
    }catch(error){
        res.status(400).json({msg: error.message});
    }
});

router.delete("/:id", async (req, res)=>{
    const { id }=req.params;
    try{
        await dbKnex("books").del().where({id});
        res.status(200).json();
    }catch(error){
        res.status(400).json({msg:error.message});
    }
});

router.get("/filtro/:word", async (req, res)=>{
    const word=req.params.word;
    try{
        const books = await dbKnex("books")
        .where("Titulo", "like", `%${word}%`)
        .orWhere("Autor", "like", `%${word}%`);
        res.status(200).json(books);
    }catch(err){
        res.status(400).json({msg: err.message});
    }
});

router.get("/data/resume", async (req, res)=>{
    try{
        const query=await dbKnex("books")
        .count({num:"*"})
        .sum({soma: "preco"})
        .max({maior: "preco"})
        .avg({media:"preco"});
        const{num, soma, maior, media}=query[0];
        res.status(200).json({num, soma, maior, media: Number(media.toFixed(2)) });
    }catch(err){
        res.status(400).json({msg: err.message});
    }
});

router.get("/data/graphic", async(req, res)=>{
    try{
        const totalByYear = await dbKnex("books").select("Ano")
        .sum({total: "preco"}).groupBy("Ano");
        res.status(200).json(totalByYear);
    }catch(err){
        res.status(400).json({msg: err.message});
    }
});

module.exports=router;