import { UploadImageAction } from "@/app/actions/upload.action";
import { Note } from "@/app/interfaces";

interface Props {
  files: File[];
  addNote: (note: Note) => void;
}

export async function uploadFiles({ addNote, files }: Props) {
  for (const file of files) {
    const form = new FormData();
    form.append("file", file);

    const data = await UploadImageAction(form);
    const { secure_url, public_id, created_at } = data;

    const newNote = {
      content: "<img src=" + secure_url + " />",
      createdAt: created_at,
      id: Date.now() + public_id,
    };
    addNote(newNote);
  }
}
