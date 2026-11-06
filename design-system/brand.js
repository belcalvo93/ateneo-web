// Nombre de marca: se cambia solo acá. Los HTML lo leen con [data-brand-name].
(function () {
  var BRAND_NAME = 'Ateneo Amigos de la Ciencia';
  var BRAND_SHORT = 'AAC';
  window.BRAND = { name: BRAND_NAME, short: BRAND_SHORT };
  function bind() {
    var nodes = document.querySelectorAll('[data-brand-name]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = nodes[i].getAttribute('data-brand-name') === 'short' ? BRAND_SHORT : BRAND_NAME;
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
})();
