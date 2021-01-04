import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import styles from './styles.module.css';

class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    error: '',
  }

  handleLogin = async (e) => {
    e.preventDefault();
    
    const response = await api.post('/login', { email: this.state.email, password: this.state.password });

    if (response.data.id) {

        const { id } = response.data;
        this.props.history.push(`/homeAccount/${id}`);

    } else this.setState({ error: response.data.message });
  }

  render() {
    return (
      <div className={styles.loginContainer}>
        <form onSubmit={this.handleLogin}>
            <h1 className={styles.logo}>MyMovies</h1>
            <input type="text"
                  placeholder="Email" 
                  value={this.state.email}
                  onChange={e => this.setState({email: e.target.value})}
            />
            <input type="password"
                  placeholder="Senha" 
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})}
            />

            <div className={styles.error}>{this.state.error}</div>

            <button type="submit">Login</button>

            <p>Não tem uma conta? <Link to="/signup" className={styles.signupLink}> Cadastrar </Link></p>
        
        </form>
      </div>
    );
  }
}

export default LoginPage;