import { createFileRoute } from "@tanstack/react-router";
import CommentBoxComponent from "../components/comment-box";

export const Route = createFileRoute("/comment-box")({
  component: () => <CommentBoxComponent />,
});

