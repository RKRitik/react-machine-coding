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
    replies: [
      {
        user: "robert",
        timestamp: "2021-03-04T15:40:00.000Z",
        comment: "Does this work? nested",
      },
      {
        user: "robert",
        timestamp: "2021-03-04T15:40:00.000Z",
        comment: "probably not",
      },
    ],
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

  function handleAddReply(comment: string, parentIndex: string) {
    const parentLevel = [...comments];
    const levels = parentIndex.split(",").map((v) => parseInt(v, 10));
    const newReply = {
      user: loggedInUser,
      timestamp: new Date().toISOString(),
      comment,
    };
    let currentObj = parentLevel; // Start with the top-level array
    let lastObj: Comment;
    levels.forEach((level: number) => {
      lastObj = currentObj[level];
      if (!lastObj.replies) {
        lastObj.replies = [];
      }
      currentObj = lastObj.replies;
    });
    if (lastObj) lastObj?.replies?.push(newReply);
    setComments(parentLevel);
  }

  return (
    <div>
      <h1>Comments on Social Media page</h1>
      <CommentBox user={loggedInUser} onSave={handleAddComment} />
      {comments.map((c, parentIndex) => (
        <AddedComment
          commentIndex={parentIndex.toString()}
          comment={c}
          handleAddReply={(comment: string, pI: string) =>
            handleAddReply(comment, pI || "-1")
          }
          loggedInUser={loggedInUser}
        />
      ))}
    </div>
  );
}

function AddedComment({
  comment,
  commentIndex,
  loggedInUser,
  handleAddReply,
}: {
  comment: Comment;
  commentIndex: string;
  loggedInUser: string;
  handleAddReply: (value: string, parentIndex: string) => void;
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
            {comment.replies.map((reply, index) => (
              <AddedComment
                commentIndex={commentIndex + "," + index}
                comment={reply}
                loggedInUser={loggedInUser}
                handleAddReply={(value) =>
                  handleAddReply(value, commentIndex + "," + index)
                }
              />
            ))}
          </div>
        )}
      </div>
      {addReply && (
        <CommentBox
          user={loggedInUser}
          onSave={(value: string) => {
            handleAddReply(value, commentIndex);
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
