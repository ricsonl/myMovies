import React, { Component } from 'react';

import Logo from '../../components/Logo';
import Form from '../../components/Form';
import FormSection from '../../components/Form/FormSection';
import Input from '../../components/Input';
import Button from '../../components/Button';

import UserContext from '../../context/UserContext';
import api from '../../services/api';

import styles from './styles.module.css';

class LoginPage extends Component {

  static contextType = UserContext;

  state = {
    name: '',
    error: ''
  }

  handleCreate = async (e) => {
    e.preventDefault();

    const loggedAcc = this.context.loggedAcc;
    
    const createProfileresponse = await api.post('/profiles', { name: this.state.name }, {
      headers: { logged_acc: loggedAcc }
    });

    if (createProfileresponse.data.id) {

        const { id, name } = createProfileresponse.data;
        this.context.setLoggedProf(id);
        this.context.setProfileName(name);
        this.context.setWatchlist([]);
    
        this.props.history.push(`/profileHome`);

    } else this.setState({ error: createProfileresponse.data.message });
  }

  render() {
    return (
      <div className={styles.createProfileContainer}>
        <Form title={<Logo/>} onSubmit={this.handleCreate}>

          <FormSection title="Criar perfil na conta">
            <Input type="text"
                  placeholder="Nome" 
                  value={this.state.name}
                  onChange={e => this.setState({name: e.target.value})}
            />
          </FormSection>
          <div className={styles.error}>{this.state.error}</div>
          <Button title="Criar" type="submit"/>
        
        </Form>
      </div>
    );
  }
}

export default LoginPage;