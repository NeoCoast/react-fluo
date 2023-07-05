import React from 'react';
import format from 'date-fns/format';

import replyDefault from '../assets/images/reply.svg';

import Highlight, { Comment, Author } from '../interfaces/highlight';

import { addReply } from '../helpers/addComments';

import '../assets/styles/highlightableComments.scss';

interface HighloghtCommentProps {
  comment: Comment,
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  selectedHighlight: Highlight,
  setSelectedHighlight: (val: Highlight) => void,
  replyIcon?: string,
  currentAuthor?: Author,
}

const HighlightComment = ({
  comment,
  highlights,
  setHighlights,
  selectedHighlight,
  setSelectedHighlight,
  replyIcon,
  currentAuthor,
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
        author: currentAuthor,
      });
      toggleReplyInput();
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  return (
    <div key={comment.id} className="highlitable-comments">
      <div className="highlitable-comments__text-row">
        {comment.author
        && (
        <div className="highlitable-comments__author">
          {comment.author.avatar
          && <img src={comment.author.avatar} alt="Author avatar" className="highlitable-comments__author-avatar" />}
          <p className="highlitable-comments__author-name">{comment.author.name}</p>
        </div>
        )}
        <p className="highlitable-comments__date">
          {format(comment.date, 'dd/MM/yyyy')}
        </p>
      </div>
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
            {reply.author
            && (
            <div className="highlitable-comments__reply-author">
              {reply.author.avatar
              && <img src={reply.author.avatar} alt="Author avatar" className="highlitable-comments__reply-author-avatar" />}
              <p className="highlitable-comments__reply-author-name">{reply.author.name}</p>
            </div>
            )}
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
