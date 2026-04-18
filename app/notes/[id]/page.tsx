import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetailsClient';

export default async function NotesDetail() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', ''],
    queryFn: () => fetchNoteById(''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
