import React, { useState } from 'react';

import HighlightOptions from '../../components/highlightOptions';
import Highlight from '../../interfaces/highlight';

interface HighlightOptionsProps {
  highlightOptions: React.CSSProperties[],
  title?: string,
  style?: React.CSSProperties,
  closeIcon?: string,
}

const TestHighlightOptions = ({
  highlightOptions,
  title,
  style,
  closeIcon,
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
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight>(highlight);
  return (
    <HighlightOptions
      highlights={highlights}
      setHighlights={setHighlights}
      position={{ x: 100, y: 0 }}
      setOptions={() => undefined}
      selectedHighlight={selectedHighlight}
      highlightOptions={highlightOptions}
      title={title}
      style={style}
      closeIcon={closeIcon}
      setSelectedHighlight={setSelectedHighlight}
    />
  );
};

export default TestHighlightOptions;
