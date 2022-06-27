var express = require('express')
var app = express()

const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000 

const MONGOURI ="mongodb+srv://thayan:12345@cluster0.1jxsw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


mongoose.connect(MONGOURI,{ useNewUrlParser: true, useUnifiedTopology: true })


mongoose.connection.on('connected',()=>{
    console.log("connected")
})


mongoose.connection.on('error',()=>{
    console.log("error")
})

require("./models/user")
require("./models/post")
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/posts"))

if(process.env.NODE_ENV=="production"){
	app.use(express.static('client/build'))
	const path=require('path')
	app.get("*",(req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})
}

app.listen(PORT,()=>{
    console.log("Server is running on", PORT)
})