# Sitio Web Oficial | Dra. Cindy Gisella Méndez Pinto

Sitio web oficial y landing page de alta conversión para la profesional en psicología y especialista en talento humano **Cindy Gisella Méndez Pinto**.

Desarrollado con arquitectura moderna, responsive (Mobile First), enfoque en confianza clínica, velocidad ultra rápida y conversión directa a WhatsApp con integración de pago Nequi.

---

## 👩‍⚕️ Información Profesional
- **Profesional:** Cindy Gisella Méndez Pinto
- **Perfil:** Psicóloga &bull; Especialista en Gerencia del Talento Humano
- **Tarjeta Profesional:** No. 112313 (Colegio Colombiano de Psicólogos - Ley 1090 de 2006)
- **Enfoque Clínico:** Cognitivo Conductual (TCC)
- **Modalidades de Atención:** Presencial (Montería, Córdoba) y Virtual (Nacional / Internacional)
- **Horario:** Lunes a Sábado de 8:00 a.m. a 7:00 p.m.
- **Teléfono / WhatsApp:** (+57) 301 801 5912
- **Correos Electrónicos:** cindygisemp@hotmail.com | cindygisemp@gmail.com
- **Cuenta Nequi:** 301 801 5912

---

## 🎨 Paleta de Color y Diseño Visual
- **Fondo Cálido Emocional:** `#FAFAF7` (Minimalismo cálido, reduce fatiga visual)
- **Verde Salvia / Menta:** `#EBF5F0` & `#C9E5D7` (Calma, salud mental, esperanza)
- **Azul Marino Institucional:** `#1B365D` (Sobriedad, confianza clínica, rigor ético)
- **Acentos Dorados / Mostaza Cálido:** `#D9A74A` (Cercanía, luz, optimismo)
- **Tipografías:**
  - *Cormorant Garamond:* Títulos y encabezados con elegancia humanista y serenidad.
  - *Plus Jakarta Sans:* Lectura fluida, clara y accesible en cualquier resolución.

---

## 🚀 Características Principales

1. **Arquitectura Mobile First & Ultra Rápida:**
   - Construido en HTML5 semántico, Tailwind CSS y Vanilla JavaScript nativo.
   - Cero dependencias pesadas; carga instantánea.

2. **Hero Section con Alta Carga Empática:**
   - Mensaje de bienvenida sin prejuicios: *"Tu bienestar emocional empieza aquí"*.
   - Badges de validación y credenciales a primera vista (TP 112313, Enfoque TCC).

3. **Pestañas de Servicios Interactivas:**
   - **Clínica & Bienestar:** Psicoterapia Individual, Duelo y Crisis, Psicoterapia Familiar, Club de Mamás.
   - **Organizacional & Vocacional:** Reclutamiento y Selección para Pymes, Charlas y Capacitaciones, Exploración Vocacional.

4. **Modal de Agendamiento Inteligente ("Separar Cita"):**
   - Validación inmediata de campos en cliente.
   - Generación automática de código único de lead (`REF-WEB-AAAAMMDD-XXXX`).
   - Redirección automática a WhatsApp oficial (+57 301 801 5912) con mensaje codificado listo para enviar.
   - Instrucciones claras sobre el anticipo de reserva con Nequi.

5. **Módulo de Pago Nequi:**
   - Tarjeta estilizada con botón para copiar al portapapeles el número `3018015912` en un solo clic con notificación Toast.
   - Claridad en valores a convenir y confirmación mediante comprobante.

6. **Botón Flotante Permanente:**
   - Acceso inmediato al WhatsApp oficial con tooltip dinámico *"Agenda tu consulta"*.

7. **Preguntas Frecuentes (FAQ):**
   - Acordeón interactivo para resolver dudas recurrentes sobre la primera sesión, terapia online y pagos.

---

## 🔒 Cumplimiento Legal y Tracking de Leads

1. **Ley 1581 de 2012 (Habeas Data & Protección de Datos Personales):**
   - Checkbox de consentimiento obligatorio en el modal de agendamiento antes de procesar el lead.
2. **Generador de Código de Seguimiento (Auditoría):**
   - Formato: `REF-PSI-` + AAMMDD + `-` + 3 dígitos aleatorios (Ejemplo: `REF-PSI-261108-482`).
3. **Integración con Google Sheets / Webhook:**
   - Envío asíncrono en segundo plano (`fetch` POST) a `WEBHOOK_URL` (configurable en `app.js`) sin bloquear al usuario en caso de desconexión.
4. **Derivación a WhatsApp Business:**
   - Mensaje oficial formateado con código de referencia, datos del paciente, servicio y modalidad para confirmación ágil.

---

## 📂 Estructura del Proyecto

```plaintext
psicologia/
├── assets/
│   └── cindy-mendez.webp # Fotografía profesional oficial
├── index.html            # Página web completa y modular
├── styles.css            # Estilos personalizados, animaciones y microinteracciones
├── app.js                # Lógica interactiva (Modal, Nequi copy, WhatsApp, Tabs, FAQ)
└── README.md             # Documentación del proyecto
```

---

## 💻 Cómo Ejecutar Localmente

Simplemente abre el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Firefox, Edge, Safari):

```powershell
# Opción 1: Abrir directamente desde PowerShell en Windows
Start-Process index.html

# Opción 2: Usar un servidor local ligero si lo prefieres (ej. Live Server, http-server o python)
python -m http.server 3000
```
