
const ADMIN_USER = 'root';
const ADMIN_PASS = 'ustozjon';

let currentSection = 'teachers';
let isAdmin = false;
let pendingDeleteFn = null;
let searchQuery = '';

// ---- DOM REFS ----
const landing = document.getElementById('landing');
const landingChoices = document.getElementById('landingChoices');
const enterBtn = document.getElementById('enterBtn');
const guestBtn = document.getElementById('guestBtn');
const adminChoiceBtn = document.getElementById('adminChoiceBtn');

const adminModal = document.getElementById('adminModal');
const closeModal = document.getElementById('closeModal');
const adminUser = document.getElementById('adminUser');
const adminPass = document.getElementById('adminPass');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

const app = document.getElementById('app');
const addBtn = document.getElementById('addBtn');
const addModal = document.getElementById('addModal');
const closeAddModal = document.getElementById('closeAddModal');
const addModalTitle = document.getElementById('addModalTitle');

const teacherForm = document.getElementById('teacherForm');
const studentForm = document.getElementById('studentForm');
const announcementForm = document.getElementById('announcementForm');
const galleryForm = document.getElementById('galleryForm');

const editModal = document.getElementById('editModal');
const closeEditModal = document.getElementById('closeEditModal');
const editModalTitle = document.getElementById('editModalTitle');
const editTeacherForm = document.getElementById('editTeacherForm');
const editStudentForm = document.getElementById('editStudentForm');
const editCTForm = document.getElementById('editCTForm');

const confirmModal = document.getElementById('confirmModal');
const confirmOk = document.getElementById('confirmOk');
const confirmCancel = document.getElementById('confirmCancel');

const logoutBtn = document.getElementById('logoutBtn');
const userLabel = document.getElementById('userLabel');
const userDotEl = document.getElementById('userDotEl');
const pageTitle = document.getElementById('pageTitle');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const searchWrap = document.getElementById('searchWrap');
const searchInput = document.getElementById('searchInput');
const studentNavCount = document.getElementById('studentNavCount');
const contentArea = document.getElementById('contentArea');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');

// Student Profile Modal
const studentProfileModal = document.getElementById('studentProfileModal');
const closeStudentProfile = document.getElementById('closeStudentProfile');
const studentProfileContent = document.getElementById('studentProfileContent');

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

// Toast
const toastContainer = document.getElementById('toastContainer');

// All available career/interest options
const allCareers = [
  { id: 'sportchi', emoji: '', label: 'Sportchi' },
  { id: 'futbol', emoji: '', label: 'Futbolchi' },
  { id: 'basketbol', emoji: '', label: 'Basketbolchi' },
  { id: 'suzuvchi', emoji: '', label: 'Suzuvchi' },
  { id: 'rassom', emoji: '', label: 'Rassom' },
  { id: 'musiqa', emoji: '', label: 'Musiqachi' },
  { id: 'dasturchi', emoji: '', label: 'Dasturchi' },
  { id: 'matematik', emoji: '', label: 'Matematik' },
  { id: 'olim', emoji: '', label: 'Olim' },
  { id: 'kitobxon', emoji: '', label: 'Kitobxon' },
  { id: 'oquvchi', emoji: '', label: "Zo'r o'quvchi" },
  { id: 'hofiz', emoji: '', label: 'Hofiz' },
  { id: 'gamer', emoji: '', label: 'Gamer' },
  { id: 'aktyor', emoji: '', label: 'Aktyor' },
  { id: 'shifokor', emoji: '', label: 'Shifokor' },
  { id: 'muhandis', emoji: '', label: 'Muhandis' },
  { id: 'uchuvchi', emoji: '', label: 'Uchuvchi' },
  { id: 'oshpaz', emoji: '', label: 'Oshpaz' },
  { id: 'jurnalist', emoji: '', label: 'Jurnalist' },
  { id: 'huquqshunos', emoji: '', label: 'Huquqshunos' },
  { id: 'arxitektor', emoji: '', label: 'Arxitektor' },
  { id: 'fotograf', emoji: '', label: 'Fotograf' },
  { id: 'raqschi', emoji: '', label: 'Raqschi' },
  { id: 'biznesmen', emoji: '', label: 'Biznesmen' },
];

