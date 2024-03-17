import {Router} from 'express';
const router = Router();
import jwt from'jsonwebtoken';
import{Request, Response, NextFunction} from 'express';

type Token = {
    id:string;
    createDate:string;
  }

//checks if the token has been generated by the server
const validateToken = (req:Request, res:Response, next:NextFunction) => { 
    const token = req.headers['authorization'];
    if(token){
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as Token;
        req.body.userId = decodedToken.id;
        req.body.createDate = decodedToken.createDate;
        const time = new Date().getTime() - new Date(req.body.createDate).getTime();
        const timeDays = time / 1000 / 60 / 60 / 24 ;
        if(timeDays > 7){
            return res.status(401).json({message: 'Token expired'});
        }
        const expiryDays = 7 - timeDays;
        res.header('expiryDays',Math.round(expiryDays).toString());
        next();
    } else {
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export default validateToken;