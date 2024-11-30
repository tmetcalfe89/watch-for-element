import { emit, on } from "@tmetcalfe89/signal";

export default function watchForElement(selector, callback) {
  const id = `wfe.'${selector}'`;
  on(id, callback);
  const observer = new MutationObserver(() => {
    const foundList = document.querySelectorAll(
      `${selector}:not([data-found])`
    );
    foundList.forEach((found) => {
      found.dataset.found = true;
      emit(id, found);
    });
  });
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
  const matched = document.querySelectorAll(selector);
  matched.forEach((match) => {
    match.dataset.found = true;
    emit(id, match);
  });
}
