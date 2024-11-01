"use client";
import { useParams } from "next/navigation";

const NotePage = ({ params }: { params: { noteId: string } }) => {
  const { noteId } = useParams();

  return <div>{noteId}</div>;
};

export default NotePage;
