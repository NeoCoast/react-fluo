import Highlight from '../interfaces/highlight';
import Selection from '../interfaces/selection';

const isDelete = (newText:string, prevText:string) => newText.length < prevText.length;

interface EditHighlightedTextInterface {
  prevText: string,
  newText: string,
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  selection: Selection,
  isEnter: boolean,
}

const findOverlapping = (position: number, highlights: Highlight[]) => highlights.find(
  (highlight) => position >= highlight.start && position <= highlight.end,
);

const beforeHighlights = (selection: Selection, highlights: Highlight[]) => highlights.filter(
  (highlight) => highlight.end < selection.start,
);

const overlappingHighlights = (seletion: Selection, highlights: Highlight[]) => highlights.filter(
  (curr) => seletion.start <= curr.end && seletion.end >= curr.start,
);

const afterHighlights = (selection: Selection, highlights: Highlight[]) => highlights.filter(
  (highlight) => highlight.start > selection.end,
);

const adjustOverlappingEnter = (
  selection: Selection,
  highlights: Highlight[],
  setHighlights: (val: Highlight[]) => void,
  newText: string,
) => {
  const modHighlight = findOverlapping(selection.start, highlights);
  if (modHighlight) {
    const newHighlight = {
      ...modHighlight,
      end: modHighlight.end + 1,
      selection: newText.substring(modHighlight.start, modHighlight.end + 1),
    };
    setHighlights(highlights.map((highlight) => (highlight.id === newHighlight.id
      ? newHighlight : highlight)));
  }
};

const modifyAfterHighlights = (
  newText: string,
  prevText: string,
  highlights: Highlight[],
  selection: Selection,
) => afterHighlights(selection, highlights).map((highlight) => {
  const diff = Math.abs(newText.length - prevText.length);
  if (isDelete(newText, prevText || '')) {
    return {
      ...highlight,
      start: highlight.start - diff,
      end: highlight.end - diff,
      selection: newText.substring(highlight.start - diff, highlight.end - diff),
    };
  }
  return {
    ...highlight,
    start: highlight.start + diff,
    end: highlight.end + diff,
    selection: newText.substring(highlight.start + diff, highlight.end + diff),
  };
});

const coversAllHighlight = (selection: Selection, highlight: Highlight) => (
  selection.start <= highlight.start && selection.end >= highlight.end
);

const overlappingDiff = (
  selection: Selection,
  highlight: Highlight,
  newText: string,
  prevText: string,
) => {
  const absDiff = Math.abs(newText.length - prevText.length);
  if (selection.start < highlight.start && selection.end < highlight.end) {
    return { diff: selection.end - highlight.start + 1, position: 'start', absDiff };
  }
  if (selection.start > highlight.start && selection.end >= highlight.end) {
    return { diff: highlight.end - selection.start + 1, position: 'end', absDiff };
  }
  return { diff: Math.abs(newText.length - prevText.length), position: 'end', absDiff };
};

const modifyOverlappingHighlights = (
  newText: string,
  prevText: string,
  highlights: Highlight[],
  selection: Selection,
) => overlappingHighlights(selection, highlights).map((highlight) => {
  const { diff, position, absDiff } = overlappingDiff(selection, highlight, newText, prevText);
  if (isDelete(newText, prevText)) {
    if (coversAllHighlight(selection, highlight)) {
      return {
        ...highlight,
        start: -1,
      };
    }
    return {
      ...highlight,
      start: position === 'start' ? highlight.start - absDiff + diff - 1 : highlight.start,
      end: position === 'start' ? highlight.end - absDiff : highlight.end - diff,
      selection: newText.substring(highlight.start, highlight.end - diff),
    };
  }
  return {
    ...highlight,
    start: position === 'start' ? highlight.start + diff : highlight.start,
    end: position === 'end' ? highlight.end + diff : highlight.end,
    selection: newText.substring(highlight.start, highlight.end + diff),
  };
}).filter((highlight) => highlight.start !== -1);

const editHighlightedText = ({
  prevText,
  newText,
  highlights,
  setHighlights,
  selection,
  isEnter,
}: EditHighlightedTextInterface) => {
  if (newText.length !== prevText?.length && selection) {
    const modAfterHighligts =  modifyAfterHighlights(newText, prevText, highlights, selection);
    const modOverlappingHighlights = modifyOverlappingHighlights(
      newText,
      prevText,
      highlights,
      selection,
    );
    setHighlights([
      ...beforeHighlights(selection, highlights),
      ...modOverlappingHighlights,
      ...modAfterHighligts,
    ]);
  } else if (isEnter) {
    adjustOverlappingEnter(selection, highlights, setHighlights, newText);
  }
};

export default editHighlightedText;
