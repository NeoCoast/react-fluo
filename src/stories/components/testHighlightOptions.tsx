import React, { useState } from 'react';

import HighlightOptions from '../../components/highlightOptions';
import Highlight, { Author } from '../../interfaces/highlight';

interface HighlightOptionsProps {
  highlightOptions: React.CSSProperties[],
  title?: string,
  style?: React.CSSProperties,
  closeIcon?: string,
  currentAuthor?: Author,
}

const TestHighlightOptions = ({
  highlightOptions,
  title,
  style,
  closeIcon,
  currentAuthor,
}: HighlightOptionsProps) => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const highlight:Highlight = {
    id: 0,
    start: 0,
    end: 0,
    selection: '',
    style: '',
    comments: [],
  };
  const [showStyle, setShowStyle] = useState<boolean>(false);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight>(highlight);
  return (
    <HighlightOptions
      highlights={highlights}
      setHighlights={setHighlights}
      position={{ x: 100, y: 0 }}
      setOptions={() => undefined}
      selectedHighlight={selectedHighlight}
      showStyle={showStyle}
      setShowStyle={setShowStyle}
      highlightOptions={highlightOptions}
      title={title}
      style={style}
      closeIcon={closeIcon}
      setSelectedHighlight={setSelectedHighlight}
      currentAuthor={currentAuthor}
    />
  );
};

export default TestHighlightOptions;
