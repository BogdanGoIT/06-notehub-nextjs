import { fetchNoteById } from '@/lib/api';

import css from './NoteDetails.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotesDetails(props: Props) {
  const { id } = await props.params;
  console.log(id);
  const note = await fetchNoteById(id);
  console.log(note);

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
