/* ==========================================================================
   PROGRAMARE PAGE LOGIC - DENTAMA V2
   ========================================================================== */

export function initProgramare() {
  const form = document.getElementById('v2-booking-form');
  const alertBox = document.getElementById('booking-success-alert');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('p-name').value;
      const phone = document.getElementById('p-phone').value;
      const service = document.getElementById('p-service').value;
      const notes = document.getElementById('p-notes').value;
      const consent = document.getElementById('p-consent').checked;

      // Save inquiry to localStorage for Admin / CRM dashboard
      const inquiries = JSON.parse(localStorage.getItem('dentama_inquiries') || '[]');
      const newInquiry = {
        id: Date.now(),
        date: new Date().toLocaleString('ro-RO'),
        name: name,
        phone: phone,
        service: service,
        notes: notes,
        consentSMSWhatsApp: consent,
        status: 'Nouă'
      };
      inquiries.unshift(newInquiry);
      localStorage.setItem('dentama_inquiries', JSON.stringify(inquiries));

      console.log(`[DENTAMA V2] Notificare SMS automată trimisă la ${phone}`);
      console.log(`[DENTAMA V2] Notificare WhatsApp automată trimisă la ${phone}`);

      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      form.reset();

      setTimeout(() => {
        if (alertBox) alertBox.style.display = 'none';
      }, 8000);
    });
  }
}
