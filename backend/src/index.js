import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import itemRoutes from './routes/items.routes.js'
//import verifyToken from './middleware/verifyToken.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5008;

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/api/items', itemRoutes);

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