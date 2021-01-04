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
        return res.json({ message: 'Não existe uma conta vinculada a este email' });

      const acc = accounts[0];
      await bcrypt.compare(password, accounts[0].password).then((result) => {
        if(result)
          return res.json({ acc });
        return res.json({ message: 'Senha incorreta' });
      })
    }
    return res.json({ message: 'Preencha todos os campos!' });

  }
  
}

export default LoginController;