import { Coord } from '../helpers/getHighlightPosition';

import cross from '../assets/images/cross.svg';

import styleToString from '../helpers/styleToString';

import '../assets/styles/highlightableOptions.scss';
import Highlight from '../interfaces/highlight';

interface HighlightOptionsProps {
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  position: Coord,
  highlightOptions: React.CSSProperties[],
  setOptions: (val: boolean) => void,
  selectedHighlight: Highlight,
  title?: string,
  style?: React.CSSProperties,
  closeIcon?: string,
}

const HighlightOptions = ({
  highlights,
  setHighlights,
  position,
  highlightOptions,
  setOptions,
  selectedHighlight,
  title,
  style,
  closeIcon,
}: HighlightOptionsProps) => {
  const { x, y } = position;

  const replaceStyle = (newStyle: React.CSSProperties) => setHighlights(highlights.map(
    (highlight) => {
      if (selectedHighlight) {
        const replace = highlights.find(
          (h) => (h.id === selectedHighlight.id),
        );
        if (replace && replace.id === highlight.id) {
          const newHighlight = {
            id: highlight.id,
            start: highlight.start,
            end: highlight.end,
            selection: highlight.selection,
            style: styleToString(newStyle),
          };
          return newHighlight;
        }
        return highlight;
      }
      return highlight;
    },
  ));

  return (
    <div style={{ top: `${y}px`, left: `${x + 5}px` }} className="highlightable-options">
      <div role="presentation" className="highlightable-options__overlay" onClick={() => setOptions(false)} />
      <div style={style} className="highlightable-options__container">
        <div className="highlightable-options__header">
          <h3 className="highlightable-options__header-title">{title || 'Select highlight'}</h3>
          <button type="button" className="highlightable-options__close">
            <img
              src={closeIcon || cross}
              alt="Close Modal"
              role="presentation"
              onClick={() => setOptions(false)}
              className="table__header--icon"
            />
          </button>
        </div>
        <div className="highlightable-options__items">
          <div
            style={{ textDecoration: 'underline', color: 'black' }}
            className="highlightable-options__item"
            role="presentation"
            onClick={() => replaceStyle({ textDecoration: 'underline', color: 'black' })}
          >
            U
          </div>
          <div
            className="highlightable-options__delete"
            role="presentation"
            onClick={() => {
              setHighlights(highlights.filter((h) => h.id !== selectedHighlight.id));
              setOptions(false);
            }}
          >
            <img
              src={cross}
              style={{ width: '20px', height: '20px' }}
              alt="Close Modal"
              role="presentation"
              onClick={() => setOptions(false)}
              className="table__header--icon"
            />
          </div>
          {highlightOptions.map((option) => (
            <div
              key={styleToString(option)}
              style={option}
              className="highlightable-options__item"
              role="presentation"
              onClick={() => replaceStyle(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightOptions;
