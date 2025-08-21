import axios from 'axios';

import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

const KEY = 'QTamIBFshjDvDNS3yFKQF-2GZsR43YKr2Eyw7guUdPM';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState();

  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);

  function openModal(img) {
    setIsOpen(true);
    setImg(img);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const q = event.currentTarget.elements.query.value.trim();
    if (!q) return;
    setLoading(true);

    const firstPage = 1;
    setValue(q);
    setPage(firstPage);
    console.log(page);
    console.log(value);

    axios
      .get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: q,
          page: firstPage,
          per_page: 10,
          client_id: KEY,
        },
      })
      .then(({ data }) => {
        setPhotos(data.results);
        setHasSearched(true);
      })
      .catch(() => {
        setHasSearched(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleLoadMore = () => {
    setLoading(true);
    const next = page + 1;
    setPage(next);
    console.log(next);

    console.log(value);
    axios
      .get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: value,
          page: next,
          per_page: 10,
          client_id: KEY,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPhotos(prev => {
          const merged = [...prev, ...data.results];
          return merged.filter(
            (item, index, arr) =>
              arr.findIndex(el => el.id === item.id) === index
          );
        });
      })
      .catch(() => {
        setHasSearched(true);
      })
      .finally(() => {
        setLoading(false);
        console.log('ok');
      });
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery data={photos} openModal={openModal} />
      {hasSearched && photos.length === 0 && <ErrorMessage />}
      {photos.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {loading && (
        <ClipLoader
          color="green"
          loading={loading}
          cssOverride={override}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {modalIsOpen && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          url={img}
        />
      )}
    </>
  );
}

export default App;
