import stylex from "@stylexjs/stylex";
import { useState } from "react";
import { Button } from "../../../Component-Lab/src/ui/button";

type Comment = {
  user: string;
  timestamp: string;
  comment: string;
  replies?: Comment[];
};

const DEFAULT_COMMENTS: Comment[] = [
  {
    user: "ritik",
    timestamp: "2021-03-04T15:00:00.000Z",
    comment: "Hello World",
  },
  {
    user: "robert",
    timestamp: "2021-03-04T15:40:00.000Z",
    comment: "Does this work?",
  },
];
export default function CommentsPage() {
  const loggedInUser = "ritik";
  const [comments, setComments] = useState(DEFAULT_COMMENTS);
  function handleAddComment(comment: string) {
    setComments([
      { user: loggedInUser, timestamp: new Date().toISOString(), comment },
      ...comments,
    ]);
  }

  function handleAddReply(comment: string, parentIndex: number) {
    const updatedComments = [...comments];
    updatedComments[parentIndex].replies = [
      { user: loggedInUser, timestamp: new Date().toISOString(), comment },
    ];
    setComments(updatedComments);
  }

  return (
    <div>
      <h1>Comments on Social Media page</h1>
      <CommentBox user={loggedInUser} onSave={handleAddComment} />
      {comments.map((c, parentIndex) => (
        <AddedComment
          comment={c}
          handleAddReply={(comment: string) =>
            handleAddReply(comment, parentIndex)
          }
          loggedInUser={loggedInUser}
        />
      ))}
    </div>
  );
}

function AddedComment({
  comment,
  loggedInUser,
  handleAddReply,
}: {
  comment: Comment;
  loggedInUser: string;
  handleAddReply: (value: string) => void;
}) {
  const [addReply, setAddReply] = useState(false);
  const [formattedDate, formattedTime] = [
    new Date(comment.timestamp).toLocaleDateString(),
    new Date(comment.timestamp).toLocaleTimeString(),
  ];
  return (
    <div
      style={{
        borderLeft: "2px solid white",
        paddingLeft: "1em",
        marginTop: "1em",
      }}
      key={comment.timestamp}
    >
      {comment.user} : "{comment.comment}" @ {formattedDate} {formattedTime}
      <div
        style={{ cursor: "pointer" }}
        tabIndex={0}
        onClick={() => setAddReply(true)}
      >
        Reply
      </div>
      <div>
        {!!comment.replies?.length && (
          <div>
            {comment.replies.map((reply) => (
              <AddedComment
                comment={reply}
                loggedInUser={loggedInUser}
                handleAddReply={() => {}}
              />
            ))}
          </div>
        )}
      </div>
      {/* {comment.replies && comment.replies?.map((reply) => {
        <AddedComment
          comment={reply}
          loggedInUser={loggedInUser}
          handleAddReply={() => {}}
        />;
      })} */}
      {addReply && (
        <CommentBox
          user={loggedInUser}
          onSave={(value: string) => {
            console.log("handleAddReply", handleAddReply);
            handleAddReply(value);
            setAddReply(false);
          }}
          onCancel={() => setAddReply(false)}
        />
      )}
    </div>
  );
}

type CommentProps = {
  user: string;
  onSave: (comment: string) => void;
  onCancel?: () => void;
};
function CommentBox({ user, onSave, onCancel }: CommentProps) {
  const [input, setInput] = useState("");
  function handleChange(e: React.FormEvent<HTMLTextAreaElement>) {
    setInput(e.currentTarget.value);
  }
  return (
    <div {...stylex.props(styles.commentContainer)}>
      {user}
      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Type a message"
        rows={10}
      />
      <div {...stylex.props(styles.btnContainer)}>
        <Button
          onClick={() => {
            console.log("on save...", input);
            onSave(input);
            setInput("");
          }}
          label="Send"
          size="large"
        />
        <Button
          onClick={() => {
            setInput("");
            onCancel?.();
          }}
          label="Cancel"
          size="large"
        />
      </div>
    </div>
  );
}
const styles = stylex.create({
  commentContainer: {
    display: "flex",
    gap: "0.5em",
    flexDirection: "column",
  },
  btnContainer: {
    display: "flex",
    gap: "1em",
    marginLeft: "auto",
  },
});
