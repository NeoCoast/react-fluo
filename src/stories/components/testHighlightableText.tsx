import React, { useState } from 'react';

import HighlatableText from '../../components/highlatableText';
import Highlight, { Author } from '../../interfaces/highlight';
import { HandleOverlap } from '../../helpers/createHighlight';

export interface TestHighlatableTextProps {
  id:string,
  text: string,
  highlights: Highlight[],
  style: React.CSSProperties,
  highlightable: boolean,
  editable: boolean,
  handleOverlaps: HandleOverlap,
  highlightOptions: React.CSSProperties[],
  defaultHighlight?: number,
  optionsTitle?: string,
  optionsStyle?: React.CSSProperties,
  currentAuthor?: Author,
}

const TestHighlightableText = ({
  id,
  text,
  highlights,
  style,
  highlightable,
  editable,
  handleOverlaps,
  highlightOptions,
  defaultHighlight,
  optionsTitle,
  optionsStyle,
  currentAuthor,
}:TestHighlatableTextProps) => {
  const [internalHighlights, setHighlights] = useState<Highlight[]>(highlights);
  const [editableText, setEditableText] = useState<string>(text);

  return (
    <div>
      <HighlatableText
        id={id}
        text={editableText}
        setText={setEditableText}
        highlights={internalHighlights}
        setHighlights={setHighlights}
        style={style}
        highlightOptions={highlightOptions}
        highlightable={highlightable}
        editable={editable}
        handleOverlaps={handleOverlaps}
        defaultHighlight={defaultHighlight}
        optionsStyle={optionsStyle}
        optionsTitle={optionsTitle}
        currentAuthor={currentAuthor}
      />
    </div>
  );
};

export default TestHighlightableText;
