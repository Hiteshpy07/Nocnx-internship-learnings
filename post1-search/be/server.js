import express from 'express'
import cors from 'cors'
const app=express()
const PORT=3000


app.use(cors()) // Enable CORS for all routes

app.get('/search',(req,res)=>{
    const {q}=req.query
    console.log(q)
    res.json({message:'Search request received-searching for:'+q})
}
)




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

