(function () {
  var root = document.querySelector(".reviews");
  if (!root) return;
  var quotes = Array.prototype.slice.call(root.querySelectorAll("blockquote"));
  if (quotes.length < 2) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var index = 0;
  var timer = null;
  var paused = false;
  var delay = 7000;
  var controls = document.createElement("div");
  var pauseButton;

  function show(next) {
    index = (next + quotes.length) % quotes.length;
    quotes.forEach(function (quote, quoteIndex) {
      if (quoteIndex === index) quote.removeAttribute("hidden");
      else quote.setAttribute("hidden", "");
    });
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (!paused) timer = window.setInterval(function () { show(index + 1); }, delay);
  }

  root.classList.add("is-rotating");
  root.setAttribute("aria-roledescription", "carousel");
  controls.className = "review-controls";
  controls.innerHTML = '<button type="button" data-review="prev">Previous</button><button type="button" data-review="pause" aria-pressed="false">Pause</button><button type="button" data-review="next">Next</button>';
  root.appendChild(controls);
  pauseButton = controls.querySelector("[data-review='pause']");

  controls.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button) return;
    var action = button.getAttribute("data-review");
    if (action === "prev") show(index - 1);
    if (action === "next") show(index + 1);
    if (action === "pause") {
      paused = !paused;
      pauseButton.setAttribute("aria-pressed", paused ? "true" : "false");
      pauseButton.textContent = paused ? "Play" : "Pause";
    }
    start();
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", function (event) {
    if (!root.contains(event.relatedTarget)) start();
  });

  show(0);
  start();
})();