// Default students data
const defaultStudents = [
  { firstName: "Abdjubbarov Abdulaziz", lastName: "Anvar o'g'li", gender: "male", birthDate: "2009-09-19", interests: ["⚽ Futbolchi", "🎮 Gamer"], img: "Abdjubbarov Abdulaziz.jpg" },
  { firstName: "Abdurashitova Mubina", lastName: "Jamshid qizi", gender: "female", birthDate: "2009-07-15", interests: ["📖 Kitobxon", "🎨 Rassom"] },
  { firstName: "Abduvoitov Akromjon", lastName: "Oybek o'g'li", gender: "male", birthDate: "2009-06-21", interests: ["🏃 Sportchi", "💻 Dasturchi"], img: "Akrom.jpg" },
  { firstName: "Aminov Abdulloh", lastName: "Elmurodovich", gender: "male", birthDate: "2010-01-22", interests: ["📚 Zo'r o'quvchi", "🕌 Hofiz"], img: "Abdulloh.jpg" },
  { firstName: "Aripjonov Shukrullo", lastName: "Muzaffar o'g'li", gender: "male", birthDate: "2010-02-03", interests: ["⚽ Futbolchi", "🎵 Musiqachi"] },
  { firstName: "Erkinov Bobur", lastName: "Bahriddin o'g'li", gender: "male", birthDate: "2009-09-12", interests: ["🏀 Basketbolchi", "📐 Matematik"] },
  { firstName: "Erkinov Muhammadali", lastName: "Sherzod o'g'li", gender: "male", birthDate: "2009-09-13", interests: ["🎮 Gamer", "🔬 Olim"] },
  { firstName: "Erkinov MuhammadRo'za", lastName: "Shuxrat o'g'li", gender: "male", birthDate: "2009-05-05", interests: ["⚽ Futbolchi", "🏊 Suzuvchi"], img: "Erkinov MuhammadRo'za.jpg" },
  { firstName: "Eniyazov Dilshod", lastName: "A'zamjonovich", gender: "male", birthDate: "2009-05-29", interests: ["💻 Dasturchi", "🎵 Musiqachi"], img: "Erniyozov Dilshod.jpg" },
  { firstName: "Eshmuratov Samir", lastName: "Shodirovich", gender: "male", birthDate: "2009-12-30", interests: ["🏃 Sportchi", "📖 Kitobxon"], img: "Eshmurotov Samir.jpg" },
  { firstName: "Gafforov Kamronbek", lastName: "Laziz o'g'li", gender: "male", birthDate: "2010-04-17", interests: ["⚽ Futbolchi", "🎨 Rassom"] },
  { firstName: "Hakimova Saida", lastName: "Kazramonovna", gender: "female", birthDate: "2009-10-01", interests: ["📖 Kitobxon", "🎭 Aktyor"] },
  { firstName: "Iskandarov Fayozbek", lastName: "Toir o'g'li", gender: "male", birthDate: "2009-10-25", interests: ["💻 Dasturchi", "🎮 Gamer", "🏃 Sportchi"], img: "Iskandarov Fayozbek.jpg" },
  { firstName: "Ismoilova Robiya", lastName: "Akbar qizi", gender: "female", birthDate: "2010-07-10", interests: ["🎨 Rassom", "📚 Zo'r o'quvchi"] },
  { firstName: "Ma'murova Durdona", lastName: "Dilshod qizi", gender: "female", birthDate: "2009-11-15", interests: ["📖 Kitobxon", "🎵 Musiqachi"] },
  { firstName: "Maxamatimov Bexruzbek", lastName: "Faxrot o'g'li", gender: "male", birthDate: "2009-06-15", interests: ["🏃 Sportchi", "⚽ Futbolchi"], img: "Maxamatimov Bexruzbek.jpg" },
  { firstName: "Maxkamov Abubakr", lastName: "Bahodirjon o'g'li", gender: "male", birthDate: "2009-07-07", interests: ["📚 Zo'r o'quvchi", "🕌 Hofiz"], img: "Abu- Bakr.jpg" },
  { firstName: "Mirmuxammadiev Sardor", lastName: "Jaloliddinovich", gender: "male", birthDate: "2009-05-06", interests: ["⚽ Futbolchi", "🎮 Gamer"] },
  { firstName: "Mo'minov Ibrohim", lastName: "Orifjon o'g'li", gender: "male", birthDate: "2009-08-05", interests: ["📐 Matematik", "💻 Dasturchi"], img: "Mominov Ibrohim.jpg" },
  { firstName: "Murotov Diyorbek", lastName: "Azizjon o'g'li", gender: "male", birthDate: "2015-04-07", interests: ["⚽ Futbolchi", "🎵 Musiqachi"] },
  { firstName: "Namozboyev Sevinch", lastName: "Isroil o'g'li", gender: "female", birthDate: "2009-07-15", interests: ["🏃 Sportchi", "🔬 Olim"], img: "Sevinch.jpg" },
  { firstName: "Nosirov Firdavs", lastName: "Mansur o'g'li", gender: "male", birthDate: "2009-07-29", interests: ["💻 Dasturchi", "📐 Matematik"] },
  { firstName: "Nosirova Shaxrizoda", lastName: "Fayoziddin qizi", gender: "female", birthDate: "2009-08-01", interests: ["🎨 Rassom", "📖 Kitobxon"], img: "Nosirova Shaxrizoda.jpg" },
  { firstName: "Obidova Jamila", lastName: "Xolmurod qizi", gender: "female", birthDate: "2009-12-12", interests: ["🎭 Aktyor", "🎵 Musiqachi"] },
  { firstName: "Otaqulova Orastagul", lastName: "Olim qizi", gender: "female", birthDate: "2009-07-25", interests: ["📚 Zo'r o'quvchi", "🎨 Rassom"], img: "Otaqulova Orastagul.jpg" },
  { firstName: "Qambaraliyev Diyorbek", lastName: "Mirzohid o'g'li", gender: "male", birthDate: "2009-04-04", interests: ["⚽ Futbolchi", "🏃 Sportchi"], img: "Diyor Qambaraliev.jpg" },
  { firstName: "Qurbonmurodova Malika", lastName: "Ikromovna", gender: "female", birthDate: "2009-06-13", interests: ["📖 Kitobxon", "🎵 Musiqachi"] },
  { firstName: "Qutbiyev Shoxtemur", lastName: "Zikridin o'g'li", gender: "male", birthDate: "2009-05-15", interests: ["🏃 Sportchi", "🎮 Gamer"], img: "Qutbiyev Shoxtemur.jpg" },
  { firstName: "Rajabov Komron", lastName: "Ahadovich", gender: "male", birthDate: "2010-03-26", interests: ["⚽ Futbolchi", "💻 Dasturchi"], img: "Rajabov Kamron.jpg" },
  { firstName: "Rustamova Durdona", lastName: "Ruslanovna", gender: "female", birthDate: "2010-08-01", interests: ["🎨 Rassom", "📚 Zo'r o'quvchi"] },
  { firstName: "Rustamova Ruxsora", lastName: "Ruslanovna", gender: "female", birthDate: "2010-06-10", interests: ["📖 Kitobxon", "🎭 Aktyor"] },
  { firstName: "Sobirov Sardor", lastName: "Sherzod o'g'li", gender: "male", birthDate: "2009-12-19", interests: ["🏃 Sportchi", "📐 Matematik"], img: "Sobirov Sardor.jpg" },
  { firstName: "Sotvoldiyeva Manzura", lastName: "", gender: "female", birthDate: "2009-06-03", interests: ["🎵 Musiqachi", "📖 Kitobxon"], img: "Manzura.jpg" },
  { firstName: "Toychiyeva Sultonoy", lastName: "Murodjon qizi", gender: "female", birthDate: "2009-06-18", interests: ["🎨 Rassom", "🎭 Aktyor"] },
  { firstName: "Turdiyeva Xomiya", lastName: "Baxtiyor qizi", gender: "female", birthDate: "2009-05-01", interests: ["📚 Zo'r o'quvchi", "🎵 Musiqachi"] },
  { firstName: "Tursatov Shaxzod", lastName: "Xakimovich", gender: "male", birthDate: "2009-02-01", interests: ["💻 Dasturchi", "🎮 Gamer"] },
  { firstName: "Xamitboyev Saloxiddin", lastName: "Sunnatilla o'g'li", gender: "male", birthDate: "2010-06-24", interests: ["⚽ Futbolchi", "🏃 Sportchi"] },
  { firstName: "Shaydullayeva Latofat", lastName: "Muzaffar qizi", gender: "female", birthDate: "2010-03-30", interests: ["📖 Kitobxon", "🎨 Rassom"], img: "Shaydullayeva Latofat.JPG" },
  { firstName: "Shodiyeva Muxlisa", lastName: "Shuxratovna", gender: "female", birthDate: "2009-09-21", interests: ["🎵 Musiqachi", "📚 Zo'r o'quvchi"], img: "Shodiyeva Muxlisa.jpg" },
  { firstName: "Shokirova Madina", lastName: "Sheromon qizi", gender: "female", birthDate: "2010-02-25", interests: ["🎭 Aktyor", "🎨 Rassom"], img: "Shokirova Madina.jpg" },
  { firstName: "Axrorov O'zodbek", lastName: "Asqar o'g'li", gender: "male", birthDate: "2009-10-28", interests: ["🏃 Sportchi", "💻 Dasturchi"] },
  { firstName: "Azamatova Nargiza", lastName: "Xusniddin qizi", gender: "female", birthDate: "2009-04-02", interests: ["📖 Kitobxon", "🔬 Olim"] },
  { firstName: "Ximmatova Feruzabonu", lastName: "Muxtor qizi", gender: "female", birthDate: "2009-11-12", interests: ["🎵 Musiqachi", "🎨 Rassom"], img: "Feruza.jpg" },
  { firstName: "Dilnura", lastName: "", gender: "female", birthDate: "2009-06-13", interests: ["Tilshunos"], img: "Dilnura.jpg" }
];

// Default teachers data
const defaultTeachers = [
  { firstName: "Qoryog'diyeva Dilobar", lastName: "Qoryog'diyevna", subject: "Informatika" },
  { firstName: "Janikulova Farida", lastName: "Ismatovna", subject: "Rus tili" },
  { firstName: "Jumaboyeva Muxlisa", lastName: "Madrum qizi", subject: "Geografiya" },
  { firstName: "Xatamova Sayorabonu", lastName: "Baxtiyerovna", subject: "Fizika" },
  { firstName: "Xojamkulova Nargiza", lastName: "Bahodirovna", subject: "Tarix, Tarbiya" },
  { firstName: "Keldiyerov Sanjar", lastName: "Sobirjonovich", subject: "Jismoniy Tarbiya" },
  { firstName: "Jumanazarova Guzaljon", lastName: "Shavkatovna", subject: "Informatika" },
  { firstName: "Ismoilova Dinora", lastName: "Yusupovna", subject: "Rus tili" },
  { firstName: "Kayumova Madinaxon", lastName: "Muxtorjonovna", subject: "Kimyo" },
  { firstName: "Bekmurzayeva Nilufar", lastName: "Abduraimovna", subject: "Algebra, Geografiya" },
  { firstName: "Ungboyeva Omongul", lastName: "Xalilovna", subject: "Ona tili, Adabiyot" },
  { firstName: "Xusanov Shuxrat", lastName: "Sabitxanovich", subject: "Jismoniy Tarbiya" },
  { firstName: "Mansurova Zilola", lastName: "Akramxanovna", subject: "Huquq" },
  { firstName: "Xalilova Gulnora", lastName: "Naimjonovna", subject: "Biologiya" },
  { firstName: "Xamidullayeva Muxlisa", lastName: "Bahodirovna", subject: "Ingliz tili" },
  { firstName: "Xojiyeva Mubina", lastName: "Ulug'bekovna", subject: "Ingliz tili" }
];

// Default schedule
const defaultSchedule = [
  ["1 (8:00)", "Matematika", "Ingliz tili", "Fizika", "Ona tili", "Kimyo", "Biologiya"],
  ["2 (8:50)", "Ona tili", "Matematika", "Ingliz tili", "Tarix", "Fizika", "Informatika"],
  ["3 (9:40)", "Tarix", "Fizika", "Matematika", "Ingliz tili", "Adabiyot", "Chaqiriq"],
  ["4 (10:40)", "Kimyo", "Biologiya", "Tarix", "Matematika", "Informatika", "Jismoniy tarbiya"],
  ["5 (11:30)", "Ingliz tili", "Ona tili", "Adabiyot", "Jismoniy tarbiya", "Matematika", "Tarix"],
  ["6 (12:20)", "Jismoniy tarbiya", "Adabiyot", "Kimyo", "Biologiya", "Ona tili", "Geografiya"],
  ["7 (13:10)", "—", "—", "Geografiya", "—", "—", "—"]
];

