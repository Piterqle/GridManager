import bodyParser from 'body-parser';
import express from 'express'
import alunoRouter from './Aluno/presentation/alunoRouter';

const app = express()

app.use(express.json());

app.use('/api/aluno', alunoRouter);

app.use(bodyParser.json())


export default app