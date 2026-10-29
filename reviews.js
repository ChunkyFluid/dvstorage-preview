(function () {
  var root = document.querySelector(".reviews");
  if (!root) return;
  var quotes = Array.prototype.slice.call(root.querySelectorAll("blockquote"));
  var visibleCount = Math.min(3, quotes.length);
  if (quotes.length < 2) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var index = 0;
  var delay = 7000;

  function show(next) {
    index = (next + quotes.length) % quotes.length;
    quotes.forEach(function (quote, offset) {
      var quoteIndex = (index + offset) % quotes.length;
      var item = quotes[quoteIndex];
      root.appendChild(item);
      if (offset < visibleCount) item.removeAttribute("hidden");
      else item.setAttribute("hidden", "");
    });
  }

  root.classList.add("is-rotating");
  show(0);
  window.setInterval(function () { show(index + 1); }, delay);
})();
