lucide.createIcons();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('mobile-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('mobile-open');
}));

const inquiryForm = document.querySelector('#inquiry-form');
inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const interests = data.getAll('interest').join(', ') || '미지정';
  const subject = `[WATERENV LAB 문의] ${data.get('company') || data.get('name')}`;
  const body = [`성명: ${data.get('name')}`, `기업/기관: ${data.get('company') || '미지정'}`, `이메일: ${data.get('email')}`, `연락처: ${data.get('phone') || '미지정'}`, `관심 분야: ${interests}`, '', data.get('message')].join('\n');
  window.location.href = `mailto:rucachi@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-note').textContent = '메일 앱을 열고 있습니다. 전송 전 내용을 확인해주세요.';
});