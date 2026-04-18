import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';

// /notes виконується Notes на сервері
// виконується queryClient.prefetchQuery
// і відбувається http запит fetchNotes
// результат запиту зберігається в середині queryClient
// За допомогою HydrationBoundary ми передаємо queryClient вкладеним компонентам
// в браузері виконується NotesClient
// Коли викликається перший раз useQuery то не відбувається http запиту, тому що для ['notes', ''] дані вже в queryClient просто бере їх і повертає як data

export default async function Notes() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes(1, ''),
  });

  console.log(
    'queryClient.prefetchQuery відбувся на next сервері і дані для [notes, ""] вже є в queryClient'
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
