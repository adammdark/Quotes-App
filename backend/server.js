import express, { text } from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from "mongoose";

const app = express()

app.use(cors({
    origin:['http://localhost:5173','https://quotes-app-zeta-beryl.vercel.app']
}))

app.use(express.json());

//.env
dotenv.config();
const PORT = process.env.PORT;

//db connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected successfully');
})
.catch((err)=>{
    console.error(`MongoDB connection error${err.message}`);
}); 

//schema
const quoteSchema = new mongoose.Schema({
   text:{
        type:String,
        required:true,
        trim:true,
        minlength:5
   }
},{timestamps:true})

const Quote = mongoose.model('Quote',quoteSchema);


//server's API
app.get('/',(req,res)=>{
    res.send('Hello world!');
});

//GET method
app.get('/api/quotes',async(req,res)=>{
    try{

        const quotes = await Quote.find().sort({createdAt:-1});
        res.status(200).json(quotes);
    }
    catch(err){
        res.status(500).json({err:'failed to fetch'})
    }
});


//GET quote details
app.get('/api/quotes/:id',async(req,res)=>{

    try{

        const {id} = req.params;
        const getQuote = await Quote.findById(id);

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err:'Invalid quote ID'})
        }

        if(!getQuote){
            return res.status(404).json({err:'Quote not found'});
        }

        res.status(200).json(getQuote);

    }
    catch(err){
        res.status(500).json({err:err.message});
    }
})

//POST method
app.post('/api/quotes',async(req,res)=>{

    const {text} = req.body;

    try{
        const newQuote = await Quote.create({text:text.trim()});
        
        if(!text || !text.trim()){
            throw new Error('No text found')
        }

        res.status(200).json(newQuote);
        
    }
    catch(err){
        res.status(500).json({err:'failed to create'})
    }
});


//PUT method
app.put('/api/quotes/:id',async(req,res)=>{

    const {id} = req.params;
    const {text} = req.body;

   try{

     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid qoute ID'});
    }

    if(!text || !text.trim()){
        throw new Error('No text found')
    }

    const UpdatedQuote = await Quote.findByIdAndUpdate(
        id,
        {text:text.trim()},
        { returnDocument: 'after' },
    );

    if(!UpdatedQuote){
        return res.status(404).json({error:'Quote not found'});
    }

    res.status(200).json(UpdatedQuote);
   }
   catch(err){
    console.log(err);
    res.status(500).json(err.message)
   }
});

//DELETE method
app.delete('/api/quotes/:id',async(req,res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid qoute ID'});
    }

    const deletedQuote = await Quote.findByIdAndDelete(id);

    if(!deletedQuote){
        return res.status(404).json({error:'Quote not found'});
    }

    res.status(204).end();
});


//port listsening
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
