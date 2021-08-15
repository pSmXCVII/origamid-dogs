import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, error, loading, request } = useFetch();
  
  async function handleSubmit(e) {
    e.preventDefault();
    if(login.validate()) {
      const location = window.location.href.replace('perdeu', 'resetar');
      const { url, options } = PASSWORD_LOST({login: login.value, url: location})
      await request(url, options)
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Solicitar nova senha" description="" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando e-mail...</Button>
          ) : (
            <Button>Enviar e-mail</Button>
          )}
        </form>
      )}
      <Error error={error} />
    </section>
  )
}

export default LoginPasswordLost
