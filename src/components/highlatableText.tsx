import React, { useEffect, useState } from 'react';

import HighlightOptions from './highlightOptions';

import Highlight, { Author } from '../interfaces/highlight';
import Selection from '../interfaces/selection';

import styleToString from '../helpers/styleToString';
import getHighlightPosition, { Coord } from '../helpers/getHighlightPosition';
import createHighlight, { HandleOverlap } from '../helpers/createHighlight';
import editHighlightedText from '../helpers/editHighlightedText';
import getSelection from '../helpers/getSelection';
import setCarretPosition from '../helpers/setCarretPosition';

import '../assets/styles/highlightableText.scss';
import replaceEnters from '../helpers/replaceEnters';

export interface HighlatableTextProps {
  id: string,
  text: string,
  setText?: (val: string) => void,
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  highlightOptions: React.CSSProperties[],
  highlightable?: boolean,
  editable?: boolean,
  style?: React.CSSProperties,
  handleOverlaps?: HandleOverlap,
  defaultHighlight?: number,
  optionsTitle?: string,
  optionsStyle?: React.CSSProperties,
  closeIcon?: string,
  replyIcon?: string,
  showOptionsIcon?: string,
  errors?: string[],
  setErrors?: (val: string[]) => void,
  currentAuthor?: Author,
}

const HighlatableText = ({
  id,
  text,
  setText = () => {},
  highlights,
  setHighlights,
  highlightable,
  editable,
  style,
  handleOverlaps = HandleOverlap.Merge,
  highlightOptions,
  defaultHighlight,
  optionsTitle,
  optionsStyle,
  closeIcon,
  replyIcon,
  showOptionsIcon,
  errors,
  setErrors,
  currentAuthor,
}: HighlatableTextProps) => {
  const [options, setOptions] = useState<boolean>(false);
  const [showStyle, setShowStyle] = useState<boolean>(false);
  const [position, setPosition] = useState<Coord>({ x:0, y: 0 });
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight>();
  const [prevText, setPrevText] = useState<string>('');
  const [currCarretPosition, setCurrCarretPosition] = useState<number>(0);
  const [newHighlight, setNewHighlight] = useState<boolean>();
  const [currSelection, setCurrSelection] = useState<Selection>({
    start: 0,
    end: 0,
    selection: '',
    valid: false,
  });

  const defaultStyle = defaultHighlight ? styleToString(highlightOptions[defaultHighlight]) : 'text-decoration: underline; color: black';

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
    const editableElement = document.getElementById(`editable_${id}`);
    if (element && editableElement) {
      setCarretPosition(editableElement, currCarretPosition);
      let lenghtDifference = 0;
      element.innerHTML = editableElement.innerHTML;
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
  }, [highlights, text]);

  const openOptions = (open: boolean) => {
    const coords = getHighlightPosition(false);
    if (coords && open) {
      setPosition(coords);
      setOptions(true);
    }
  };

  const clickHandler = (e: any) => {
    setNewHighlight(false);
    const { start, end } = getSelection();
    const selected = highlights.find((h) =>  (h.start <= start && h.end >= end)
                                                  || e.target.id === h.id.toString());

    if (selected && !newHighlight) {
      setSelectedHighlight(selected);
      setShowStyle(false);
      openOptions(true);
    }
  };

  const onKeyUp = (e: any) => {
    const selection = getSelection();
    const element = document.getElementById(`editable_${id}`);
    if (element) {
      setText(replaceEnters(element.innerHTML));
    }

    editHighlightedText({
      prevText,
      newText: e.target.textContent,
      highlights,
      setHighlights,
      selection: (selection.selection.length > currSelection.selection.length)
        ? selection : currSelection,
      isEnter: e.which === 13,
    });
    setCurrSelection(selection);
    setCurrCarretPosition(e.which === 13 ? currCarretPosition + 1 : selection.end);
  };

  const onKeyDown = (e: any) => {
    const selection = getSelection();
    const element = document.getElementById(`editable_${id}`);
    if (element) {
      setText(replaceEnters(element.innerHTML));
    }
    setCurrSelection(selection);
    setPrevText(e.target.textContent);
    setOptions(false);
    setCurrCarretPosition(selection.end);
  };

  return (
    <div style={style} className="highlitable-text__container">
      {options && selectedHighlight
      && (
      <HighlightOptions
        highlights={highlights}
        setHighlights={setHighlights}
        position={position}
        setOptions={setOptions}
        style={optionsStyle}
        showStyle={showStyle}
        setShowStyle={setShowStyle}
        closeIcon={closeIcon}
        highlightOptions={highlightOptions}
        title={optionsTitle}
        selectedHighlight={selectedHighlight}
        setSelectedHighlight={setSelectedHighlight}
        replyIcon={replyIcon}
        showOptionsIcon={showOptionsIcon}
        currentAuthor={currentAuthor}
      />
      )}
      <div
        id={id}
        dangerouslySetInnerHTML={{ __html: text }}
        className="highlitable-text__overlay"
        role="presentation"
        onClick={clickHandler}
      />
      <div
        id={`editable_${id}`}
        dangerouslySetInnerHTML={{ __html: text }}
        contentEditable={editable}
        className="highlitable-text"
        style={{ position: 'absolute' }}
        onKeyDown={(e) => onKeyDown(e)}
        onKeyUp={(e) => onKeyUp(e)}
        role="presentation"
        suppressContentEditableWarning
        onClick={clickHandler}
        onMouseUp={(e) => {
          const selection = getSelection();
          const element:any = e.target;
          if (element && element.textContent) {
            const open = createHighlight(
              element.textContent,
              highlightable != null && highlightable,
              highlights,
              setHighlights,
              handleOverlaps,
              setSelectedHighlight,
              undefined,
              defaultStyle,
              setNewHighlight,
              errors,
              setErrors,
            );
            setCurrSelection(selection);
            setShowStyle(open);
            openOptions(open);
          }
        }}
      />
    </div>
  );
};

export default HighlatableText;
