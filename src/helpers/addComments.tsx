import Highlight, { Author, Comment } from '../interfaces/highlight';

interface AddCommentInterface {
  comment: string,
  author?: Author,
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  selectedHighlight: Highlight,
  setSelectedHighlight: (val: Highlight) => void,

}

export const addComment = ({
  comment,
  author,
  highlights,
  setHighlights,
  selectedHighlight,
  setSelectedHighlight,
}: AddCommentInterface) => {
  const oldHighlight = highlights.find((highlight) => highlight.id === selectedHighlight.id);
  if (oldHighlight) {
    let currentLargest = 0;
    if (oldHighlight.comments.length > 0) {
      currentLargest = Math.max(...oldHighlight.comments.map((h) => h.id)) + 1;
    }
    const id = currentLargest + 1;
    const newComment:Comment = {
      id,
      date: new Date(),
      text: comment,
      author,
      replies: [],
    };
    const modHighlight = {
      ...selectedHighlight,
      comments: [...selectedHighlight.comments, newComment],
    };
    setHighlights(highlights.map(
      (highlight) => ((highlight.id === selectedHighlight.id) ? modHighlight : highlight),
    ));
    setSelectedHighlight(modHighlight);
  }
};

interface AddReplyInterface {
  comment: string,
  author?: Author,
  commentId: number,
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  selectedHighlight: Highlight,
  setSelectedHighlight: (val: Highlight) => void,
}

export const addReply = ({
  comment,
  author,
  commentId,
  highlights,
  setHighlights,
  selectedHighlight,
  setSelectedHighlight,
}: AddReplyInterface) => {
  const oldHighlight = highlights.find((highlight) => highlight.id === selectedHighlight.id);
  if (oldHighlight) {
    const oldComment = oldHighlight.comments.find((com) => com.id === commentId);
    if (oldComment) {
      const newReply = {
        text: comment,
        date: new Date(),
        author,
      };
      const newComment:Comment = {
        ...oldComment,
        replies: [...oldComment.replies, newReply],
      };
      const modHighlight = {
        ...selectedHighlight,
        comments: selectedHighlight.comments.map(
          (com) => (com.id === oldComment.id ? newComment : com),
        ),
      };
      setHighlights(highlights.map(
        (highlight) => ((highlight.id === selectedHighlight.id) ? modHighlight : highlight),
      ));
      setSelectedHighlight(modHighlight);
    }
  }
};
