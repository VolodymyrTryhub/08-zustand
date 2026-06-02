'use client';

import css from './NoteForm.module.css';

import { useRouter } from 'next/navigation';

import { useNoteStore } from '@/lib/store/noteStore';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';

const NoteForm = () => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      clearDraft();

      router.back();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          value={draft.title}
          onChange={e =>
            setDraft({
              title: e.target.value,
            })
          }
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          rows={6}
          value={draft.content}
          onChange={e =>
            setDraft({
              content: e.target.value,
            })
          }
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="category">Category</label>

        <select
          id="category"
          value={draft.categoryId}
          onChange={e =>
            setDraft({
              categoryId: e.target.value,
            })
          }
          className={css.select}
        >
          <option value="aa41e785-2f2f-4792-91ab-fda1d2d2733a">Todo</option>

          <option value="19f4af1b-176f-44bd-9e7b-c0bf4b475547">Work</option>

          <option value="88c24267-74c7-4c7f-9be4-22eb4aa31de1">Personal</option>

          <option value="05691a2f-79b7-4e42-8259-c81cd11edd90">Meeting</option>

          <option value="8ac604a2-d263-42f3-845f-ed2e0d4051ee">Shopping</option>

          <option value="2b42d16e-cd17-4632-b25f-5c2659f7a68d">Health</option>

          <option value="a4990727-2bd7-4c83-a091-f16989a9f898">Important</option>

          <option value="d1b3dfda-04b9-4d5e-befb-88d2d569d534">Finance</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={() => router.back()} className={css.cancelButton}>
          Cancel
        </button>

        <button type="submit" disabled={mutation.isPending} className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
