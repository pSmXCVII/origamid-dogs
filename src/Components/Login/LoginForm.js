import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { UserContext } from '../../UserContext';
import Error from '../Helpers/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import Head from '../Helpers/Head';

const LoginForm = () => {

  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();

    if (username.validate() && password.validate()){
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" description="" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <Input label="Usuário" name="username" type="text" { ...username }/>
        <Input label="Senha" name="password" type="password" {...password }/>
        {loading ?  
          <Button disabled>Entrando...</Button>
        :
          <Button>Entrar</Button>
        }
        <Error error={error && 'Dados incorretos!'}/>
      </form>
      <Link className={styles.perdeu} to="/perdeu">Recuperar senha</Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Não possui uma conta? Cadastre-se aqui!</p>
        <Link className={stylesBtn.button} to="/criar">Cadastrar</Link>
      </div>
    </section>
  )
}

export default LoginForm
