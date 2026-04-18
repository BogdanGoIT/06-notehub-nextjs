'use client';

import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function NoteDetailsClient() {
  const { id } = useParams();
  console.log(id);
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id as string),
  });

  console.log('noteDetailsClient', note);

  return (
    <div className={css.container}>
      {isLoading && <p>Loading, please wait...</p>}
      {error && <p>Something went wrong.</p>}
      {note && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      )}
    </div>
  );
}
