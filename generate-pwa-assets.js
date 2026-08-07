import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Ensure directories exist
const publicDir = path.resolve('public');
const iconsDir = path.resolve('public/icons');
const screenshotsDir = path.resolve('public/screenshots');

if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

// SVG icon builder
function generateIconSVG(width, height, isMaskable = false) {
  const bg = '#1D1D1B';
  const gold = '#B08D57';
  const goldLight = '#D8C5A5';
  const white = '#FFFFFF';

  // For maskable, content must be inside center 80% circle (safe zone)
  const scale = isMaskable ? 0.75 : 0.88;
  const center = width / 2;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="${width}" height="${height}" fill="${bg}" rx="${isMaskable ? 0 : Math.round(width * 0.2)}"/>
    
    <!-- Outer Gold Ring -->
    <circle cx="${center}" cy="${center - Math.round(height * 0.04)}" r="${Math.round(center * scale * 0.72)}" fill="none" stroke="${gold}" stroke-width="${Math.max(2, Math.round(width * 0.025))}" opacity="0.9"/>
    
    <!-- Inner Accent Ring -->
    <circle cx="${center}" cy="${center - Math.round(height * 0.04)}" r="${Math.round(center * scale * 0.62)}" fill="none" stroke="${goldLight}" stroke-width="${Math.max(1, Math.round(width * 0.012))}" stroke-dasharray="${Math.round(width * 0.02)} ${Math.round(width * 0.015)}" opacity="0.6"/>

    <!-- DUO CLINIC Monogram DC -->
    <text x="${center}" y="${center - Math.round(height * 0.03)}" font-family="Georgia, serif" font-size="${Math.round(width * 0.28 * scale)}" font-weight="bold" fill="${gold}" text-anchor="middle" dominant-baseline="central" letter-spacing="1">DC</text>
    
    <!-- DUOCLINIC Text -->
    <text x="${center}" y="${center + Math.round(height * 0.22 * scale)}" font-family="'Plus Jakarta Sans', sans-serif" font-size="${Math.round(width * 0.072 * scale)}" font-weight="700" fill="${white}" text-anchor="middle" letter-spacing="3">DUOCLINIC</text>

    <!-- Subtitle -->
    <text x="${center}" y="${center + Math.round(height * 0.31 * scale)}" font-family="'Plus Jakarta Sans', sans-serif" font-size="${Math.round(width * 0.04 * scale)}" font-weight="500" fill="${goldLight}" text-anchor="middle" letter-spacing="2">INDAIATUBA</text>
  </svg>`;
}

function generateScreenshotDesktopSVG() {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <!-- Canvas BG -->
    <rect width="1280" height="720" fill="#181613"/>
    
    <!-- Hero Header BG -->
    <rect width="1280" height="80" fill="#1D1D1B" opacity="0.95"/>
    <circle cx="60" cy="40" r="22" fill="#B08D57"/>
    <text x="60" y="45" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#1D1D1B" text-anchor="middle">DC</text>
    <text x="96" y="47" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#FFFFFF" letter-spacing="2">DUO<tspan fill="#B08D57">CLINIC</tspan></text>
    <text x="96" y="62" font-family="sans-serif" font-size="10" fill="#D8C5A5" letter-spacing="2">ODONTOLOGIA INDAIATUBA</text>

    <rect x="1060" y="22" width="160" height="36" rx="18" fill="#B08D57"/>
    <text x="1140" y="45" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Agendar Avaliação</text>

    <!-- Hero Section -->
    <text x="120" y="220" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#B08D57" letter-spacing="3">EXCELÊNCIA &amp; ACOLHIMENTO EM INDAIATUBA</text>
    <text x="120" y="280" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="#FFFFFF">Odontologia de Alta Precisão</text>
    <text x="120" y="330" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="#D8C5A5">com Cuidado Humano</text>

    <text x="120" y="380" font-family="sans-serif" font-size="16" fill="#E5DEC9">Dr. Gabriel Murakami • Especialista em Endodontia</text>
    <text x="120" y="408" font-family="sans-serif" font-size="16" fill="#E5DEC9">Dra. Giovana Pastorello • Clínica Geral e Estética Dental</text>

    <!-- Cards Row -->
    <g transform="translate(120, 470)">
      <!-- Card 1 -->
      <rect x="0" y="0" width="310" height="180" rx="16" fill="#1D1D1B" stroke="#B08D57" stroke-width="1"/>
      <text x="24" y="40" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="#B08D57">Tratamento de Canal</text>
      <text x="24" y="70" font-family="sans-serif" font-size="13" fill="#A0A0A0">Diagnóstico preciso e foco na</text>
      <text x="24" y="90" font-family="sans-serif" font-size="13" fill="#A0A0A0">preservação do dente natural.</text>
      <rect x="24" y="120" width="140" height="30" rx="15" fill="#B08D57" opacity="0.2"/>
      <text x="94" y="140" font-family="sans-serif" font-size="12" font-weight="bold" fill="#D8C5A5" text-anchor="middle">Endodontia</text>

      <!-- Card 2 -->
      <rect x="340" y="0" width="310" height="180" rx="16" fill="#1D1D1B" stroke="#25231F" stroke-width="1"/>
      <text x="364" y="40" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="#FFFFFF">Estética &amp; Facetas</text>
      <text x="364" y="70" font-family="sans-serif" font-size="13" fill="#A0A0A0">Lentes e facetas em resina com</text>
      <text x="364" y="90" font-family="sans-serif" font-size="13" fill="#A0A0A0">acabamento natural e refinado.</text>
      <rect x="364" y="120" width="140" height="30" rx="15" fill="#FFFFFF" opacity="0.1"/>
      <text x="434" y="140" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Resina Composta</text>

      <!-- Card 3 -->
      <rect x="680" y="0" width="310" height="180" rx="16" fill="#1D1D1B" stroke="#25231F" stroke-width="1"/>
      <text x="704" y="40" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="#FFFFFF">Extração de Siso</text>
      <text x="704" y="70" font-family="sans-serif" font-size="13" fill="#A0A0A0">Cirurgia minimamente invasiva e</text>
      <text x="704" y="90" font-family="sans-serif" font-size="13" fill="#A0A0A0">pós-operatório acompanhado.</text>
      <rect x="704" y="120" width="140" height="30" rx="15" fill="#FFFFFF" opacity="0.1"/>
      <text x="774" y="140" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Siso &amp; Cirurgias</text>
    </g>
  </svg>`;
}

