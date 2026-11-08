/**
 * app.js - Arquitectura Frontend & Sistema de Agendamiento
 * Dra. Cindy Gisella Méndez Pinto - Psicóloga & Talento Humano
 */

// Webhook configurable para Google Sheets / Apps Script o CRM (Zapier, Make, n8n)
// Si está vacío o con el valor por defecto, el flujo continuará normalmente sin errores.
const WEBHOOK_URL = "URL_DE_TU_GOOGLE_APPS_SCRIPT_O_WEBHOOK";

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de iconos Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Año actual dinámico en el footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Menú móvil responsive
  initMobileMenu();

  // Animaciones de entrada al hacer scroll (60fps ligeras)
  initScrollReveal();

  // Accesibilidad: Cerrar modal con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
    }
  });

  // Cerrar modal al hacer clic en el backdrop oscuro
  const modal = getModalElement();
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeBookingModal();
      }
    });
  }
});

/**
 * Obtener elemento del modal soportando ambos selectores
 */
function getModalElement() {
  return document.getElementById('modal-agendamiento') || document.getElementById('bookingModal');
}

/**
 * Observador de Scroll Reveal ligero
 */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('section');
  sections.forEach(sec => sec.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/**
 * Control del Menú Móvil
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  const openIcon = document.getElementById('menuOpenIcon');
  const closeIcon = document.getElementById('menuCloseIcon');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      menu.classList.remove('hidden');
      if (openIcon) openIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
      if (openIcon) openIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
  });
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const openIcon = document.getElementById('menuOpenIcon');
  const closeIcon = document.getElementById('menuCloseIcon');
  if (menu && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
    if (openIcon) openIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
  }
}

/**
 * Cambio de pestañas en Servicios
 * @param {'clinica' | 'organizacional'} tab 
 */
function switchServiceTab(tab) {
  const btnClinica = document.getElementById('tabClinica');
  const btnOrg = document.getElementById('tabOrganizacional');
  const contentClinica = document.getElementById('contentClinica');
  const contentOrg = document.getElementById('contentOrganizacional');

  if (tab === 'clinica') {
    if (btnClinica) btnClinica.className = 'px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 bg-brand-navy text-white shadow-sm flex items-center gap-2';
    if (btnOrg) btnOrg.className = 'px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 text-brand-textMuted hover:text-brand-navy flex items-center gap-2';
    if (contentClinica) contentClinica.classList.remove('hidden');
    if (contentOrg) contentOrg.classList.add('hidden');
  } else {
    if (btnOrg) btnOrg.className = 'px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 bg-brand-navy text-white shadow-sm flex items-center gap-2';
    if (btnClinica) btnClinica.className = 'px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 text-brand-textMuted hover:text-brand-navy flex items-center gap-2';
    if (contentOrg) contentOrg.classList.remove('hidden');
    if (contentClinica) contentClinica.classList.add('hidden');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Alias para compatibilidad de invocación directa
window.abrirModalCita = openBookingModal;

/**
 * Abrir Modal de Agendamiento
 * @param {string} [presetService] Servicio preseleccionado opcional
 */
function openBookingModal(presetService = '') {
  const modal = getModalElement();
  const modalBox = document.getElementById('modalBox');
  const serviceSelect = document.getElementById('serviceSelect');
  const formContainer = document.getElementById('modalFormContainer');
  const successContainer = document.getElementById('modalSuccessContainer');

  if (!modal || !modalBox) return;

  // Restaurar vista de formulario al abrir
  if (formContainer && successContainer) {
    formContainer.classList.remove('hidden');
    successContainer.classList.add('hidden');
  }

  // Preseleccionar servicio si fue suministrado
  if (presetService && serviceSelect) {
    const options = Array.from(serviceSelect.options);
    const matchedOption = options.find(opt => 
      opt.value.toLowerCase().includes(presetService.toLowerCase()) || 
      presetService.toLowerCase().includes(opt.value.toLowerCase())
    );
    if (matchedOption) {
      serviceSelect.value = matchedOption.value;
    }
  }

  // Bloquear scroll de fondo
  document.body.style.overflow = 'hidden';

  modal.classList.remove('hidden');
  requestAnimationFrame(() => {
    modalBox.classList.remove('scale-95', 'opacity-0');
    modalBox.classList.add('scale-100', 'opacity-100');
  });

  // Foco en el primer campo
  setTimeout(() => {
    const firstInput = document.getElementById('fullName');
    if (firstInput && formContainer && !formContainer.classList.contains('hidden')) {
      firstInput.focus();
    }
  }, 100);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Alias para compatibilidad de invocación directa
window.abrirModalCita = openBookingModal;

/**
 * Cerrar Modal de Agendamiento
 */
function closeBookingModal() {
  const modal = getModalElement();
  const modalBox = document.getElementById('modalBox');

  if (!modal || !modalBox) return;

  modalBox.classList.remove('scale-100', 'opacity-100');
  modalBox.classList.add('scale-95', 'opacity-0');

  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 200);
}

/**
 * Generador de Código de Seguimiento Único
 * Formato: REF-PSI- + AAMMDD + - + número aleatorio de 3 dígitos
 * Ejemplo: REF-PSI-261108-482
 */
function generateLeadRef() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const rand3 = Math.floor(100 + Math.random() * 900);
  return `REF-PSI-${yy}${mm}${dd}-${rand3}`;
}

/**
 * Enviar lead a Google Sheets / Webhook de forma asíncrona y no bloqueante
 */
async function sendLeadToWebhook(data) {
  if (!WEBHOOK_URL || WEBHOOK_URL === "URL_DE_TU_GOOGLE_APPS_SCRIPT_O_WEBHOOK" || !WEBHOOK_URL.startsWith('http')) {
    // Si no está configurado, log informativo y continuar sin afectar al usuario
    console.info('Webhook no configurado o en valor demo. Omitiendo despacho a Google Sheets:', data);
    return;
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Standard para endpoints de Google Apps Script
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    // Falla controlada para no interrumpir el flujo del usuario hacia WhatsApp
    console.warn('Advertencia no bloqueante en Webhook:', error);
  }
}

/**
 * Manejador del Formulario de Agendamiento
 */
async function handleBookingSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phone');
  const serviceSelect = document.getElementById('serviceSelect');
  const modalityRadio = document.querySelector('input[name="modalidad"]:checked');
  const legalConsent = document.getElementById('legalConsent');

  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const serviceError = document.getElementById('serviceError');
  const consentError = document.getElementById('consentError');

  // Limpiar estados de error previos
  if (nameError) nameError.classList.add('hidden');
  if (phoneError) phoneError.classList.add('hidden');
  if (serviceError) serviceError.classList.add('hidden');
  if (consentError) consentError.classList.add('hidden');

  const fullName = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const service = serviceSelect ? serviceSelect.value : '';
  const modality = modalityRadio ? modalityRadio.value : 'Presencial en Montería';
  const isConsentChecked = legalConsent ? legalConsent.checked : false;

  let hasError = false;

  // 1. Validación de nombre
  if (!fullName || fullName.length < 3) {
    if (nameError) nameError.classList.remove('hidden');
    if (nameInput) nameInput.focus();
    hasError = true;
  }

  // 2. Validación de teléfono para Colombia (móvil 10 dígitos o fijo nacional)
  const cleanPhone = phone.replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 7 || (cleanPhone.length !== 10 && cleanPhone.length !== 12)) {
    if (phoneError) phoneError.classList.remove('hidden');
    if (!hasError && phoneInput) phoneInput.focus();
    hasError = true;
  }

  // 3. Validación de servicio seleccionado
  if (!service) {
    if (serviceError) serviceError.classList.remove('hidden');
    if (!hasError && serviceSelect) serviceSelect.focus();
    hasError = true;
  }

  // 4. Validación de consentimiento Ley 1581
  if (!isConsentChecked) {
    if (consentError) consentError.classList.remove('hidden');
    if (!hasError && legalConsent) legalConsent.focus();
    hasError = true;
  }

  if (hasError) return;

  // Activar estado de carga (Spinner)
  const submitBtn = document.getElementById('submitBookingBtn');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');

  if (submitBtn) submitBtn.disabled = true;
  if (btnSpinner) btnSpinner.classList.remove('hidden');
  if (btnText) btnText.textContent = 'Procesando agendamiento...';
  if (btnIcon) btnIcon.classList.add('hidden');

  // 1. Generar ID único de referencia
  const refId = generateLeadRef();

  // 2. Despacho asíncrono a Google Sheets / Webhook
  const leadPayload = {
    timestamp: new Date().toISOString(),
    refId: refId,
    nombre: fullName,
    telefono: phone,
    servicio: service,
    modalidad: modality
  };

  sendLeadToWebhook(leadPayload);

  // 3. Preparar mensaje oficial y URL codificada para WhatsApp
  // Formato exacto requerido:
  // "Hola Dra. Cindy Méndez, solicito agendar una cita a través del sitio web.
  //
  // *Detalles de mi solicitud:*
  // - *Código de Referencia:* [REF_ID]
  // - *Nombre:* [Nombre]
  // - *Teléfono:* [Teléfono]
  // - *Servicio:* [Servicio]
  // - *Modalidad:* [Modalidad]
  //
  // Quedo atento/a para coordinar fecha y hora."
  const rawMessage = `Hola Dra. Cindy Méndez, solicito agendar una cita a través del sitio web.

*Detalles de mi solicitud:*
- *Código de Referencia:* ${refId}
- *Nombre:* ${fullName}
- *Teléfono:* ${phone}
- *Servicio:* ${service}
- *Modalidad:* ${modality}

Quedo atento/a para coordinar fecha y hora.`;

  const whatsappUrl = `https://wa.me/573018015912?text=${encodeURIComponent(rawMessage)}`;

  // 4. Intentar abrir WhatsApp inmediatamente
  try {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  } catch (e) {
    console.error('Ventana emergente bloqueada:', e);
  }

  // 5. Presentar pantalla de confirmación en el modal
  const formContainer = document.getElementById('modalFormContainer');
  const successContainer = document.getElementById('modalSuccessContainer');
  const refCodeEl = document.getElementById('successRefCode');
  const successWaLink = document.getElementById('successWhatsAppLink');

  if (refCodeEl) refCodeEl.textContent = refId;
  if (successWaLink) successWaLink.href = whatsappUrl;

  if (formContainer && successContainer) {
    formContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');
  }

  // Restaurar botón para futuras aperturas
  if (submitBtn) submitBtn.disabled = false;
  if (btnSpinner) btnSpinner.classList.add('hidden');
  if (btnText) btnText.textContent = 'Confirmar y Continuar a WhatsApp';
  if (btnIcon) btnIcon.classList.remove('hidden');

  if (window.lucide) {
    window.lucide.createIcons();
  }

  showToast(`¡Solicitud registrada! Código: ${refId}`);
}

