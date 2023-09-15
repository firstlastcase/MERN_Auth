import express from 'express'
import path from 'path'
import dotenv from 'dotenv';
dotenv.config()
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5005;
import userRoutes from './routes/userRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import campaignRoutes from './routes/campaignRoutes.js'
import accountRoutes from './routes/accountRoutes.js'


connectDB();
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/campaign', campaignRoutes)
app.use('/api/contact', contactRoutes)

if(process.env.NODE_ENV ==='production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname,'frontend/dist')))
    app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname,'frontend/dist', 'index.html')))
}else{
    app.get('/', (req, res)=> res.send('server is up - you are running in Dev environment')); 
}




app.use(notFound);
app.use(errorHandler)


app.listen (port, ()=> console.log(`server started on port ${port}`));