function generateScreenshotMobileSVG() {
  return `<svg width="390" height="844" viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg">
    <!-- Mobile BG -->
    <rect width="390" height="844" fill="#181613"/>

    <!-- Header -->
    <rect width="390" height="70" fill="#1D1D1B"/>
    <circle cx="36" cy="35" r="18" fill="#B08D57"/>
    <text x="36" y="40" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#1D1D1B" text-anchor="middle">DC</text>
    <text x="64" y="38" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#FFFFFF">DUO<tspan fill="#B08D57">CLINIC</tspan></text>
    <rect x="270" y="20" width="100" height="30" rx="15" fill="#B08D57"/>
    <text x="320" y="39" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Agendar</text>

    <!-- Mobile Hero Content -->
    <text x="24" y="130" font-family="sans-serif" font-size="11" font-weight="700" fill="#B08D57" letter-spacing="2">DUOCLINIC INDAIATUBA</text>
    <text x="24" y="170" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#FFFFFF">Cuidado Dental</text>
    <text x="24" y="205" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#D8C5A5">Especializado</text>

    <text x="24" y="245" font-family="sans-serif" font-size="13" fill="#CCCCCC">Dr. Gabriel Murakami • Endodontia</text>
    <text x="24" y="268" font-family="sans-serif" font-size="13" fill="#CCCCCC">Dra. Giovana Pastorello • Estética</text>

    <!-- Big CTA -->
    <rect x="24" y="305" width="342" height="48" rx="24" fill="#B08D57"/>
    <text x="195" y="335" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Agendar Avaliação pelo WhatsApp</text>

    <!-- Services Cards vertical stack -->
    <g transform="translate(24, 380)">
      <!-- Card 1 -->
      <rect x="0" y="0" width="342" height="120" rx="16" fill="#1D1D1B" stroke="#B08D57" stroke-width="1"/>
      <text x="20" y="36" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#B08D57">Tratamento de Canal (Endodontia)</text>
      <text x="20" y="62" font-family="sans-serif" font-size="12" fill="#A0A0A0">Diagnóstico atencioso e técnica para alívio</text>
      <text x="20" y="80" font-family="sans-serif" font-size="12" fill="#A0A0A0">e preservação da estrutura do dente.</text>

      <!-- Card 2 -->
      <rect x="0" y="138" width="342" height="120" rx="16" fill="#1D1D1B" stroke="#25231F" stroke-width="1"/>
      <text x="20" y="174" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#FFFFFF">Clínica Geral &amp; Estética Dental</text>
      <text x="20" y="200" font-family="sans-serif" font-size="12" fill="#A0A0A0">Facetas em resina, clareamento supervisionado</text>
      <text x="20" y="218" font-family="sans-serif" font-size="12" fill="#A0A0A0">e acompanhamento preventivo completo.</text>

      <!-- Card 3 -->
      <rect x="0" y="276" width="342" height="120" rx="16" fill="#1D1D1B" stroke="#25231F" stroke-width="1"/>
      <text x="20" y="312" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#FFFFFF">Extração &amp; Cirurgia de Siso</text>
      <text x="20" y="338" font-family="sans-serif" font-size="12" fill="#A0A0A0">Procedimento cirúrgico seguro e cuidados</text>
      <text x="20" y="356" font-family="sans-serif" font-size="12" fill="#A0A0A0">atenciosos durante o pós-operatório.</text>
    </g>
  </svg>`;
}

