
import ReactLoading from 'react-loading';
import styles from './Loading.module.scss';

export const Loading = ({ isLoading }) => {
  return (<>
    {isLoading &&
      <div className={styles.loading}>
        <ReactLoading type={'spin'} color={'black'} height={50} width={50} />
      </div>}
  </>)
}
