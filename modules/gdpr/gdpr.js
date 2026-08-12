/* ==========================================================================
   GDPR POPUP LOGIC - DENTAMA V3
   ========================================================================== */

export function initGDPR() {
  const popup = document.getElementById('gdpr-popup');
  const btnAccept = document.getElementById('btn-gdpr-accept');
  const btnNecessary = document.getElementById('btn-gdpr-necessary');

  const consent = localStorage.getItem('dentama_gdpr_consent');

  if (!consent && popup) {
    // Show popup with subtle delay for smooth entry
    setTimeout(() => {
      popup.style.display = 'block';
    }, 600);
  }

  if (btnAccept && popup) {
    btnAccept.addEventListener('click', () => {
      localStorage.setItem('dentama_gdpr_consent', 'all');
      popup.style.display = 'none';
    });
  }

  if (btnNecessary && popup) {
    btnNecessary.addEventListener('click', () => {
      localStorage.setItem('dentama_gdpr_consent', 'necessary');
      popup.style.display = 'none';
    });
  }
}
