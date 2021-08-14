import React from 'react';
import styles from './Loading.module.css';
import { ReactComponent as LoadingSvg } from '../../Assets/carregando.svg';

const Loading = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <LoadingSvg />
      </div>
    </div>
  )
}

export default Loading
