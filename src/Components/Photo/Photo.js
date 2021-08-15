import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';
import Loading from '../Helpers/Loading';
import PhotoContent from '../Photo/PhotoContent';

const Photo = () => {
  const { id } = useParams();

  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);

  }, [id, request]);

  if(error) return <Error erro={error} />
  if(loading) return <Loading />
  if(data) {
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} description="" />
        <PhotoContent data={data} single={true} />
      </section>
    )
  }
  else return null;
}

export default Photo