// o'quvchilar rasmlari
const students = [
  { name: "Abdjubbarov Abdulaziz", img: "img/Abdjubbarov Abdulaziz.jpg", sinf: "10-A" },
  { name: "Aminov Abdulloh", img: "img/Abdulloh.jpg", sinf: "10-A" },
  { name: "Maxkamov Abubakr", img: "img/Abu- Bakr.jpg", sinf: "10-A" },
  { name: "Abduvoitov Akromjon", img: "img/Akrom.jpg", sinf: "10-A" },
  { name: "Dilnura", img: "img/Dilnura.jpg", sinf: "10-A" },
  { name: "Qambaraliyev Diyorbek", img: "img/Diyor Qambaraliev.jpg", sinf: "10-A" },
  { name: "Erkinov MuhammadRo'za", img: "img/Erkinov MuhammadRo'za.jpg", sinf: "10-A" },
  { name: "Eniyazov Dilshod", img: "img/Erniyozov Dilshod.jpg", sinf: "10-A" },
  { name: "Eshmuratov Samir", img: "img/Eshmurotov Samir.jpg", sinf: "10-A" },
  { name: "Ximmatova Feruzabonu", img: "img/Feruza.jpg", sinf: "10-A" },
  { name: "Sotvoldiyeva Manzura", img: "img/Manzura.jpg", sinf: "10-A" },
  { name: "Maxamatimov Bexruzbek", img: "img/Maxamatimov Bexruzbek.jpg", sinf: "10-A" },
  { name: "Mo'minov Ibrohim", img: "img/Mominov Ibrohim.jpg", sinf: "10-A" },
  { name: "Nosirova Shaxrizoda", img: "img/Nosirova Shaxrizoda.jpg", sinf: "10-A" },
  { name: "Otaqulova Orastagul", img: "img/Otaqulova Orastagul.jpg", sinf: "10-A" },
  { name: "Qutbiyev Shoxtemur", img: "img/Qutbiyev Shoxtemur.jpg", sinf: "10-A" },
  { name: "Rajabov Komron", img: "img/Rajabov Kamron.jpg", sinf: "10-A" },
  { name: "Namozboyev Sevinch", img: "img/Sevinch.jpg", sinf: "10-A" },
  { name: "Shaydullayeva Latofat", img: "img/Shaydullayeva Latofat.JPG", sinf: "10-A" },
  { name: "Shodiyeva Muxlisa", img: "img/Shodiyeva Muxlisa.jpg", sinf: "10-A" },
  { name: "Shokirova Madina", img: "img/Shokirova Madina.jpg", sinf: "10-A" },
  { name: "Sobirov Sardor", img: "img/Sobirov Sardor.jpg", sinf: "10-A" }
];

// Uzbek month names for formatting
const uzMonths = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktyabr', 'noyabr', 'dekabr'];

// Default 3 announcements (admin o'z rasm/videosini qo'yib chiqadi)
const defaultAnnouncements = [
  {
    title: "Sinf yangiliklari",
    desc: "10A sinf o'quvchichisi Shodiyeva Muxlisa Sertifikat oldi.",
    img: "Shodiyeva Muxlisa_sertificate.jpg",
    video: "",
    date: new Date().toISOString()
  },
  {
    title: "Sinf yangiliklari",
    desc: "10A sinf o'quvchisi Mirmuxammadiev Sardor Sertifikat oldi.",
    img: "Mirmuxammadiev Sardor_IElTS.jpg",
    video: "",
    date: new Date().toISOString()
  },
  {
    title: "Sinf yangiliklari",
    desc: "Mirmuxammadiev Sardor intervyusi.",
    img: "",
    video: "Mirmuxammadiev Sardor_interviuv.mp4",
    date: new Date().toISOString()
  }
];

// ---- STORAGE HELPERS ----
function load(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
}
function loadObj(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
}
function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function loadRole() { return localStorage.getItem('role'); }
function saveRole(role) { localStorage.setItem('role', role); }
function clearRole() { localStorage.removeItem('role'); }

// ---- AGE & DATE HELPERS ----
function calcAge(birthDateStr) {
  if (!birthDateStr) return null;
  const birth = new Date(birthDateStr);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }
  if (now.getDate() < birth.getDate()) months--;
  if (months < 0) months += 12;
  return { years, months };
}

function isBirthdayToday(birthDateStr) {
  if (!birthDateStr) return false;
  const birth = new Date(birthDateStr);
  const now = new Date();
  return birth.getMonth() === now.getMonth() && birth.getDate() === now.getDate();
}

