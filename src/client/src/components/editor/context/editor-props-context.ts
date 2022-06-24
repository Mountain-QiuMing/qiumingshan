import { createContext, useContext } from 'react';
import { EditorProps } from '../editor';
export type { EditorProps };

export const EditorPropsContext = createContext<EditorProps>(null);

export const useEditorPropsContext = () => {
  return useContext(EditorPropsContext);
};
