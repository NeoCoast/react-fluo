import React, { useEffect, useState } from 'react';

import HighlightOptions from './highlightOptions';
import Highlight from '../interfaces/highlight';

import styleToString from '../helpers/styleToString';
import getHighlightPosition, { Coord } from '../helpers/getHighlightPosition';
import createHighlight, { HandleOverlap } from '../helpers/createHighlight';

import '../assets/styles/highlightableText.scss';

export interface HighlatableTextProps {
  id: string,
  text: string,
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  highlightable?: boolean,
  style?: React.CSSProperties,
  handleOverlaps: HandleOverlap,
  highlightOptions: React.CSSProperties[],
  optionsTitle?: string,
  optionsStyle?: React.CSSProperties,
  closeIcon?: string,
  errors?: string[],
  setErrors?: (val: string[]) => void,
}

const HighlatableText = ({
  id,
  text,
  highlights,
  setHighlights,
  highlightable,
  style,
  handleOverlaps,
  highlightOptions,
  optionsTitle,
  optionsStyle,
  closeIcon,
  errors,
  setErrors,
}: HighlatableTextProps) => {
  const [options, setOptions] = useState<boolean>(false);
  const [position, setPosition] = useState<Coord>({ x:0, y: 0 });
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight>();

  const drawHighlight = (
    spanId: number,
    start:number,
    end:number,
    highlightStyle: string,
    lenghtDifference: number,
  ) => {
    const element = document.getElementById(id);
    if (element) {
      const str = element.innerHTML;
      const modStart = start + lenghtDifference;
      const modEnd = end + lenghtDifference;
      const modstr = `${str.substr(0, modStart)
      }<span id="${spanId}" style="${`${highlightStyle}`}">${
        str.substr(modStart, modEnd - modStart + 1)
      }</span>${
        str.substr(modEnd + 1)}`;
      element.innerHTML = modstr;
      return modstr.length - str.length;
    }
    return 0;
  };

  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      let lenghtDifference = 0;
      element.innerHTML = text;
      highlights.sort((prev, next) => prev.start - next.start).forEach(
        (highlight) => {
          lenghtDifference += drawHighlight(
            highlight.id,
            highlight.start,
            highlight.end,
            highlight.style,
            lenghtDifference,
          );
        },
      );
    }
  }, [highlights]);

  const openOptions = (open: boolean) => {
    const coords = getHighlightPosition(false);
    if (coords && open) {
      setPosition(coords);
      setOptions(true);
    }
  };

  const clickHandler = () => {
    const selection = window.getSelection();
    if (selection) {
      const fst = selection.anchorOffset;
      const snd = selection.focusOffset;
      if (fst >= 0 && snd >= 0 && fst === snd) {
        const start = Math.min(fst, snd);
        const end = Math.max(fst, snd);
        const selected = highlights.find((h) => h.start <= start && h.end >= end);
        if (selected) {
          setSelectedHighlight(selected);
          openOptions(true);
        }
      }
    }
  };

  return (
    <div style={style}>
      {options && selectedHighlight
      && (
      <HighlightOptions
        highlights={highlights}
        setHighlights={setHighlights}
        position={position}
        setOptions={setOptions}
        style={optionsStyle}
        closeIcon={closeIcon}
        highlightOptions={highlightOptions}
        title={optionsTitle}
        selectedHighlight={selectedHighlight}
      />
      )}
      <div
        id={id}
        className="highlitable-text__overlay"
        role="presentation"
        onClick={clickHandler}
      >
        {text}
      </div>
      <div
        className="highlitable-text"
        style={{ position: 'absolute' }}
        role="presentation"
        onClick={clickHandler}
        onMouseUp={() => {
          const open = createHighlight(
            text,
            highlightable != null && highlightable,
            highlights,
            setHighlights,
            handleOverlaps,
            window.getSelection(),
            setSelectedHighlight,
            undefined,
            errors,
            setErrors,
          );
          openOptions(open);
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default HighlatableText;
