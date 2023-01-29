const express=require('express')
var multer  = require('multer');
const mongoose  = require("mongoose");
var upload = multer({ dest: 'uploads/' })
const fs=require("fs")
const path=require("path");
const app=express()


var reqq=[]
var reqe=[]
var ress=[]
var imres;
var iim;
var cors=require('cors')
app.use(cors())
app.use("/req",express.static("view"))


mongoose.connect("mongodb+srv://mindhacker1098:spn1098@cluster0.t66x9u5.mongodb.net/damn?retryWrites=true&w=majority",()=>{

console.log("connected ")

})

imagesh=new mongoose.Schema({
    img:{
        data:Buffer,
        contentType:String
    }
    
    })

    imgModel=new mongoose.model('img',imagesh)
app.get('/favicon.ico', function(req, res) { 
        res.statusCode=204
        res.end();
    });
app.get('/allreq',(req,res)=>{

res.send(reqe);
})
app.get('/imreq',(req,res)=>{
imres=res;

})
app.get('/img',(req,res)=>{

    // ires=res;
    res.send(iim);
    
    })
app.get('/user/:name',(req,res)=>{

reqe.push(req.params.name)
reqq.push(req)
ress.push(res)
if(imres!=undefined){
imres.send(reqe);}

})


app.get('/accept/:accep/:feed',(req,res)=>{

for(let i=0;i<reqq.length;i++){
// console.log(reqe[i],req.params.accep)
if(reqe[i]==req.params.accep){

if(req.params.feed=="shut"){
ress[i].send("shut")}
else{
    ress[i].send("get")
}
res.send("done")
ress.splice(i,1)
reqq.splice(i,1)
reqe.splice(i,1)
imres.send(reqe);

}


}


})


app.post('/upload', upload.single('file'), function (req, res, next) {







    var obj = {

        

        

        img: {

            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),

            contentType: 'image/png'

        }

    }

    imgModel.create(obj)

iim=obj.img.data

    
     res.send("done");
    //  ires.send(`${iim}`)

});

var port=process.env.PORT || 8000
app.listen(port,()=>{

    console.log("server started")
})
