import { getTopOfMindNotes } from "@/actions/notes.action";
import { TopOfMindContainer } from "./TopOfMindContainer";

export const TopOfMind = async () => {
  const notes = await getTopOfMindNotes();
  return <TopOfMindContainer notes={notes} />;
};