function formatBirthDate(birthDateStr) {
  if (!birthDateStr) return '';
  const d = new Date(birthDateStr);
  const day = d.getDate();
  const month = uzMonths[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

// ---- TOAST SYSTEM ----
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const iconPaths = {
    success: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    error: '<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    info: '<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
  };
  toast.innerHTML = `
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        ${iconPaths[type] || iconPaths.info}
      </svg>
    </div>
    <span class="toast-message">${message}</span>
    <div class="toast-progress"></div>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- PARTICLE SYSTEM ----
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
      this.growing = Math.random() > 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.growing) {
        this.opacity += this.fadeSpeed;
        if (this.opacity >= 0.6) this.growing = false;
      } else {
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0.05) this.growing = true;
      }
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    animFrame = requestAnimationFrame(animate);
  }
  animate();

  // Cleanup when landing is hidden
  return () => {
    cancelAnimationFrame(animFrame);
  };
}

let stopParticles = null;

// ---- LIGHTBOX ----
function openLightbox(imgSrc, caption = '') {
  if (!imgSrc) return;
  lightboxImg.src = imgSrc;
  lightboxCaption.textContent = caption;
  lightbox.classList.remove('hidden');
  lightbox.classList.remove('closing');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('closing');
  setTimeout(() => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('closing');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }, 250);
}

lightboxClose.addEventListener('click', (e) => {
  e.stopPropagation();
  closeLightbox();
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
    closeLightbox();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
    closeLightbox();
  }
});

// ---- DARK MODE ----
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

// ---- BACK TO TOP ----
contentArea.addEventListener('scroll', () => {
  if (contentArea.scrollTop > 300) {
    backToTop.classList.remove('hidden');
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.add('hidden');
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  contentArea.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- SEED DATA ----
function seedStudents() {
  const existing = load('students');
  if (!existing || existing.length === 0) {
    save('students', defaultStudents.map(s => ({
      id: Date.now() + Math.random(),
      ...s
    })));
  } else {
    // BUG FIX: Sync images from the hardcoded students list to existing storage
    let changed = false;
    const updated = existing.map(item => {
      const match = students.find(s => s.name === item.firstName);
      // Only update if it doesn't have an image OR has a broken default path
      if (match && (!item.img || item.img.startsWith('image/'))) {
        item.img = match.img;
        changed = true;
      }
      return item;
    });
    if (changed) save('students', updated);
  }
}

function seedAnnouncements() {
  const existing = load('announcements');
  if (!existing || existing.length === 0) {
    save('announcements', defaultAnnouncements.map((a, i) => ({
      id: Date.now() + i,
      ...a
    })));
  }
}

function seedTeachers() {
  const existing = load('teachers');
  if (!existing || existing.length === 0) {
    save('teachers', defaultTeachers.map((t, i) => ({
      id: Date.now() + i + Math.random(),
      ...t
    })));
  } else {
    // Make sure Dilobar Qoryog'diyevna is at position 0
    const dilobarExists = existing.some(t =>
      t.firstName && t.firstName.toLowerCase().includes("qoryog'diyeva")
    );
    if (!dilobarExists) {
      const dilobar = { id: Date.now() - 9999, ...defaultTeachers[0] };
      existing.unshift(dilobar);
      save('teachers', existing);
    }
  }
}

// ---- INIT ----
function init() {
  initTheme();
  seedStudents();
  seedTeachers();
  seedAnnouncements();
  stopParticles = initParticles();

  const role = loadRole();
  if (role === 'admin') {
    isAdmin = true;
    enterApp();
  }
}

// ---- LANDING ----
enterBtn.addEventListener('click', () => {
  landingChoices.style.display = 'flex';
  enterBtn.style.display = 'none';
});
guestBtn.addEventListener('click', () => { isAdmin = false; enterApp(); });
adminChoiceBtn.addEventListener('click', () => {
  adminModal.classList.remove('hidden');
  adminUser.focus();
});
closeModal.addEventListener('click', () => { adminModal.classList.add('hidden'); clearLoginForm(); });
adminModal.addEventListener('click', (e) => {
  if (e.target === adminModal) { adminModal.classList.add('hidden'); clearLoginForm(); }
});

function clearLoginForm() {
  adminUser.value = ''; adminPass.value = '';
  loginError.classList.add('hidden');
}

loginBtn.addEventListener('click', handleLogin);
adminPass.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLogin(); });
adminUser.addEventListener('keydown', (e) => { if (e.key === 'Enter') adminPass.focus(); });

function handleLogin() {
  const u = adminUser.value.trim();
  const p = adminPass.value.trim();
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    isAdmin = true; saveRole('admin');
    adminModal.classList.add('hidden'); clearLoginForm(); enterApp();
    showToast("Admin sifatida kirdingiz!", 'success');
  } else {
    loginError.classList.remove('hidden');
    adminPass.value = ''; adminPass.focus();
    const box = adminModal.querySelector('.modal-box');
    box.style.animation = 'none'; box.offsetHeight;
    box.style.animation = 'shake 0.4s ease';
  }
}

function enterApp() {
  landing.style.opacity = '0';
  landing.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  landing.style.transform = 'scale(1.05)';
  setTimeout(() => {
    landing.classList.add('hidden');
    if (stopParticles) stopParticles();
    app.classList.remove('hidden');
    app.style.opacity = '0';
    app.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { app.style.opacity = '1'; }, 30);
    updateUserUI(); renderAll(); navigateTo('teachers');
  }, 550);
}

function updateUserUI() {
  if (isAdmin) {
    userLabel.textContent = 'Admin';
    userDotEl.className = 'user-dot admin';
    logoutBtn.classList.remove('hidden');
    addBtn.classList.remove('hidden');
    document.getElementById('ctEditBtn').classList.remove('hidden');
    document.getElementById('ctEditBtn').classList.add('ct-edit-visible');
  } else {
    userLabel.textContent = 'Mehmon';
    userDotEl.className = 'user-dot guest';
    logoutBtn.classList.add('hidden');
    addBtn.classList.add('hidden');
    document.getElementById('ctEditBtn').classList.add('hidden');
  }
}

// ---- LOGOUT ----
logoutBtn.addEventListener('click', () => {
  isAdmin = false; clearRole();
  app.classList.add('hidden');
  landing.classList.remove('hidden');
  landing.style.opacity = '1'; landing.style.transform = 'scale(1)';
  enterBtn.style.display = ''; landingChoices.style.display = 'none';
  stopParticles = initParticles();
  renderAll();
  showToast("Tizimdan chiqdingiz", 'info');
});

// ---- NAVIGATION ----
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(item.dataset.section);
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
      document.querySelector('.sidebar-overlay')?.classList.remove('visible');
    }
  });
});

const sectionTitles = {
  teachers: "Ustozlar",
  students: "O'quvchilar",
  announcements: "E'lonlar",
  gallery: "Galereya",
  schedule: "Dars jadvali",
  comments: "Izohlar"
};

function navigateTo(section) {
  currentSection = section;
  pageTitle.textContent = sectionTitles[section];
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.section === section);
  });
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const sectionEl = document.getElementById(`section-${section}`);
  if (sectionEl) sectionEl.classList.add('active');

  if (section === 'students') {
    searchWrap.classList.remove('hidden');
    searchInput.value = ''; searchQuery = '';
  } else {
    searchWrap.classList.add('hidden');
  }

  // Show/hide add btn based on section
  if (isAdmin && ['teachers', 'students', 'announcements', 'gallery'].includes(section)) {
    addBtn.classList.remove('hidden');
  } else {
    addBtn.classList.add('hidden');
  }
  renderSection(section);
  // Scroll to top of content
  contentArea.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- MOBILE SIDEBAR ----
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open'); overlay.classList.toggle('visible');
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open'); overlay.classList.remove('visible');
});

// ---- SEARCH ----
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.toLowerCase().trim();
  renderStudents();
});

// ---- ADD BUTTON ----
addBtn.addEventListener('click', () => { openAddModal(currentSection); });

function openAddModal(type) {
  const titles = {
    teachers: "Ustoz qo'shish",
    students: "O'quvchi qo'shish",
    announcements: "E'lon qo'shish",
    gallery: "Rasm qo'shish"
  };
  addModalTitle.textContent = titles[type] || "Qo'shish";

  teacherForm.classList.add('hidden');
  studentForm.classList.add('hidden');
  announcementForm.classList.add('hidden');
  galleryForm.classList.add('hidden');

  // Reset forms
  teacherForm.reset(); studentForm.reset(); announcementForm.reset(); galleryForm.reset();
  resetPreviews(['tImgPreview', 'sImgPreview', 'aImgPreview', 'gImgPreview'],
    ['tImgPlaceholder', 'sImgPlaceholder', 'aImgPlaceholder', 'gImgPlaceholder']);

  if (type === 'teachers') teacherForm.classList.remove('hidden');
  else if (type === 'students') studentForm.classList.remove('hidden');
  else if (type === 'gallery') galleryForm.classList.remove('hidden');
  else announcementForm.classList.remove('hidden');

  addModal.classList.remove('hidden');
}

function resetPreviews(previewIds, placeholderIds) {
  previewIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  placeholderIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = '';
  });
}

closeAddModal.addEventListener('click', () => addModal.classList.add('hidden'));
addModal.addEventListener('click', (e) => { if (e.target === addModal) addModal.classList.add('hidden'); });

// ---- FILE UPLOAD HELPERS ----
function setupFileUpload(inputId, previewId, placeholderId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  const placeholder = document.getElementById(placeholderId);
  if (!input) return;
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        preview.classList.remove('hidden');
        placeholder.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  });
}

setupFileUpload('tImg', 'tImgPreview', 'tImgPlaceholder');
setupFileUpload('sImg', 'sImgPreview', 'sImgPlaceholder');
setupFileUpload('aImg', 'aImgPreview', 'aImgPlaceholder');
setupFileUpload('gImg', 'gImgPreview', 'gImgPlaceholder');
setupFileUpload('etImg', 'etImgPreview', 'etImgPlaceholder');
setupFileUpload('esImg', 'esImgPreview', 'esImgPlaceholder');
setupFileUpload('ctImg', 'ctImgPreview', 'ctImgPlaceholder');

// ---- TEACHER FORM ----
teacherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName = document.getElementById('tFirstName').value.trim();
  const lastName = document.getElementById('tLastName').value.trim();
  const subject = document.getElementById('tSubject').value.trim();
  if (!firstName || !lastName || !subject) {
    showFormError(teacherForm, "Barcha maydonlarni to'ldiring"); return;
  }
  const imgFile = document.getElementById('tImg').files[0];
  if (imgFile) {
    readFileAsDataURL(imgFile, (imgData) => addTeacher({ firstName, lastName, subject, img: imgData }));
  } else {
    addTeacher({ firstName, lastName, subject, img: null });
  }
});

function addTeacher(data) {
  const teachers = load('teachers');
  teachers.unshift({ id: Date.now(), ...data });
  save('teachers', teachers);
  addModal.classList.add('hidden');
  renderTeachers();
  showToast("Ustoz muvaffaqiyatli qo'shildi!", 'success');
}

// ---- STUDENT FORM ----
studentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName = document.getElementById('sFirstName').value.trim();
  const lastName = document.getElementById('sLastName').value.trim();
  const birthDate = document.getElementById('sBirthDate').value;
  const gender = document.getElementById('sGender').value;
  if (!firstName || !lastName) {
    showFormError(studentForm, "Ism va familiyani kiriting"); return;
  }
  const imgFile = document.getElementById('sImg').files[0];
  if (imgFile) {
    readFileAsDataURL(imgFile, (imgData) => addStudent({ firstName, lastName, birthDate, gender, img: imgData, interests: [] }));
  } else {
    addStudent({ firstName, lastName, birthDate, gender, img: null, interests: [] });
  }
});

function addStudent(data) {
  const students = load('students');
  students.unshift({ id: Date.now(), ...data });
  save('students', students);
  addModal.classList.add('hidden');
  renderStudents();
  showToast("O'quvchi muvaffaqiyatli qo'shildi!", 'success');
}

// ---- ANNOUNCEMENT FORM ----
// Tab switching
document.getElementById('tabImg').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('tabVideo').classList.remove('active');
  document.getElementById('imgUploadGroup').classList.remove('hidden');
  document.getElementById('videoUrlGroup').classList.add('hidden');
});
document.getElementById('tabVideo').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('tabImg').classList.remove('active');
  document.getElementById('videoUrlGroup').classList.remove('hidden');
  document.getElementById('imgUploadGroup').classList.add('hidden');
});

announcementForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('aTitle').value.trim();
  const desc = document.getElementById('aDesc').value.trim();
  if (!title || !desc) {
    showFormError(announcementForm, "Sarlavha va matnni kiriting"); return;
  }
  const videoUrl = document.getElementById('aVideo').value.trim();
  if (videoUrl) {
    addAnnouncement({ title, desc, img: null, video: videoUrl });
    return;
  }
  const imgFile = document.getElementById('aImg').files[0];
  if (imgFile) {
    readFileAsDataURL(imgFile, (imgData) => addAnnouncement({ title, desc, img: imgData, video: '' }));
  } else {
    addAnnouncement({ title, desc, img: null, video: '' });
  }
});

function addAnnouncement(data) {
  const anns = load('announcements');
  anns.unshift({ id: Date.now(), date: new Date().toISOString(), ...data });
  save('announcements', anns);
  addModal.classList.add('hidden');
  renderAnnouncements();
  showToast("E'lon muvaffaqiyatli qo'shildi!", 'success');
}

// ---- GALLERY FORM ----
galleryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('gTitle').value.trim();
  const imgFile = document.getElementById('gImg').files[0];
  if (!imgFile) {
    showFormError(galleryForm, "Rasm tanlang"); return;
  }
  readFileAsDataURL(imgFile, (imgData) => {
    const gallery = load('gallery');
    gallery.unshift({ id: Date.now(), title: title || 'Rasm', img: imgData, date: new Date().toISOString() });
    save('gallery', gallery);
    addModal.classList.add('hidden');
    renderGallery();
    showToast("Rasm gallereyaga qo'shildi!", 'success');
  });
});

// ---- EDIT MODAL ----
closeEditModal.addEventListener('click', () => editModal.classList.add('hidden'));
editModal.addEventListener('click', (e) => { if (e.target === editModal) editModal.classList.add('hidden'); });

function openEditTeacher(id) {
  const teachers = load('teachers');
  const t = teachers.find(x => x.id === id);
  if (!t) return;
  editModalTitle.textContent = "Ustoz tahrirlash";
  editTeacherForm.classList.remove('hidden');
  editStudentForm.classList.add('hidden');
  editCTForm.classList.add('hidden');
  document.getElementById('etId').value = t.id;
  document.getElementById('etFirstName').value = t.firstName;
  document.getElementById('etLastName').value = t.lastName;
  document.getElementById('etSubject').value = t.subject;
  const preview = document.getElementById('etImgPreview');
  const placeholder = document.getElementById('etImgPlaceholder');
  if (t.img) { preview.src = t.img; preview.classList.remove('hidden'); placeholder.style.display = 'none'; }
  else { preview.classList.add('hidden'); placeholder.style.display = ''; }
  editModal.classList.remove('hidden');
}

function openEditStudent(id) {
  const students = load('students');
  const s = students.find(x => x.id === id);
  if (!s) return;
  editModalTitle.textContent = "O'quvchi tahrirlash";
  editStudentForm.classList.remove('hidden');
  editTeacherForm.classList.add('hidden');
  editCTForm.classList.add('hidden');
  document.getElementById('esId').value = s.id;
  document.getElementById('esFirstName').value = s.firstName;
  document.getElementById('esLastName').value = s.lastName;
  document.getElementById('esBirthDate').value = s.birthDate || '';
  document.getElementById('esGender').value = s.gender || '';
  const preview = document.getElementById('esImgPreview');
  const placeholder = document.getElementById('esImgPlaceholder');
  if (s.img) { preview.src = s.img; preview.classList.remove('hidden'); placeholder.style.display = 'none'; }
  else { preview.classList.add('hidden'); placeholder.style.display = ''; }
  editModal.classList.remove('hidden');
}

editTeacherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById('etId').value);
  const firstName = document.getElementById('etFirstName').value.trim();
  const lastName = document.getElementById('etLastName').value.trim();
  const subject = document.getElementById('etSubject').value.trim();
  if (!firstName || !lastName || !subject) {
    showFormError(editTeacherForm, "Barcha maydonlarni to'ldiring"); return;
  }
  const imgFile = document.getElementById('etImg').files[0];
  if (imgFile) {
    readFileAsDataURL(imgFile, (imgData) => saveTeacherEdit(id, { firstName, lastName, subject, img: imgData }));
  } else {
    const teachers = load('teachers');
    const existing = teachers.find(t => t.id === id);
    saveTeacherEdit(id, { firstName, lastName, subject, img: existing?.img || null });
  }
});

function saveTeacherEdit(id, data) {
  let teachers = load('teachers');
  teachers = teachers.map(t => t.id === id ? { ...t, ...data } : t);
  save('teachers', teachers);
  editModal.classList.add('hidden');
  renderTeachers();
  showToast("Ustoz ma'lumotlari yangilandi", 'success');
}

editStudentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById('esId').value);
  const firstName = document.getElementById('esFirstName').value.trim();
  const lastName = document.getElementById('esLastName').value.trim();
  const birthDate = document.getElementById('esBirthDate').value;
  const gender = document.getElementById('esGender').value;
  if (!firstName || !lastName) {
    showFormError(editStudentForm, "Ism va familiyani kiriting"); return;
  }
  const imgFile = document.getElementById('esImg').files[0];
  if (imgFile) {
    readFileAsDataURL(imgFile, (imgData) => saveStudentEdit(id, { firstName, lastName, birthDate, gender, img: imgData }));
  } else {
    const students = load('students');
    const existing = students.find(s => s.id === id);
    saveStudentEdit(id, { firstName, lastName, birthDate, gender, img: existing?.img || null });
  }
});

function saveStudentEdit(id, data) {
  let students = load('students');
  students = students.map(s => s.id === id ? { ...s, ...data } : s);
  save('students', students);
  editModal.classList.add('hidden');
  renderStudents();
  showToast("O'quvchi ma'lumotlari yangilandi", 'success');
}

// ---- CLASS TEACHER ----
const ctEditBtn = document.getElementById('ctEditBtn');
ctEditBtn.addEventListener('click', openEditCT);

function openEditCT() {
  const ct = loadObj('classTeacher');
  editModalTitle.textContent = "Sinf Rahbarini tahrirlash";
  editCTForm.classList.remove('hidden');
  editTeacherForm.classList.add('hidden');
  editStudentForm.classList.add('hidden');
  document.getElementById('ctFirstName').value = ct.firstName || '';
  document.getElementById('ctLastName').value = ct.lastName || '';
  document.getElementById('ctSubjectInput').value = ct.subject || '';
  const preview = document.getElementById('ctImgPreview');
  const placeholder = document.getElementById('ctImgPlaceholder');
  if (ct.img) { preview.src = ct.img; preview.classList.remove('hidden'); placeholder.style.display = 'none'; }
  else { preview.classList.add('hidden'); placeholder.style.display = ''; }
  editModal.classList.remove('hidden');
}

editCTForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName = document.getElementById('ctFirstName').value.trim();
  const lastName = document.getElementById('ctLastName').value.trim();
  const subject = document.getElementById('ctSubjectInput').value.trim();
  const imgFile = document.getElementById('ctImg').files[0];
  if (imgFile) {
    readFileAsDataURL(imgFile, (imgData) => saveCT({ firstName, lastName, subject, img: imgData }));
  } else {
    const existing = loadObj('classTeacher');
    saveCT({ firstName, lastName, subject, img: existing.img || null });
  }
});

function saveCT(data) {
  save('classTeacher', data);
  editModal.classList.add('hidden');
  renderClassTeacher();
  showToast("Sinf rahbari ma'lumotlari yangilandi", 'success');
}

function renderClassTeacher() {
  const ct = loadObj('classTeacher');
  const hero = document.getElementById('classTeacherHero');
  const ctName = document.getElementById('ctName');
  const ctSubject = document.getElementById('ctSubject');
  const ctSubjectText = document.getElementById('ctSubjectText');
  const ctAvatar = document.getElementById('ctAvatar');

  hero.classList.remove('hidden');

  if (ct.firstName) {
    ctName.textContent = `${ct.firstName || ''} ${ct.lastName || ''}`.trim();
    if (ctSubjectText) ctSubjectText.textContent = ct.subject || 'Ustoz';
    if (ctSubject) ctSubject.style.display = ct.subject ? '' : 'none';
  } else {
    ctName.textContent = 'Nurmatova Dilobar';
    if (ctSubjectText) ctSubjectText.textContent = 'Informatika';
    if (ctSubject) ctSubject.style.display = '';
  }

  if (ct.img) {
    ctAvatar.innerHTML = `<img src="${ct.img}" alt="Sinf rahbari" style="width:100%;height:100%;object-fit:cover;" />`;
    ctAvatar.style.cursor = 'zoom-in';
    ctAvatar.onclick = () => openLightbox(ct.img, `${ct.firstName || ''} ${ct.lastName || ''} — Sinf rahbari`);
  } else {
    // Default: Nurmatova Dilobar rasmini ishlatamiz
    const defaultImg = 'Nurmatova Dilobar.jpg';
    ctAvatar.innerHTML = `
      <img src="${defaultImg}" alt="Sinf rahbari"
        style="width:100%;height:100%;object-fit:cover;"
        onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';" />
      <div class="ct-avatar-placeholder" style="display:none;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
        </svg>
        <span class="ct-img-hint">Rasm qo'shing</span>
      </div>`;
    ctAvatar.style.cursor = 'zoom-in';
    ctAvatar.onclick = () => openLightbox(defaultImg, `${ct.firstName || 'Nurmatova Dilobar'} — Sinf rahbari`);
  }
}

// ---- STUDENT PROFILE MODAL ----
closeStudentProfile.addEventListener('click', () => {
  studentProfileModal.classList.add('hidden');
});
studentProfileModal.addEventListener('click', (e) => {
  if (e.target === studentProfileModal) studentProfileModal.classList.add('hidden');
});

function openStudentProfile(studentId) {
  const students = load('students');
  const student = students.find(s => s.id === studentId);
  if (!student) return;

  const name = `${student.firstName} ${student.lastName}`.trim();
  const age = calcAge(student.birthDate);
  const birthStr = formatBirthDate(student.birthDate);
  const isBirthday = isBirthdayToday(student.birthDate);
  const genderLabel = student.gender === 'male' ? "O'g'il bola" : student.gender === 'female' ? "Qiz bola" : "—";
  const genderIcon = student.gender === 'male' ? '♂' : student.gender === 'female' ? '♀' : '';
  const genderClass = student.gender || '';

  // Build interests/careers tags
  const interests = student.interests || [];
  const interestTags = interests.map(i => `<span class="sp-interest-tag">${i}</span>`).join('');

  // Avatar section
  const avatarHTML = student.img
    ? `<img src="${student.img}" alt="${name}" class="sp-avatar-img" />`
    : `<div class="sp-avatar-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
        </svg>
       </div>`;

  const birthdayHTML = isBirthday ? `<div class="sp-birthday-banner">🎂 Bugun tug'ilgan kuni! Tabriklaymiz!</div>` : '';

  studentProfileContent.innerHTML = `
    <div class="sp-hero ${genderClass}">
      <div class="sp-hero-glow"></div>
      ${birthdayHTML}
      <div class="sp-avatar-wrap">
        <div class="sp-avatar" ${student.img ? `onclick="openLightbox('${student.img}','${name}')"` : ''}>
          ${avatarHTML}
        </div>
        <div class="sp-avatar-ring"></div>
        <div class="sp-avatar-ring sp-ring-2"></div>
      </div>
      <div class="sp-gender-badge ${genderClass}">
        <span>${genderIcon}</span> ${genderLabel}
      </div>
      <h2 class="sp-name">${name}</h2>
      <p class="sp-class-info">161-Maktab • 10A Sinf</p>
    </div>
    
    <div class="sp-info-grid">
      <div class="sp-info-card">
        <div class="sp-info-icon">🎂</div>
        <div class="sp-info-data">
          <span class="sp-info-label">Tug'ilgan sana</span>
          <span class="sp-info-value">${birthStr || '—'}</span>
        </div>
      </div>
      <div class="sp-info-card">
        <div class="sp-info-icon">📅</div>
        <div class="sp-info-data">
          <span class="sp-info-label">Yoshi</span>
          <span class="sp-info-value">${age ? age.years + ' yosh' + (age.months > 0 ? ' ' + age.months + ' oy' : '') : '—'}</span>
        </div>
      </div>
    </div>

    <div class="sp-section">
      <h3 class="sp-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
          <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z"/>
        </svg>
        Qiziqishlari va Kasblari
      </h3>
      <div class="sp-interests-wrap">
        ${interestTags || '<span class="sp-no-interests">Hali belgilanmagan</span>'}
      </div>
    </div>

    <div class="sp-section">
      <h3 class="sp-section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
        </svg>
        Kasblarni tanlash
      </h3>
      <div class="sp-careers-grid" id="spCareersGrid" data-student-id="${student.id}">
        ${allCareers.map(c => {
    const isActive = interests.some(i => i.includes(c.label));
    return `<button class="sp-career-btn ${isActive ? 'active' : ''}" data-career-id="${c.id}" data-emoji="${c.emoji}" data-label="${c.label}">
            <span class="sp-career-emoji">${c.emoji}</span>
            <span class="sp-career-label">${c.label}</span>
          </button>`;
  }).join('')}
      </div>
    </div>
  `;

  // Attach career toggle listeners
  const careersGrid = document.getElementById('spCareersGrid');
  careersGrid.querySelectorAll('.sp-career-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid = parseInt(careersGrid.dataset.studentId);
      const emoji = btn.dataset.emoji;
      const label = btn.dataset.label;
      const tag = `${emoji} ${label}`;

      let students = load('students');
      const idx = students.findIndex(s => s.id === sid);
      if (idx === -1) return;

      if (!students[idx].interests) students[idx].interests = [];

      if (btn.classList.contains('active')) {
        // Remove
        students[idx].interests = students[idx].interests.filter(i => !i.includes(label));
        btn.classList.remove('active');
      } else {
        // Add
        students[idx].interests.push(tag);
        btn.classList.add('active');
      }

      save('students', students);

      // Update interests display
      const interestsWrap = studentProfileContent.querySelector('.sp-interests-wrap');
      const updatedInterests = students[idx].interests;
      if (updatedInterests.length > 0) {
        interestsWrap.innerHTML = updatedInterests.map(i => `<span class="sp-interest-tag">${i}</span>`).join('');
      } else {
        interestsWrap.innerHTML = '<span class="sp-no-interests">Hali belgilanmagan</span>';
      }

      // Also re-render students list in background
      renderStudents();
    });
  });

  studentProfileModal.classList.remove('hidden');
}

