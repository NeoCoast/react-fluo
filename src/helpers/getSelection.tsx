const getSelection = () => {
  const selection = window.getSelection();
  if (selection && selection.anchorNode) {
    const fst = selection.anchorOffset;
    const snd = selection.focusOffset;
    if (fst >= 0 && snd >= 0) {
      const start = Math.min(fst, snd);
      const end = Math.max(fst, snd);
      return {
        start,
        end,
        selection: selection.toString(),
        parentNode: selection.anchorNode.parentNode,
        valid: true,
      };
    }
  }
  return {
    start: -1,
    end: -1,
    selection: '',
    parentNode: null,
    currentNode: null,
    valid: false,
  };
};

export default getSelection;
