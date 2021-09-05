Reveal.addEventListener("ready", function addFragmentToLists() {
  for (const listItem of document.querySelectorAll(".fragmented-lists li")) {
    if (!listItem.closest("aside.notes")) {
      listItem.classList.add("fragment");
    }
  }
});
