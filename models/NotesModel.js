const mongoose=require('mongoose');
const NotesModel=mongoose.model('notes',new mongoose.Schema({
	title:{type:String},
	text:{type:String},
},{timestamps: true}
));
module.exports=NotesModel;