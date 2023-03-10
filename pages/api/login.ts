import { UserModel } from './../../models/User';
import { connectToDB } from './../../middlewares/dbconnection';
import { DefaultMsgResponse } from './../../types/DefaultMsgResponse';
import type {NextApiRequest, NextApiResponse} from 'next';
import CryptoJs from 'crypto-js';

type Login = {
    login: string,
    password : string
}

const handler = async (req : NextApiRequest, res : NextApiResponse<DefaultMsgResponse>) => {
    try {

        if(req.method !== 'POST'){
            return res.status(405).json({error: 'Método solicitado não existe!'});
        }

        const {MY_SUPER_SECRET_KEY} = process.env;
        if(!MY_SUPER_SECRET_KEY){
            console.log('ENV MY_SUPER_SECRET_KEY não preenchida');
            return res.status(500).json({error : 'ENV MY_SUPER_SECRET_KEY não preenchida'});
        }

        const {login, password} = req.body as Login;

        const user = await UserModel.findOne({email:login});
        if(!user){
            return res.status(400).json({error: 'Usuário e senha não encontrados'});
        }

        const bytes = CryptoJs.AES.decrypt(user.password, MY_SUPER_SECRET_KEY);
        const savedPassword = bytes.toString(CryptoJs.enc.Utf8);

        if(password !== savedPassword){
            return res.status(400).json({error: 'Usuário e senha não encontrados'});
        }

        return res.status(200).json({msg: 'Usuário Autenticado com sucesso'});      
    } catch (ex) {
        console.log('Ocorreu erro ao efetuar login:', ex);
        res.status(500).json({error: 'Ocorreu erro ao efetuar login, tente novamente!'});
    }
}

export default connectToDB(handler);