/**
 * Copiar número de Nequi al portapapeles
 */
function copyNequiNumber() {
  const nequiNumber = '3018015912';

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(nequiNumber).then(() => {
      handleCopySuccess();
    }).catch(() => {
      fallbackCopy(nequiNumber);
    });
  } else {
    fallbackCopy(nequiNumber);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    handleCopySuccess();
  } catch (err) {
    showToast('Número Nequi: 3018015912');
  }
  document.body.removeChild(textArea);
}

function handleCopySuccess() {
  const btnText = document.getElementById('copyBtnText');
  const copyBtn = document.getElementById('copyNequiBtn');

  if (btnText) {
    const originalText = btnText.textContent;
    btnText.textContent = '¡Número Copiado!';

    if (copyBtn) {
      copyBtn.classList.remove('bg-white/10', 'hover:bg-white/20');
      copyBtn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-400');
    }

    setTimeout(() => {
      btnText.textContent = originalText;
      if (copyBtn) {
        copyBtn.classList.add('bg-white/10', 'hover:bg-white/20');
        copyBtn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-400');
      }
    }, 2500);
  }

  showToast('¡Número Copiado! (3018015912)');
}

/**
 * Notificación Toast visual
 */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 3500);
}

/**
 * Acordeón de Preguntas Frecuentes (FAQ)
 */
function toggleFaq(id) {
  const content = document.getElementById(`faqContent-${id}`);
  const icon = document.getElementById(`faqIcon-${id}`);

  if (!content) return;

  const isHidden = content.classList.contains('hidden');

  for (let i = 1; i <= 4; i++) {
    const otherContent = document.getElementById(`faqContent-${i}`);
    const otherIcon = document.getElementById(`faqIcon-${i}`);
    if (otherContent && i !== id) {
      otherContent.classList.add('hidden');
    }
    if (otherIcon && i !== id) {
      otherIcon.style.transform = 'rotate(0deg)';
    }
  }

  if (isHidden) {
    content.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    content.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}
