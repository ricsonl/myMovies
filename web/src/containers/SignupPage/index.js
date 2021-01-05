import React, { Component } from 'react';

import Logo from '../../components/Logo';
import Form from '../../components/Form';
import FormSection from '../../components/Form/FormSection';
import Input from '../../components/Input';
import Button from '../../components/Button';

import UserContext from '../../context/UserContext'
import api from '../../services/api';

import styles from './styles.module.css';

class SignupPage extends Component {

  static contextType = UserContext;

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    mainProfileName: '',
    birthday: '',
    error: '',
  }

  handleSignup = async (e) => {
    e.preventDefault();
    
    if(this.state.password !== this.state.confirmPassword){
      this.setState({ error: 'As senhas não coincidem' });
      return;
    }

    const response = await api.post('/accounts', { 
      email: this.state.email,
      password: this.state.password,
      mainProfileName: this.state.mainProfileName,
      birthday: this.state.birthday,
    });

    if (response.data.id) {
        const { id } = response.data;
        this.context.setLoggedAcc(id);

        this.props.history.push(`/accountHome`);
        return;
    }

    this.setState({ error: response.data.message });
  }

  render() {
    return (
      <div className={styles.signupContainer}>
        <Form title={<Logo />} onSubmit={this.handleSignup}>

            <FormSection title="Informações da conta">
                <Input type="text"
                      placeholder="Email" 
                      value={this.state.email}
                      onChange={e => this.setState({email: e.target.value})}
                />

                <Input type="password"
                      placeholder="Senha" 
                      value={this.state.password}
                      onChange={e => this.setState({password: e.target.value})}
                />
                
                <Input type="password"
                      placeholder="Confirmação da senha" 
                      value={this.state.confirmPassword}
                      onChange={e => this.setState({confirmPassword: e.target.value})}
                />
            </FormSection>

            <FormSection title="Perfil principal">
              <Input type="text"
                    placeholder="Nome" 
                    value={this.state.mainProfileName}
                    onChange={e => this.setState({mainProfileName: e.target.value})}
              />
              <Input type="date"
                    placeholder="Data de nascimento" 
                    value={this.state.birthday}
                    onChange={e => this.setState({birthday: e.target.value})}
              />
              <p>Data de Nascimento</p>
            </FormSection>
          
            <div className={styles.error}>{this.state.error}</div>
            <Button title="Cadastrar" type="submit" /> 

        </Form>
      </div>
    );
  }
}

export default SignupPage;