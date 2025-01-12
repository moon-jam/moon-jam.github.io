document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.task-list input[type="checkbox"]').forEach(checkbox => {
    if (!checkbox.nextSibling || checkbox.nextSibling.nodeType !== Node.TEXT_NODE || checkbox.nextSibling.nodeValue.trim() !== '') {
      checkbox.insertAdjacentHTML('afterend', '&nbsp;');
    }
  });
});
