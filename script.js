// --- CONFIGURACIÓN DE PAGO DE LA PYME ---
const USA_STRIPE = false;
const STRIPE_PUBLIC_KEY = ""; 
const DATOS_BANCARIOS = {
    banco: "",
    clabe: "",
    titular: "Nombre del Titular"
};
// ----------------------------------------

const CONFIG = {
    whatsapp: "5214491472336", 
    whatsappAdicional: "5214491472336",
    sitioWeb: "https://dealers.kia.com/mx/altaria",
    facebook: "https://www.facebook.com/kiamexico",
    instagram: "https://www.instagram.com/kiamexico?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
    maps: "https://maps.app.goo.gl/cpVZoVbNQrju3MXd9", 
    youtubeUrl: "https://www.youtube.com/watch?v=YiN2M31_v7Y",
    textos: {
        cat1: { 
            t: "QUIÉNES SOMOS", 
            c: "KIA Altaria Aguascalientes abraza la filosofía 'Movement that inspires' (Movimiento que inspira), redefiniendo la movilidad con diseños galardonados, tecnología limpia, conectividad inteligente y un nivel de seguridad óptimo respaldado por nuestra incomparable garantía de 7 años." 
        },
        cat2: { 
            t: "EXCELENCIA", 
            c: "Explora una gama espectacular de SUVs, sedanes e híbridos avanzados como Sportage, Seltos, K3 y Forte. Ofrecemos planes de financiamiento a tu medida, pruebas de manejo personalizadas, mantenimiento certificado de defensa a defensa y refacciones legítimas de fábrica." 
        },
        cat3: { 
            t: "CLIENTES FELICES", 
            c: "Nuestra absoluta prioridad es inspirar confianza. Cientos de familias y empresas de Aguascalientes respaldan la lealtad, la comodidad inteligente y la extraordinaria tranquilidad de manejar un KIA protegido por 7 años o 150,000 km de respaldo." 
        }
    },
    sucursales: {
        suc1: { nombre: "Asesor 1", wa: "5214491472336", maps: "https://maps.app.goo.gl/cpVZoVbNQrju3MXd9" },
        suc2: { nombre: "Asesor 2", wa: "5214491472336", maps: "https://maps.app.goo.gl/cpVZoVbNQrju3MXd9" },
        suc3: { nombre: "Asesor 3", wa: "5214491472336", maps: "https://maps.app.goo.gl/cpVZoVbNQrju3MXd9" },
        suc4: { nombre: "Asesor 4", wa: "5214491472336", maps: "https://maps.app.goo.gl/cpVZoVbNQrju3MXd9" },
        suc5: { nombre: "Asesor 5", wa: "5214491472336", maps: "https://maps.app.goo.gl/cpVZoVbNQrju3MXd9" },
        suc6: { nombre: "Asesor 6", wa: "5214491472336", maps: "https://maps.app.goo.gl/cpVZoVbNQrju3MXd9" }
    }
};

let currentGallery = [];
let currentIndex = 0;

function openYouTubeVideo() { 
    playClick(); 
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    let videoId = "YiN2M31_v7Y"; 
    
    if(CONFIG.youtubeUrl.includes("shorts/")) { 
        videoId = CONFIG.youtubeUrl.split("shorts/")[1].split("?")[0]; 
    } else if(CONFIG.youtubeUrl.includes("v=")) { 
        videoId = CONFIG.youtubeUrl.split("v=")[1].split("&")[0]; 
    } else if(CONFIG.youtubeUrl.includes("youtu.be/")) {
        videoId = CONFIG.youtubeUrl.split("youtu.be/")[1].split("?")[0];
    }
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    overlay.style.display = 'flex';
}

function closeVideoLightbox() {
    playClick();
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    iframe.src = ""; 
    overlay.style.display = 'none';
}

function openProfileZoom() {
    playClick();
    const imgElement = document.getElementById('profile-pic-img');
    if(imgElement) { const src = imgElement.src; openLightbox(src, [src], true); }
}

function showAppContent(cat) {
    playClick();
    document.getElementById('dynamic-content-layer').style.display = 'flex';
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const pane = document.getElementById(`${cat}-pane`);
    if(pane) pane.style.display = 'flex';
    if(cat !== 'cat4') renderGallery(cat);
}

function renderGallery(cat) {
    const grid = document.getElementById(`grid-${cat}`);
    if(!grid) return; 
    grid.innerHTML = '';
    
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'gallery-title-white';
    titleHeader.innerText = CONFIG.textos[cat].t;
    grid.appendChild(titleHeader);
    
    const imgCount = (cat === 'cat3') ? 3 : (cat === 'cat1' || cat === 'cat2') ? 6 : 4;
    const imgs = [];
    for(let i = 1; i <= imgCount; i++) { imgs.push(`assets/gallery/${cat}/${i}.jpg`); }
    
    const rowGrid = document.createElement('div');
    rowGrid.className = 'quad-row-grid';
    imgs.forEach((src, index) => {
        const posClass = (index % 2 === 0) ? 'pos-left' : 'pos-right';
        rowGrid.appendChild(createPol(src, posClass, imgs));
    });
    grid.appendChild(rowGrid);
    
    if (cat === 'cat3') {
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = "display: flex; gap: 10px; margin-top: 15px; justify-content: center; width: 100%; flex-wrap: wrap;";
        videoContainer.innerHTML = `
            <a href="https://www.youtube.com/shorts/WDXDnPaQwSQ" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 0.7rem; border: 1px solid var(--brand-accent);">Opinión de nuestros clientes</a>
            <a href="https://www.youtube.com/shorts/GopMDEtapcQ" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 0.7rem; border: 1px solid var(--brand-accent);">Viviendo un KIA</a>
        `;
        grid.appendChild(videoContainer);
    }
    
    const btn = document.createElement('button');
    btn.className = 'btn-details-gold'; 
    btn.innerHTML = `<i class="fas fa-plus-circle"></i> VER DETALLES`;
    btn.onclick = (e) => { e.stopPropagation(); openTextZoom(cat); };
    grid.appendChild(btn);
}

