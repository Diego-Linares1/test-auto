import * as express from 'express';
import * as dotenv from 'dotenv';
import authRoutes from './auth/infrastructure/drivers/routes'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Express + TypeScript');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
