import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ data, openModal }) {
  return (
    <ul className={css.list}>
      {data &&
        data.length > 0 &&
        data.map(el => (
          <li
            onClick={() => openModal(el.urls)}
            className={css.item}
            key={el.id}
          >
            <ImageCard urls={el.urls} description={el.alt_description} />
          </li>
        ))}
    </ul>
  );
}
