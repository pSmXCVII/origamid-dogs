import React from 'react';
import Head from '../Helpers/Head';
import useFetch from '../../Hooks/useFetch';
import { STATS_GET } from '../../api';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  const token = localStorage.getItem('token');

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET(token);
      await request(url, options);
    }
    getData();

  }, [request, token])

  if(loading) return <Loading />
  if(error) return <Error error={error}/>
  if(data && data.length > 0) {
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas" description="" />
        <UserStatsGraphs data={data}/>
      </React.Suspense>
    )
  }
  else return <div><p>Sem Postagens, sem Estatísticas 😢</p></div>;
}

export default UserStats
