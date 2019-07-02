const NotesModel=require('../models/NotesModel');
const express=require('express');
var ObjectId = require('mongoose').Types.ObjectId;
mongoose.set('useFindAndModify', false);
const router=express.Router();
router.get('/',(req,res)=>{
	NotesModel.find((err,doc)=>{
		if(!err)	res.send(doc);
		else{
			console.log(err);
			res.send(err);
		}
	})
});
router.get('/:id',(req,res)=>{
	if(!ObjectId.isValid(req.params.id))	return res.status(400).send(`No record with given id : ${req.params.id}`);
	NotesModel.findById(req.params.id,(err,doc)=>{
		if(!err)	res.send(doc);
		else	console.log(err);
	})
});
router.post('/',(req,res)=>{
	var m=new NotesModel({
		title:req.body.title||"Untitled",
		text:req.body.text,
	});
	m.save((err,doc)=>{
		if(!err)	res.send(doc);
		else	console.log(err);
	})
});
router.put('/:id',(req,res)=>{
	if(!ObjectId.isValid(req.params.id))	return res.status(400).send(`No record with given id : ${req.params.id}`);
	var m={
		title:req.body.title+"*"||"Untitled*",
		text:req.body.text,
	};
	NotesModel.findByIdAndUpdate(req.params.id,{$set:m},{new:true},(err,doc)=>{
		if(!err)	res.send(doc);
		else	console.log(err);
	})
});
router.delete('/:id', (req, res)=>{
	if (!ObjectId.isValid(req.params.id))	return res.status(400).send(`No record with given id : ${req.params.id}`);
	NotesModel.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) { res.send(doc); }
		else { console.log(err); }
	});
});
module.exports=router;