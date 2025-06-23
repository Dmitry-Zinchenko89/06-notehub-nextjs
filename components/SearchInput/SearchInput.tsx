'use client';


import { useEffect, useState } from 'react';
import css from './SearchInput.module.css';
import { useQueryClient } from '@tanstack/react-query';

export default function SearchInput() {
    const [query, setQuery] = useState('');

    const queryClient = useQueryClient();


    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}