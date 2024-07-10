var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var loginSchema=new Schema({
    username:{type:String}
});

module.exports=mongoose.model('whoLogged',loginSchema,'whoLogged');