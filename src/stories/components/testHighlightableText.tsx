import React, { useState } from 'react';

import HighlatableText from '../../components/highlatableText';
import Highlight from '../../interfaces/highlight';
import { HandleOverlap } from '../../helpers/createHighlight';

export interface TestHighlatableTextProps {
  id:string,
  text: string,
  highlights: Highlight[],
  style: React.CSSProperties,
  highlightable: boolean,
  handleOverlaps: HandleOverlap,
  highlightOptions: React.CSSProperties[],
  defaultHighlight?: number,
  optionsTitle?: string,
  optionsStyle?: React.CSSProperties,
}

const TestHighlightableText = ({
  id,
  text,
  highlights,
  style,
  highlightable,
  handleOverlaps,
  highlightOptions,
  defaultHighlight,
  optionsTitle,
  optionsStyle,
}:TestHighlatableTextProps) => {
  const [internalHighlights, setHighlights] = useState<Highlight[]>(highlights);

  return (
    <div>
      <HighlatableText
        id={id}
        text={text}
        highlights={internalHighlights}
        setHighlights={setHighlights}
        style={style}
        highlightOptions={highlightOptions}
        highlightable={highlightable}
        handleOverlaps={handleOverlaps}
        defaultHighlight={defaultHighlight}
        optionsStyle={optionsStyle}
        optionsTitle={optionsTitle}
      />
    </div>
  );
};

export default TestHighlightableText;
