import { NoteActions, UploadActions } from "@/actions";

interface Props {
  files: File[];
}

export async function uploadFiles({ files }: Props) {
  for (const file of files) {
    const form = new FormData();
    form.append("file", file);

    const data = await UploadActions.uploadImage(form);
    const { secure_url } = data;

    const newNote = {
      content: "<img src=" + secure_url + " />",
    };

    await NoteActions.createNote(newNote);
  }
}
