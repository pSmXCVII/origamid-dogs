import React from 'react';
import { COMMENT_POST } from '../../api';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helpers/Error';

const PhotoCommentsForm = ({ id, setComments }) => {
  const [ comment, setComment ] = React.useState('');
  const { request, error } = useFetch()
  const token = localStorage.getItem('token');

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = COMMENT_POST(id, {comment}, token);
    const { response, json } = await request(url, options);
    if(response.ok){
      setComment('');
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        id="comment"
        name="comment"
        placeholder="Insira um comentário"
        value={comment}
        onChange={({target}) => setComment(target.value)}/>
      <button>
        <Enviar />
      </button>
      {error && <Error error={error} />}
    </form>
  )
}

export default PhotoCommentsForm