// ---- HELPERS ----
function readFileAsDataURL(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => callback(e.target.result);
  reader.readAsDataURL(file);
}

function showFormError(form, msg) {
  let err = form.querySelector('.form-inline-error');
  if (!err) {
    err = document.createElement('p');
    err.className = 'form-inline-error';
    err.style.cssText = 'color:#ef4444;font-size:0.82rem;margin-bottom:0.8rem;animation:fadeIn 0.3s ease;';
    form.insertBefore(err, form.querySelector('button[type="submit"]'));
  }
  err.textContent = msg;
  setTimeout(() => { if (err.parentNode) err.remove(); }, 3000);
}

// ---- CONFIRM DELETE ----
function confirmDelete(callback) {
  pendingDeleteFn = callback;
  confirmModal.classList.remove('hidden');
}
confirmOk.addEventListener('click', () => {
  if (pendingDeleteFn) { pendingDeleteFn(); pendingDeleteFn = null; }
  confirmModal.classList.add('hidden');
});
confirmCancel.addEventListener('click', () => {
  pendingDeleteFn = null; confirmModal.classList.add('hidden');
});
confirmModal.addEventListener('click', (e) => {
  if (e.target === confirmModal) { pendingDeleteFn = null; confirmModal.classList.add('hidden'); }
});

