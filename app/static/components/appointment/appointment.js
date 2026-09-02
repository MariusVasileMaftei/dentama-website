(function () {
  const form = document.querySelector('[data-appointment-form]');
  const success = document.querySelector('[data-appointment-success]');
  if (!form || !success) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    success.hidden = false;
    success.focus();
  });
})();
