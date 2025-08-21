import style from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <button onClick={onClick} className={style.button}>
      Load more
    </button>
  );
}