async function buildAllAssets() {
  console.log('Generating PWA Icons & Screenshots...');

  // 1. Favicon 16x16
  const svg16 = generateIconSVG(16, 16);
  await sharp(Buffer.from(svg16)).png().toFile(path.join(publicDir, 'favicon-16x16.png'));

  // 2. Favicon 32x32
  const svg32 = generateIconSVG(32, 32);
  await sharp(Buffer.from(svg32)).png().toFile(path.join(publicDir, 'favicon-32x32.png'));

  // 3. Favicon ICO (use 32x32 png)
  await sharp(Buffer.from(svg32)).toFile(path.join(publicDir, 'favicon.ico'));

  // 4. Apple Touch Icon 180x180
  const svg180 = generateIconSVG(180, 180);
  await sharp(Buffer.from(svg180)).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // 5. PWA 192x192
  const svg192 = generateIconSVG(192, 192);
  await sharp(Buffer.from(svg192)).png().toFile(path.join(iconsDir, 'pwa-192x192.png'));

  // 6. PWA 512x512
  const svg512 = generateIconSVG(512, 512);
  await sharp(Buffer.from(svg512)).png().toFile(path.join(iconsDir, 'pwa-512x512.png'));

  // 7. PWA Maskable 192x192
  const svgMaskable192 = generateIconSVG(192, 192, true);
  await sharp(Buffer.from(svgMaskable192)).png().toFile(path.join(iconsDir, 'pwa-maskable-192x192.png'));

  // 8. PWA Maskable 512x512
  const svgMaskable512 = generateIconSVG(512, 512, true);
  await sharp(Buffer.from(svgMaskable512)).png().toFile(path.join(iconsDir, 'pwa-maskable-512x512.png'));

  // 9. Screenshots Desktop 1280x720
  const svgScreenshotDesktop = generateScreenshotDesktopSVG();
  await sharp(Buffer.from(svgScreenshotDesktop)).png().toFile(path.join(screenshotsDir, 'duoclinic-desktop.png'));

  // 10. Screenshots Mobile 390x844
  const svgScreenshotMobile = generateScreenshotMobileSVG();
  await sharp(Buffer.from(svgScreenshotMobile)).png().toFile(path.join(screenshotsDir, 'duoclinic-mobile.png'));

  console.log('✅ All PWA Icons & Screenshots successfully generated!');
}

buildAllAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
