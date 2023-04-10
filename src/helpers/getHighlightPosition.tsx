export type Coord = {
  x: number;
  y: number;
};

function getHighlightPosition(atStart: boolean): Coord | null {
  const selection = window.getSelection();
  if (selection) {
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
        range.collapse(atStart);
        const rects = range.getClientRects();
        if (rects.length > 0) {
          const rect = rects[0];
          return { x: rect.x, y: rect.y };
        }
      }
    }
  }
  return null;
}

export default getHighlightPosition;
