import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_RESET } from '../../api';
import Error from '../Helpers/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../Helpers/Head';

const LoginPasswordReset = () => {
  const [ login, setLogin ] = React.useState('')
  const [ key, setKey ] = React.useState('');
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if(key) setKey(key);
    if(login) setLogin(login);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if(password.validate()){
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if(response.ok) navigate('/login');
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Redefinir senha" description="" />
      <h1 className="title">Redefinir senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nova senta" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  )
}

export default LoginPasswordReset
