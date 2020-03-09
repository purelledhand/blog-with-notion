import React from 'react';
import './PreviewCard.css';

function PreviewCard(Props) {
  const { postTitle, contents } = Props;

  return (
    <div className="PreviewCard">
        <div className="preview_title">
            {postTitle}
        </div>
        <div className="preview_contents">
            {contents}
        </div>
    </div>
  );
}

export default PreviewCard;
