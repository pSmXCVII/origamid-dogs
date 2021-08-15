import React from 'react'
import styles from './UserPhotoPost.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../api';
import Error from '../Helpers/Error';
import { useNavigate } from 'react-router';
import Head from '../Helpers/Head';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [ img, setImg ] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if(data) navigate('/');
  }, [ data, navigate ])

  function handlePhotoPost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);
    formData.append('img', img.raw);

    const token = localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options)
  }

  function handleImgChange({ target }) {
    if(target.files[0]){
      setImg({
        preview: URL.createObjectURL(target.files[0]),
        raw: target.files[0],
      })
    } else {
      setImg({
        preview: null,
        raw: null,
      })
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Enviar foto" description="Página de envio de fotos" />
      <form onSubmit={handlePhotoPost}>
        <Input
          label="Nome"
          type="text"
          name="nome"
          {...nome}
        />
        <Input
          label="Peso"
          type="number"
          name="peso"
          {...peso}
        />
        <Input
          label="Idade"
          type="number"
          name="idade"
          {...idade}
        />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error}/>
      </form>
      <div>
        {img.preview && <div className={styles.preview} style={{ backgroundImage: `url("${img.preview}")`}}></div>}
      </div>
    </section>
  )
}

export default UserPhotoPost