function createPol(src, pos, arr) {
    const div = document.createElement('div');
    div.className = `polaroid-item ${pos}`;
    div.innerHTML = `<img src="${src}">`;
    div.onclick = (e) => { e.stopPropagation(); openLightbox(src, arr, false); };
    return div;
}

function openLightbox(src, arr, hideControls) {
    playClick();
    currentGallery = arr;
    currentIndex = arr.indexOf(src);
    const lightboxEl = document.getElementById('lightbox');
    const imgEl = document.getElementById('lightbox-image');
    if(hideControls) { lightboxEl.classList.add('hide-nav-arrows'); } else { lightboxEl.classList.remove('hide-nav-arrows'); }
    imgEl.src = src;
    lightboxEl.style.display = 'flex';
}

function changeLightboxImage(dir) {
    if(currentGallery.length <= 1) return;
    playClick();
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-image').src = currentGallery[currentIndex];
}

function openTextZoom(cat) {
    playClick();
    document.getElementById('text-zoom-title').innerText = CONFIG.textos[cat].t;
    document.getElementById('text-zoom-content').innerText = CONFIG.textos[cat].c;
    document.getElementById('text-zoom-modal').style.display = 'flex';
}

function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }
function closeAppContent() { document.getElementById('dynamic-content-layer').style.display = 'none'; }
function closeTextZoom() { document.getElementById('text-zoom-modal').style.display = 'none'; }
function openBrandModal(modalId) { playClick(); const modal = document.getElementById(modalId); if (modal) modal.style.display = 'flex'; }
function closeBrandModal(modalId) { const modal = document.getElementById(modalId); if (modal) modal.style.display = 'none'; }
function playClickSound() { playClick(); }

function playClick() { const snd = document.getElementById('sndFxClick'); if(snd) { snd.currentTime = 0; snd.play().catch(()=>{}); } }
function openNetworkCard(url) { playClick(); window.open(url, '_blank'); }

function abrirMenu() {
    playClick();
    document.getElementById('miMenuContacto').style.display = 'flex';
}

function cerrarMenu() {
    document.getElementById('miMenuContacto').style.display = 'none';
    document.querySelectorAll('.sucursal-panel-content').forEach(panel => panel.style.display = 'none');
}

function toggleSucursalAcordeon(sucKey) {
    playClick();
    const panel = document.getElementById(`${sucKey}-panel`);
    const estaVisible = panel.style.display === 'flex';
    document.querySelectorAll('.sucursal-panel-content').forEach(p => p.style.display = 'none');
    if (!estaVisible) {
        panel.style.display = 'flex';
    }
}

function inicializarAcordeon() {
    const contenedor = document.getElementById('contenedor-sucursales');
    if(!contenedor) return;
    contenedor.innerHTML = '';

    Object.keys(CONFIG.sucursales).forEach((key, index) => {
        const suc = CONFIG.sucursales[key];
        
        const btn = document.createElement('button');
        btn.className = 'sucursal-accordion-btn';
        btn.innerHTML = `${index + 1}. ${suc.nombre.toUpperCase()}`;
        btn.onclick = () => toggleSucursalAcordeon(key);
        
        const panel = document.createElement('div');
        panel.id = `${key}-panel`;
        panel.className = 'sucursal-panel-content';
        panel.innerHTML = `
            <div class="sucursal-info-block">
                <p class="suc-domicilio"><i class="fas fa-user-tie"></i> Ejecutivo de Ventas Digitales KIA</p>
                <p class="suc-horario"><i class="far fa-clock"></i> 9:00 AM a 8:00 PM | Atención Personalizada</p>
            </div>
            <a href="https://wa.me/${suc.wa}?text=Hola!%20Me%20interesa%20cotizar%20un%20veh%C3%ADculo%20KIA%20y%20agendar%20una%20prueba%20de%20manejo." target="_blank" class="btn-menu whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            <a href="${suc.maps}" target="_blank" class="btn-menu maps-btn"><i class="fas fa-location-arrow"></i> Cómo Llegar</a>
        `;
        
        contenedor.appendChild(btn);
        contenedor.appendChild(panel);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarAcordeon();
});

async function shareExperienceRobust() {
    try { await navigator.share({ title: 'KIA Altaria Aguascalientes', url: window.location.href }); }
    catch { playClick(); navigator.clipboard.writeText(window.location.href).then(() => { alert("¡Enlace de tarjeta copiado!"); }); }
}