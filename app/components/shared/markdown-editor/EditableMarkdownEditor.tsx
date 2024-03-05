import MarkdownEditor, { MarkdownEditorProps } from "./MarkdownEditor";
import styles from "./markdown-editor.module.css";

const EditableMarkdownEditor = (props: MarkdownEditorProps) => {
  return (
    <MarkdownEditor
      {...props}
      supportAddNote
      editable
      className={styles.editableMarkdownEditor}
    />
  );
};

export default EditableMarkdownEditor;
