import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routerApi from './routes/index.js';
import cors from 'cors';
dotenv.config();



mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log('Connect to MongoDB!');
}) 
.catch((err)=>{
    console.log('Error connecting' + err);
});

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:5173' }));
// Middlewares
app.use(express.json());
app.use(cookieParser());
routerApi(app);

// Rutas de prueba


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Intenl Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})