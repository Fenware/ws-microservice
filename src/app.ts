import express, { Application } from "express";
import morgan from "morgan";
/* import AuthRoutes from "./routes/auth"; */

const app : Application = express();


/*--------------- Settings ---------------*/
app.set('port', process.env.PORT || 3000);


/*--------------- Middlewares ---------------*/
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/*--------------- Routes ---------------*/
/* app.use('/api/auth', AuthRoutes); */

export default app;
