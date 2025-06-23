'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

import css from './NoteForm.module.css';

export default function NoteForm() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const formik = useFormik({
        initialValues: { title: '', content: '', tag: '' },
        validationSchema: Yup.object({
            title: Yup.string().required(),
            content: Yup.string().required(),
            tag: Yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            mutation.mutate(values);
            resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={css.form}>
            <input
                name="title"
                type="text"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className={css.input}
            />
            <textarea
                name="content"
                placeholder="Content"
                value={formik.values.content}
                onChange={formik.handleChange}
                className={css.textarea}
            />
            <input
                name="tag"
                type="text"
                placeholder="Tag"
                value={formik.values.tag}
                onChange={formik.handleChange}
                className={css.input}
            />
            <button type="submit" className={css.button}>
                Add Note
            </button>
        </form>
    );
}