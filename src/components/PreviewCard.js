import React from 'react';
import './PreviewCard.css';

function PreviewCard(Props) {
  const { postTitle, contents } = Props;

  return (
    <div className="PreviewCard">
        <h3 className="preview_title">
            {postTitle}
        </h3>
        <div className="preview_contents">
            {contents}
        </div>
    </div>
  );
}

export default PreviewCard;
