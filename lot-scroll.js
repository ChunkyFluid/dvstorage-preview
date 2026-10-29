(function () {
  var key = "vs-lot-scroll";
  var saved = sessionStorage.getItem(key);

  if (saved) {
    var y = Number(saved);
    sessionStorage.removeItem(key);
    if (y > 0) {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      var restore = function () { window.scrollTo(0, y); };
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", restore);
      } else {
        restore();
      }
      window.addEventListener("load", restore);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".lots");
    if (!nav) return;
    nav.addEventListener("click", function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var link = event.target.closest("a");
      if (!link || link.target === "_blank") return;
      sessionStorage.setItem(key, String(window.scrollY));
    });
  });
})();
