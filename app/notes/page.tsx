'use client';

import css from './NotesPage.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';

export default function Notes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(() => {
    const savedState = localStorage.getItem('modal-state');
    if (savedState !== null) {
      return JSON.parse(savedState);
    }
    return false;
  });

  // state init > jsx > effect
  useEffect(() => {
    localStorage.setItem('modal-state', JSON.stringify(isOpenModal));
  }, [isOpenModal]);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1); // Скидаємо сторінку тут, це безпечно і не викликає каскадних рендерів
  }, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', currentPage, search],
    queryFn: () => fetchNotes(currentPage, search),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const totalPages = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox text={search} onSearch={handleSearch} />
        {/* Пагінація */}
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setCurrentPage} page={currentPage} />
        )}
        {isLoading && <p>Loading data..</p>}
        {isError && <p>Error!!!!!!!!!</p>}
        {/* Кнопка створення нотатки */}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <NoteForm onEnd={closeModal} />
        </Modal>
      )}
    </div>
  );
}
