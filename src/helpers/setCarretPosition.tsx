const setCaretPosition = (elem: HTMLElement, caretPos: number) => {
  const range = document.createRange();
  const selection = window.getSelection();
  if (selection && elem) {
    range.setStart(caretPos === 0 ? elem : elem.childNodes[0], caretPos);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export default setCaretPosition;
