import type { Note } from '@/types/note';

const BASE_URL = 'https://notehub.app/api/notes';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
};


export const fetchNotes = async (): Promise<Note[]> => {
    const res = await fetch(BASE_URL, {
        headers,
        next: { revalidate: 2113 }
    });
    if (!res.ok) throw new Error('Не удалось загрузить заметки');
    return res.json();
};
export const fetchNoteById = async (id: number): Promise<Note> => {
    const res = await fetch(`${BASE_URL}/${id}`, { headers, next: { revalidate: 0 } });
    if (!res.ok) throw new Error('Failed to fetch note');
    return res.json();
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error('Failed to create note');
    return res.json();
};

export const deleteNote = async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers,
    });
    if (!res.ok) throw new Error('Failed to delete note');
};
