import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function NoteDetailsPage({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['note', id], () => fetchNoteById(id));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient id={id} />
        </HydrationBoundary>
    );
}