// ---- PERSON CARD HTML ----
function personCardHTML(item, type) {
  const name = `${item.firstName} ${item.lastName}`.trim();
  // Use stored img OR auto-generate path from name so user can just drop files into image/
  const imgSrc = item.img || `image/${item.firstName}.jpg`;
  const imgHTML = `
    <img src="${imgSrc}" alt="${name}" data-lightbox="true" data-caption="${name}"
      onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';" />
    <div class="card-img-placeholder" style="display:none;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
      </svg>
    </div>`;

  const zoomHint = `<div class="card-zoom-hint">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"/>
    </svg>
  </div>`;

  const adminBtns = isAdmin
    ? `<div class="card-admin-btns">
        <button class="card-edit-btn" data-id="${item.id}" data-type="${type}" title="Tahrirlash">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931z"/>
          </svg>
        </button>
        <button class="delete-btn" data-id="${item.id}" data-type="${type}" title="O'chirish">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 18 18 6M6 6l12 12"/>
          </svg>
        </button>
       </div>`
    : '';

  // Age info for students
  let ageLine = '';
  let birthdayBadge = '';
  let interestsTags = '';
  if (type === 'students') {
    if (item.birthDate) {
      const age = calcAge(item.birthDate);
      if (age) {
        ageLine = `<div class="card-age">${age.years} yosh ${age.months > 0 ? age.months + ' oy' : ''}</div>`;
      }
      const dateStr = formatBirthDate(item.birthDate);
      if (dateStr) ageLine += `<div class="card-birthdate">${dateStr}</div>`;
      if (isBirthdayToday(item.birthDate)) {
        birthdayBadge = `<div class="birthday-badge">🎂 Bugun tug'ilgan kuni!</div>`;
      }
    }
    // Show interests as small tags
    if (item.interests && item.interests.length > 0) {
      const maxShow = 3;
      const shown = item.interests.slice(0, maxShow);
      const extra = item.interests.length - maxShow;
      interestsTags = `<div class="card-interests">${shown.map(i => `<span class="card-interest-tag">${i}</span>`).join('')}${extra > 0 ? `<span class="card-interest-more">+${extra}</span>` : ''}</div>`;
    }
  }

  const subjectBadge = type === 'teachers'
    ? `<span class="card-subject-badge">${item.subject}</span>`
    : '';

  const genderDot = type === 'students' && item.gender
    ? `<span class="gender-dot ${item.gender}"></span>`
    : '';

  const clickable = type === 'students' ? `data-student-click="${item.id}"` : '';

  return `
    <div class="person-card" data-id="${item.id}" ${clickable}>
      ${birthdayBadge}
      <div class="card-image-wrap">${imgHTML}${zoomHint}</div>
      <div class="card-body">
        <div class="card-name-row">
          ${genderDot}
          <div class="card-name">${name}</div>
        </div>
        ${type === 'teachers' ? `<div class="card-meta">${item.subject}</div>` : ''}
        ${subjectBadge}
        ${ageLine}
        ${interestsTags}
      </div>
      ${adminBtns}
    </div>
  `;
}

