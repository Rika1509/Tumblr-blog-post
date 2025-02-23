import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../../Services/Endpoints";

interface PostModel {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }

  type GroupedComments = {
    [postId: number]: PostModel[];
  }

export function useFetchComments() {

const [comments, setComments] = useState<PostModel[]>([]);
const [showListComments, setShowListComments] = useState<boolean>(false);

useEffect(() => {
  getComments();
}, []);

function getComments() {
  fetch(`${ENDPOINTS.Comments}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      const outputs: GroupedComments = {};
      data.forEach((currResult: PostModel) => {
        const postId = currResult.postId;
          if (!outputs[postId]) outputs[postId] = [];
          const object: PostModel = {
            postId: currResult.postId,
            id: currResult.id,
            name: currResult.name,
            email: currResult.email,
            body: currResult.body,
          };
          outputs[postId].push(object);
      });
      const commentsPostId = [];
      for (const postId in outputs) {
        if (postId === "1") {
          commentsPostId.push(...outputs[postId]);
        }
      }
      setComments(commentsPostId);
    })
    .catch((error) => {
      console.error("Errore nella richiesta", error);
    });
}


function showComments() {
  setShowListComments(true);
}

return {
    comments, showComments, showListComments
}
}