const express=require('express')
const mongoose=require('mongoose')
const articleRouter=require('./routes/article')
const app=express()

const collection=require('./routes/mongoDB')

app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

app.use('/article', articleRouter)

app.use(express.json())

let loggedInUserID=""

app.get('/login',(req,res) =>{
    res.render('login')
})

app.get('/signup',(req,res) =>{
    res.render('signup')
})

app.post('/signup',async (req,res) => {

    console.log("in signUp post")
    const data={
        Username:req.body.username,
        EmailID:req.body.email,
        password:req.body.password
    }

  const result=await collection.insertMany([data])

  //const result=await collection.insertOne(data)

  //res.render('./views/articles/index.ejs')

  console.log("result:",result)

  //res.send(`new user created ${result[0]._id} ${result[0].Username}`)

  loggedInUserID=result[0]._id

  res.send(`new user created ${result[0]._id}`)
})
console.log("loggedInUser:",loggedInUserID)

app.post('/login',async (req,res) =>{
    try{
        const check=await collection.findOne({EmailID:req.body.email})

        if(check.password===req.body.password)
        {
            res.send("logged in")
            //res.render('views/articles/index.ejs')
        }
        else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("wrong details")
    }
})

app.get('/',(req,res) => {
    const article=[{
        title:'test article',
        createdAt:new Date(),
        description:'test description'
    },{
        title:'test article 2',
        createdAt:new Date(),
        description:'test description 2'
    }]
    res.render('articles/index',{article:article})
})

app.listen(4000,() =>{
    console.log('port connected')
})