// ---- ANNOUNCEMENT CARD HTML ----
function announcementCardHTML(item) {
  let mediaHTML = '';
  if (item.video) {
    // YouTube embed yoki to'g'ridan-to'g'ri video
    if (item.video.includes('youtube.com') || item.video.includes('youtu.be')) {
      const videoId = item.video.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1] || '';
      mediaHTML = videoId
        ? `<div class="ann-video-wrap">
             <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen class="ann-video-frame"></iframe>
           </div>`
        : '';
    } else {
      mediaHTML = `<div class="ann-video-wrap">
        <video controls class="ann-video-el">
          <source src="${item.video}" />
          Brauzeringiz video qo'llab-quvvatlamaydi.
        </video>
      </div>`;
    }
  } else if (item.img) {
    mediaHTML = `<img class="ann-image" src="${item.img}" alt="${item.title}" data-lightbox="true" data-caption="${item.title}"
      onerror="this.onerror=null;this.style.opacity='0.3';" />`;
  } else {
    mediaHTML = `<div class="ann-media-placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="36" height="36">
        <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
      </svg>
      <span>Rasm / Video</span>
    </div>`;
  }
  const date = new Date(item.date).toLocaleDateString('uz-UZ', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const deleteBtn = isAdmin
    ? `<button class="ann-delete" data-id="${item.id}" title="O'chirish">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M6 18 18 6M6 6l12 12"/>
         </svg>
       </button>` : '';
  const typeBadge = item.video
    ? `<span class="ann-type-badge video">📹 Video</span>`
    : item.img
    ? `<span class="ann-type-badge image">🖼️ Rasm</span>`
    : `<span class="ann-type-badge">📢 E'lon</span>`;
  return `
    <div class="announcement-card" data-id="${item.id}">
      <div class="ann-media-wrap">${mediaHTML}</div>
      <div class="ann-body">
        <div class="ann-meta-row">
          <div class="ann-date">${date}</div>
          ${typeBadge}
        </div>
        <div class="ann-title">${item.title}</div>
        <div class="ann-desc">${item.desc}</div>
      </div>
      ${deleteBtn}
    </div>
  `;
}

// ---- GALLERY CARD HTML ----
function galleryCardHTML(item) {
  const deleteBtn = isAdmin
    ? `<button class="gallery-delete" data-id="${item.id}" title="O'chirish">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M6 18 18 6M6 6l12 12"/>
         </svg>
       </button>` : '';
  return `
    <div class="gallery-card" data-id="${item.id}" style="animation-delay:${Math.random() * 0.3}s">
      <img src="${item.img}" alt="${item.title}" data-lightbox="true" data-caption="${item.title}" />
      <div class="gallery-card-overlay">
        <span class="gallery-card-title">${item.title}</span>
      </div>
      ${deleteBtn}
    </div>
  `;
}

// ---- RENDER ----
function renderAll() {
  renderTeachers();
  renderStudents();
  renderAnnouncements();
  renderGallery();
  renderSchedule();
  renderComments();
}

function renderSection(section) {
  if (section === 'teachers') renderTeachers();
  else if (section === 'students') renderStudents();
  else if (section === 'announcements') renderAnnouncements();
  else if (section === 'gallery') renderGallery();
  else if (section === 'schedule') renderSchedule();
  else if (section === 'comments') renderComments();
}

function renderTeachers() {
  const grid = document.getElementById('teachersGrid');
  const empty = document.getElementById('teachersEmpty');
  const teachers = load('teachers');
  const countEl = document.getElementById('teacherCount');
  if (countEl) countEl.textContent = teachers.length;
  if (teachers.length === 0) {
    grid.innerHTML = ''; empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.innerHTML = teachers.map((t, i) => {
      const html = personCardHTML(t, 'teachers');
      return html.replace('class="person-card"', `class="person-card" style="animation-delay:${i * 0.06}s"`);
    }).join('');
    attachCardListeners(grid, 'teachers');
    attachLightboxListeners(grid);
  }
}

function renderStudents() {
  const boysGrid = document.getElementById('boysGrid');
  const girlsGrid = document.getElementById('girlsGrid');
  const boysGroup = document.getElementById('boysGroup');
  const girlsGroup = document.getElementById('girlsGroup');
  const empty = document.getElementById('studentsEmpty');
  let students = load('students');

  // Update stats
  const total = students.length;
  const boysAll = students.filter(s => s.gender === 'male');
  const girlsAll = students.filter(s => s.gender === 'female');
  animateCount('totalStudentsCount', total);
  animateCount('boysCount', boysAll.length);
  animateCount('girlsCount', girlsAll.length);
  studentNavCount.textContent = total;

  if (searchQuery) {
    students = students.filter(s =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery)
    );
  }

  renderClassTeacher();

  const boys = students.filter(s => s.gender === 'male');
  const girls = students.filter(s => s.gender === 'female');

  if (students.length === 0) {
    boysGroup.classList.add('hidden');
    girlsGroup.classList.add('hidden');
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');

    // Boys group
    if (boys.length > 0) {
      boysGroup.classList.remove('hidden');
      document.getElementById('boysGroupCount').textContent = boys.length;
      boysGrid.innerHTML = boys.map((s, i) => {
        const html = personCardHTML(s, 'students');
        return html.replace('class="person-card"', `class="person-card" style="animation-delay:${i * 0.04}s"`);
      }).join('');
      attachCardListeners(boysGrid, 'students');
      attachLightboxListeners(boysGrid);
      attachStudentClickListeners(boysGrid);
    } else {
      boysGroup.classList.add('hidden');
    }

    // Girls group
    if (girls.length > 0) {
      girlsGroup.classList.remove('hidden');
      document.getElementById('girlsGroupCount').textContent = girls.length;
      girlsGrid.innerHTML = girls.map((s, i) => {
        const html = personCardHTML(s, 'students');
        return html.replace('class="person-card"', `class="person-card" style="animation-delay:${i * 0.04}s"`);
      }).join('');
      attachCardListeners(girlsGrid, 'students');
      attachLightboxListeners(girlsGrid);
      attachStudentClickListeners(girlsGrid);
    } else {
      girlsGroup.classList.add('hidden');
    }
  }
}

