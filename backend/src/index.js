import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import itemRoutes from './routes/items.routes.js'
import utilityRoutes from './routes/utility.routes.js'
//import verifyToken from './middleware/verifyToken.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5008;

app.use(cors({
    origin: 'http://localhost:5173', // frontend origin
    credentials: true
}));

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/api/items', itemRoutes);

app.use('/api/utils', utilityRoutes);

app.get('/', (req, res) => {
    res.send("Hello from server");
});

//app.get('/protected', verifyToken, (req, res) => {
//    res.json({
//        message: `Welcome, ${req.user.email}`,
//        userId: req.user.userId,
//    });
//});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});