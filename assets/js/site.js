const highlightNavigation = () => {
  const currentPage = document.body.dataset.page;
  if (!currentPage) {
    return;
  }

  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === currentPage) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
    }
  });
};

const updateCopyrightYear = () => {
  const target = document.getElementById('year');
  if (!target) {
    return;
  }

  const currentYear = new Date().getFullYear();
  target.textContent = String(currentYear);
};

document.addEventListener('DOMContentLoaded', () => {
  highlightNavigation();
  updateCopyrightYear();
});

export { highlightNavigation };