function attachStudentClickListeners(grid) {
  grid.querySelectorAll('[data-student-click]').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open profile if clicking admin buttons or lightbox
      if (e.target.closest('.card-admin-btns') || e.target.closest('[data-lightbox]') || e.target.closest('.card-zoom-hint')) return;
      const studentId = parseInt(card.dataset.studentClick);
      openStudentProfile(studentId);
    });
  });
}

function renderAnnouncements() {
  const grid = document.getElementById('announcementsGrid');
  const empty = document.getElementById('announcementsEmpty');
  const anns = load('announcements');
  if (anns.length === 0) {
    grid.innerHTML = ''; empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.innerHTML = anns.map(a => announcementCardHTML(a)).join('');
    grid.querySelectorAll('.ann-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        confirmDelete(() => {
          let anns = load('announcements');
          anns = anns.filter(a => a.id !== id);
          save('announcements', anns);
          renderAnnouncements();
          showToast("E'lon o'chirildi", 'info');
        });
      });
    });
    attachLightboxListeners(grid);
  }
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const empty = document.getElementById('galleryEmpty');
  const gallery = load('gallery');
  if (gallery.length === 0) {
    grid.innerHTML = ''; empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.innerHTML = gallery.map(g => galleryCardHTML(g)).join('');

    // Delete listeners
    grid.querySelectorAll('.gallery-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        confirmDelete(() => {
          let gallery = load('gallery');
          gallery = gallery.filter(g => g.id !== id);
          save('gallery', gallery);
          renderGallery();
          showToast("Rasm o'chirildi", 'info');
        });
      });
    });

    // Lightbox listeners
    attachLightboxListeners(grid);
  }
}

function renderSchedule() {
  const tbody = document.getElementById('scheduleBody');
  tbody.innerHTML = defaultSchedule.map((row, idx) => {
    return `<tr style="animation:cardIn 0.4s ${idx * 0.05}s both">
      ${row.map((cell, ci) => `<td>${cell}</td>`).join('')}
    </tr>`;
  }).join('');
}

// ---- COMMENTS ----
function renderComments() {
  const list = document.getElementById('commentsList');
  const empty = document.getElementById('commentsEmpty');
  const countBadge = document.getElementById('commentsCountBadge');
  const navCount = document.getElementById('commentsNavCount');
  const comments = load('comments');

  // update counts
  const count = comments.length;
  if (countBadge) countBadge.textContent = count + ' ta izoh';
  if (navCount) navCount.textContent = count;

  if (count === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    list.innerHTML = comments.map((c, i) => {
      const date = new Date(c.date);
      const dateStr = `${date.getDate()} ${uzMonths[date.getMonth()]} ${date.getFullYear()}, ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
      const initials = (c.firstName[0] || '') + (c.lastName[0] || '');
      const deleteBtn = isAdmin
        ? `<button class="comment-delete-btn" data-id="${c.id}" title="O'chirish">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
               <path d="M6 18 18 6M6 6l12 12"/>
             </svg>
           </button>` : '';
      return `
        <div class="comment-card" style="animation:cardIn 0.4s ${i * 0.05}s both">
          <div class="comment-avatar">${initials.toUpperCase()}</div>
          <div class="comment-body">
            <div class="comment-meta">
              <span class="comment-author">${escapeHtml(c.firstName)} ${escapeHtml(c.lastName)}</span>
              <span class="comment-date">${dateStr}</span>
              ${deleteBtn}
            </div>
            <div class="comment-text">${escapeHtml(c.text)}</div>
          </div>
        </div>
      `;
    }).join('');

    // Delete listeners
    list.querySelectorAll('.comment-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        confirmDelete(() => {
          let comments = load('comments');
          comments = comments.filter(c => c.id !== id);
          save('comments', comments);
          renderComments();
          showToast("Izoh o'chirildi", 'info');
        });
      });
    });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Comment form logic
document.getElementById('commentText').addEventListener('input', function() {
  document.getElementById('commentCharCount').textContent = this.value.length;
});

document.getElementById('submitCommentBtn').addEventListener('click', () => {
  const firstName = document.getElementById('commentFirstName').value.trim();
  const lastName = document.getElementById('commentLastName').value.trim();
  const text = document.getElementById('commentText').value.trim();

  if (!firstName || !lastName) {
    showToast("Ism va familiyangizni kiriting", 'error'); return;
  }
  if (!text) {
    showToast("Izoh matnini kiriting", 'error'); return;
  }

  const comments = load('comments');
  comments.unshift({
    id: Date.now(),
    firstName,
    lastName,
    text,
    date: new Date().toISOString()
  });
  save('comments', comments);

  // Reset form
  document.getElementById('commentFirstName').value = '';
  document.getElementById('commentLastName').value = '';
  document.getElementById('commentText').value = '';
  document.getElementById('commentCharCount').textContent = '0';

  renderComments();
  showToast("Izohingiz qo'shildi!", 'success');
});

// ---- LIGHTBOX ATTACHMENT ----
function attachLightboxListeners(container) {
  container.querySelectorAll('[data-lightbox="true"]').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src, img.dataset.caption || '');
    });
  });
}

// ---- CARD LISTENERS ----
function attachCardListeners(grid, type) {
  grid.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      confirmDelete(() => {
        let items = load(type);
        items = items.filter(item => item.id !== id);
        save(type, items);
        if (type === 'teachers') renderTeachers();
        else renderStudents();
        showToast("Ma'lumot o'chirildi", 'info');
      });
    });
  });
  grid.querySelectorAll('.card-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      if (type === 'teachers') openEditTeacher(id);
      else openEditStudent(id);
    });
  });
}

// ---- ANIMATED COUNTER ----
function animateCount(elId, target) {
  const el = document.getElementById(elId);
  if (!el) return;
  const current = parseInt(el.textContent) || 0;
  if (current === target) return;
  const step = target > current ? 1 : -1;
  const duration = Math.min(Math.abs(target - current) * 25, 400);
  const steps = Math.abs(target - current);
  const interval = duration / steps;
  let val = current;
  const timer = setInterval(() => {
    val += step;
    el.textContent = val;
    if (val === target) clearInterval(timer);
  }, interval);
}

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// ---- KEYBOARD SHORTCUTS ----
document.addEventListener('keydown', (e) => {
  // Close any modal on Escape
  if (e.key === 'Escape') {
    if (!studentProfileModal.classList.contains('hidden')) studentProfileModal.classList.add('hidden');
    if (!addModal.classList.contains('hidden')) addModal.classList.add('hidden');
    if (!editModal.classList.contains('hidden')) editModal.classList.add('hidden');
    if (!confirmModal.classList.contains('hidden')) {
      pendingDeleteFn = null;
      confirmModal.classList.add('hidden');
    }
    if (!adminModal.classList.contains('hidden')) {
      adminModal.classList.add('hidden');
      clearLoginForm();
    }
  }
});

// ---- DIRECTOR AVATAR LIGHTBOX ----
const dirAvatar = document.getElementById('dirAvatar');
if (dirAvatar) {
  dirAvatar.addEventListener('click', () => {
    const img = dirAvatar.querySelector('img');
    if (img && img.src) {
      openLightbox(img.src, 'Egamberdiyeva Gulmira Uktambekovna — 161-Maktab Direktori');
    }
  });
}

// ---- START ----
init();
