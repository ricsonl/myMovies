import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db/connection';

class LoginController {

  async create(req :Request, res :Response){// requisição de efetuar login

    const { email, password } = req.body;

    if(email && password){

      const accounts = await db('accounts')
        .where('email', email)
        .select('');
      
      if(accounts.length == 0)
        return res.status(401).json({ message: 'Não existe uma conta vinculada a este email' });

      const acc = accounts[0];
      await bcrypt.compare(password, accounts[0].password).then((result) => {
        if(result)
          return res.status(200).json({ 
            id: acc.id,
            email,
          });
        return res.status(401).json({ message: 'Senha incorreta' });
      })
    }
    return res.status(400).json({ message: 'Preencha todos os campos!' });

  }
  
}

export default LoginController;