'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchInput from '@/components/SearchInput/SearchInput';

export default function NotesClient() {
    const { data: notes = [], isLoading, error } = useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error) return <p>Something went wrong. {error.message}</p>;

    return (
        <>
            <SearchInput />
            <NoteForm />
            <NoteList notes={notes} />
        </>
    );
}