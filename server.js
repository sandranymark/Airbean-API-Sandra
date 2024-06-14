import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7070;


app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/campaigns', campaignRoutes);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

// TODO app.use(errorHandlerMiddleware);
