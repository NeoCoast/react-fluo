/* eslint-disable no-plusplus */
import Highlight from '../interfaces/highlight';
import getSelection from './getSelection';

export enum HandleOverlap {
  Merge,
  Delete,
  Error,
}

const overlapingHighlight = (highlight: Highlight, highlights: Highlight[]) => highlights.filter(
  (curr) => highlight.start <= curr.end && highlight.end >= curr.start,
);

const nonOverlapingHighlight = (highlight: Highlight, highlights: Highlight[]) => highlights.filter(
  (curr) => !(highlight.start <= curr.end && highlight.end >= curr.start),
);

const mergeHighlights = (
  text: string,
  overlaps: Highlight[],
  setHighlights:(val: Highlight[])=>void,
  highlights: Highlight[],
  setSelectedHighlight: (val: Highlight) => void,
  selectedHighlight: Highlight | undefined,
  defaultHighlight: string,
) => {
  const starts = overlaps.map((overlap) => overlap.start);
  const ends = overlaps.map((overlap) => overlap.end);
  const newhighlight:Highlight = {
    id: Math.max(...overlaps.map((overlap) => overlap.id)),
    start: Math.min(...starts),
    end: Math.max(...ends),
    selection: text.substring(Math.min(...starts), Math.max(...ends)),
    style: selectedHighlight?.style || defaultHighlight,
    comments: [],
  };
  setSelectedHighlight(newhighlight);
  setHighlights([...nonOverlapingHighlight(newhighlight, highlights), newhighlight]);
};

const overlapHandler = (
  text: string,
  newhighlight: Highlight,
  overlaps: Highlight[],
  highlights: Highlight[],
  setHighlights:(val: Highlight[])=>void,
  handleOverlaps: HandleOverlap,
  setSelectedHighlight: (val: Highlight) => void,
  selectedHighlight: Highlight | undefined,
  defaultHighlight: string,
  errors?: string[],
  setErrors?: (val: string[]) => void,
) => {
  switch (handleOverlaps) {
    case HandleOverlap.Merge:
      mergeHighlights(
        text,
        [...overlaps, newhighlight],
        setHighlights,
        highlights,
        setSelectedHighlight,
        selectedHighlight,
        defaultHighlight,
      );
      return true;
    case HandleOverlap.Delete:
      setHighlights(nonOverlapingHighlight(newhighlight, highlights));
      return false;
    case HandleOverlap.Error:
      if (errors && setErrors) {
        setErrors([...errors, 'Highlights overlap']);
      }
      return false;
    default:
      alert('Highlights overlap');
      return false;
  }
};

const createHighlight = (
  text: string,
  highlightable: boolean,
  highlights: Highlight[],
  setHighlights:(val: Highlight[])=>void,
  handleOverlaps: HandleOverlap,
  setSelectedHighlight: (val: Highlight) => void,
  selectedHighlight: Highlight | undefined,
  defaultHighlight: string,
  setNewHighlight: (val: boolean) => void,
  errors?: string[],
  setErrors?: (val: string[]) => void,
) => {
  const {
    start,
    end,
    selection,
    valid,
  } = getSelection();
  if (highlightable && valid && start !== end) {
    setNewHighlight(true);
    let currentLargest = 0;
    if (highlights.length > 0) {
      currentLargest = Math.max(...highlights.map((h) => h.id));
    }
    const id = currentLargest + 1;
    const newhighlight:Highlight = {
      id,
      start,
      end: end - 1,
      selection,
      style: defaultHighlight,
      comments: [],
    };
    const overlap = overlapingHighlight(newhighlight, highlights);
    if (overlap.length > 0) {
      return overlapHandler(
        text,
        newhighlight,
        overlap,
        highlights,
        setHighlights,
        handleOverlaps,
        setSelectedHighlight,
        selectedHighlight,
        defaultHighlight,
        errors,
        setErrors,
      );
    }
    setSelectedHighlight(newhighlight);
    setHighlights([...highlights, newhighlight]);
    return true;
  }
  return false;
};

export default createHighlight;
