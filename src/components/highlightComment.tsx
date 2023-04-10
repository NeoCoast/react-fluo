import React from 'react';
import format from 'date-fns/format';

import replyDefault from '../assets/images/reply.svg';

import Highlight, { Comment } from '../interfaces/highlight';

import { addReply } from '../helpers/addComments';

import '../assets/styles/highlightableComments.scss';

interface HighloghtCommentProps {
  comment: Comment,
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  selectedHighlight: Highlight,
  setSelectedHighlight: (val: Highlight) => void,
  replyIcon?: string,
}

const HighlightComment = ({
  comment,
  highlights,
  setHighlights,
  selectedHighlight,
  setSelectedHighlight,
  replyIcon,
}:HighloghtCommentProps) => {
  const toggleReplyInput = () => {
    const replyInput = document.getElementById(`reply-input-${comment.id}`);
    if (replyInput) {
      replyInput.classList.toggle('highlitable-comments__reply-input--show');
    }
  };

  const newReply = (event: any) => {
    if (event.keyCode === 13) {
      addReply({
        comment: event.target.value,
        commentId: comment.id,
        highlights,
        setHighlights,
        selectedHighlight,
        setSelectedHighlight,
      });
      toggleReplyInput();
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  return (
    <div key={comment.id} className="highlitable-comments">
      {comment.author && <p className="highlitable-comments__author">{comment.author}</p>}
      <p className="highlitable-comments__date">
        {format(comment.date, 'dd/MM/yyyy')}
      </p>
      <div className="highlitable-comments__text-row">
        <p className="highlitable-comments__text">
          {comment.text}
        </p>
        <button type="button" className="highlitable-comments__add-reply">
          <img
            src={replyIcon || replyDefault}
            alt="Add reply"
            role="presentation"
            className="highlitable-comments__add-reply-icon"
            onClick={() => toggleReplyInput()}
          />
        </button>
      </div>
      <div className="highlitable-comments__replies">
        {comment.replies.map((reply) => (
          <div key={reply.text} className="highlitable-comments__reply">
            <p className="highlitable-comments__reply-author">{reply.author}</p>
            <p className="highlitable-comments__reply-text">{reply.text}</p>
          </div>
        ))}
        <input
          id={`reply-input-${comment.id}`}
          type="text"
          placeholder="Add reply"
          onKeyUp={(e) => newReply(e)}
          className="highlitable-comments__reply-input"
        />
      </div>
    </div>
  );
};

export default HighlightComment;
