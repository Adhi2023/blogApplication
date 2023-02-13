const express=require('express')
const Article=require('./models/blog')
const router=express.Router()

router.get('/new',(req,res) =>{
    res.render('articles/new', {article:new Article() })
})

router.get('/signup',(req,res) =>{
    res.render('articles/signup')
})

router.get('/login',(req,res) =>{
    res.render('articles/login')
})

router.get(':/id',(req,res)=>{})

router.post('/',async (req,res) =>{
    const article=new Article({
        title:req.body.title,
        description:req.body. description,
        markdown:req.body.markdown
    })
  try{
   await article.save()
   res.redirect(`/article/${articles.id}`)
  }
  catch(e){
    console.log(e)
    res.render('article/new',{article:article})
  }

})

module.exports=router