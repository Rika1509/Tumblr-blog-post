import "./App.css";
import Post from "../../Organism/Post/Post";
import { useFetchComments } from "./hook";

interface PostModel {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function App() {
  const {comments, showComments, showListComments } = useFetchComments()

  return (
    <>
      <div className="container">
        <Post />
        <div className="toolbar">
          <button onClick={showComments}>
            {showListComments ? "Nascondi commenti" : "Mostra commenti"}
          </button>
        </div>
          {showListComments && (
            <ul>
              {comments.map((comment: PostModel) => (
                <li key={comment.postId}>{comment.body}</li>
              ))}
            </ul>
          )}
      </div>
    </>
  );
}

export default App;
