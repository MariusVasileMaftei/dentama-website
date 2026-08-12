/* ==========================================================================
   ADMIN & MINI-CRM LOGIC - DENTAMA V2 (STATIC)
   ========================================================================== */

export function initAdmin() {
  // Tab Navigation
  const tabButtons = document.querySelectorAll('.crm-tab-btn');
  const tabPanes = document.querySelectorAll('.crm-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      if (target) {
        document.getElementById(target)?.classList.add('active');
      }
    });
  });

  // Default initial cases
  let cases = JSON.parse(localStorage.getItem('dentama_cases') || 'null');
  if (!cases) {
    cases = [
      {
        id: 1,
        title: "Tratament Endodontic Molar Inferior",
        desc: "Pacient cu pulpită acută și leziune periapicală la molarul 46. 4 canale obturate sub microscop Zeiss 3D."
      },
      {
        id: 2,
        title: "Extragere Fragment Ac Rupt din Canal",
        desc: "Retratament dificil la un premolar superior cu ac fracturat în treimea apicală, extras cu succes."
      }
    ];
    localStorage.setItem('dentama_cases', JSON.stringify(cases));
  }

  // Render inquiries
  renderInquiries();

  // Render cases
  renderCases();

  // Add Case Form Toggle
  const btnOpenAddCase = document.getElementById('btn-open-add-case');
  const modalBox = document.getElementById('case-editor-modal');
  const btnCancelCase = document.getElementById('btn-cancel-case-item');
  const btnSaveCase = document.getElementById('btn-save-case-item');

  if (btnOpenAddCase && modalBox) {
    btnOpenAddCase.addEventListener('click', () => {
      document.getElementById('edit-case-id').value = "-1";
      document.getElementById('case-input-title').value = "";
      document.getElementById('case-input-desc').value = "";
      modalBox.style.display = 'block';
    });
  }

  if (btnCancelCase && modalBox) {
    btnCancelCase.addEventListener('click', () => {
      modalBox.style.display = 'none';
    });
  }

  if (btnSaveCase && modalBox) {
    btnSaveCase.addEventListener('click', () => {
      const title = document.getElementById('case-input-title').value.trim();
      const desc = document.getElementById('case-input-desc').value.trim();

      if (!title || !desc) {
        alert("Vă rugăm completați titlul și descrierea cazului.");
        return;
      }

      const newCase = {
        id: Date.now(),
        title: title,
        desc: desc
      };

      cases.push(newCase);
      localStorage.setItem('dentama_cases', JSON.stringify(cases));
      renderCases();
      modalBox.style.display = 'none';
      alert(`Cazul clinic "${title}" a fost adăugat cu succes în lista site-ului!`);
    });
  }

  // Clear Inquiries History
  const btnClearInquiries = document.getElementById('btn-clear-inquiries');
  if (btnClearInquiries) {
    btnClearInquiries.addEventListener('click', () => {
      if (confirm("Sigur doriți să ștergeți istoricul solicitărilor?")) {
        localStorage.removeItem('dentama_inquiries');
        renderInquiries();
      }
    });
  }

  function renderInquiries() {
    const tableBody = document.getElementById('inquiries-table-body');
    const metricCount = document.getElementById('metric-inquiries-count');
    if (!tableBody) return;

    const inquiries = JSON.parse(localStorage.getItem('dentama_inquiries') || '[]');
    if (metricCount) metricCount.textContent = inquiries.length.toString();

    if (inquiries.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 30px;">
            Nicio solicitare de programare primită încă. Completați formularul din pagina <em>Programare</em> pentru a testa.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = inquiries.map(item => {
      const cleanPhone = item.phone.replace(/[^0-9+]/g, '');
      const waLink = `https://wa.me/${cleanPhone}?text=Buna%20ziua,%20va%20contactam%20de%20la%20Dentama%20Iasi%20pentru%20programare.`;

      return `
        <tr>
          <td><span style="color: var(--color-gold-light); font-weight: 600;">${item.date}</span></td>
          <td><strong>${item.name}</strong></td>
          <td>${item.phone}</td>
          <td>${item.service}</td>
          <td><span class="badge-consent">✓ Da (SMS+WA)</span></td>
          <td>
            <a href="${waLink}" target="_blank" class="action-wa-btn">💬 Scrie pe WhatsApp</a>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderCases() {
    const stack = document.getElementById('cases-admin-stack');
    const metricCases = document.getElementById('metric-cases-count');
    if (!stack) return;

    if (metricCases) metricCases.textContent = cases.length.toString();

    if (cases.length === 0) {
      stack.innerHTML = `<p style="color: var(--text-secondary); padding: 20px; text-align: center;">Nu există cazuri clinice.</p>`;
      return;
    }

    stack.innerHTML = cases.map((item, index) => {
      return `
        <div class="case-row-item">
          <div>
            <div class="case-row-title">${item.title}</div>
            <div class="case-row-desc">${item.desc}</div>
          </div>
          <div class="case-row-actions">
            <button type="button" class="btn-del" data-index="${index}">🗑️ Șterge</button>
          </div>
        </div>
      `;
    }).join('');

    // Bind delete buttons
    stack.querySelectorAll('.btn-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        if (confirm(`Sigur doriți să ștergeți cazul "${cases[idx].title}"?`)) {
          cases.splice(idx, 1);
          localStorage.setItem('dentama_cases', JSON.stringify(cases));
          renderCases();
        }
      });
    });
  }
}
