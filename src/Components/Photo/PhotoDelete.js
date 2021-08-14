import React from 'react'
import { PHOTO_DELETE } from '../../api';
import styles from './PhotoDelete.module.css';
import useFetch from '../../Hooks/useFetch';

const PhotoDelete = ({id}) => {
  const { request, loading } = useFetch();

  const token = localStorage.getItem('token');

  async function handleDelete() {
    const confirm = window.confirm('Tem certeza que deseja deletar essa foto?');
    if(confirm) {
      const { url, options } = PHOTO_DELETE(id, token);
      const { response } = await request(url, options);
      console.log(response)
      if(response.ok) window.location.reload();
    }
  }


  return (
    <>
      {loading ? (
        <button
          className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button
          onClick={handleDelete}
          className={styles.delete}>
          Deletar
        </button>
      )}
      
    </>
  )
}

export default PhotoDelete
