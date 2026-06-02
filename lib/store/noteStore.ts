import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CreateNoteData } from '@/types/note';

const initialDraft: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: CreateNoteData;

  setDraft: (draft: Partial<CreateNoteData>) => void;

  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,

      setDraft: draft =>
        set(state => ({
          draft: {
            ...state.draft,
            ...draft,
          },
        })),

      clearDraft: () =>
        set({
          draft: initialDraft,
        }),
    }),

    {
      name: 'note-draft-storage',
    }
  )
);
