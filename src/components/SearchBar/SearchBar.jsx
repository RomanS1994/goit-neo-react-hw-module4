import style from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  return (
    <header className={style.header}>
      <form onSubmit={onSubmit}>
        <input
          name="query"
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
