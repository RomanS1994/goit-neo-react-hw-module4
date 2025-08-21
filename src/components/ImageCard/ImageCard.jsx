import style from './ImageCard.module.css';
export default function ImageCard({ urls, description }) {
  return (
    <div>
      <img
        className={style.image}
        src={urls.small}
        alt={description}
        width={380}
        height={320}
      />
    </div>
  );
}
