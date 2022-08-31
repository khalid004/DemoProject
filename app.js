import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';



const app = express();
const PORT = 8080 || PORT;
app.use(express.json());

app.use('/users', usersRoutes);



app.listen(
    PORT,
    () => console.log(`Server Listening on ${PORT}`)
);

app.get('/', (req,res) => res.send('Hello from homepage')
);