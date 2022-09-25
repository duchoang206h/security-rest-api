import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import apiRouter from './api/api.router';
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(helmet());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret' as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use('/api', apiRouter);
app.listen(PORT, () => console.log(`Running at port: ${PORT}`));