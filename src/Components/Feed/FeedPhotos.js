import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import styles from './FeedPhotos.module.css'

const FeedPhotos = () => {
  const { data, loading, error, request } = useFetch();


  React.useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 })
      const { response, json } = await request(url, options);
    }
    fetchPhotos();
  }, [request])

  if(error) return <Error error={error}/>
  if(loading) return <Loading />
  if(data) 
  return (
    <ul className={`${styles.feed} animeLeft`}>
      {data.map((photo) => {
        return <FeedPhotosItem key={photo.id} photo={photo} />
      })}
    </ul>
  )
  else return null;
}

export default FeedPhotos