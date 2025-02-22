const footer = `
  <div style="border-top:1px solid var(--border-color);padding-top:30px;margin: 40px 0;color:#999999;font-size: .9rem;">
    &copy; ${new Date().getFullYear()} Developed by <a href="https://github.com/johanna-herrmann/" target="_blank">Johanna Herrmann</a>. Released under MIT license.
  </div>
`;

let selectedLanguage = localStorage.getItem('language');
const actualLanguage = self.location.pathname.startsWith('/de/') ? 'de' : 'en';

if (!selectedLanguage) {
  const navigatorLanguae = (navigator.language || 'en').substring(0, 2);
  selectedLanguage = navigatorLanguae === 'de' ? 'de' : 'en';
  localStorage.setItem('language', selectedLanguage);
}

if (selectedLanguage !== actualLanguage) {
  const pathname = self.location.pathname;
  let target;
  if (selectedLanguage === 'de' && !pathname.startsWith('/de/')) {
    target = '/de/';
  } else if (pathname.startsWith('/de/')) {
    target = '/';
  }
  self.location.href = target;
}

const docute = new Docute({
  target: '#docute',
  sourcePath: '/docs/',
  highlight: ['json', 'yaml', 'properties', 'bash'],
  router: { mode: 'history' },
  darkThemeToggler: true,
  detectSystemDarkTheme: true,
  sidebar,
  footer,
  title: 'files-crud - Documentation',
  overrides: {
    '/': {
      language: 'English'
    },
    '/de/': {
      language: 'Deutsch',
      sidebar: sidebarDE,
      title: 'files-crud - Dokumentation'
    }
  }
});

while(!docute.app._isMounted) {
  continue;
}

setTimeout(() => {
  const logoLink = document.querySelectorAll('.router-link-active')[0];
  const target = selectedLanguage === 'de' ? '/de/' : '/';
  logoLink.href = target;
  logoLink.replaceWith(logoLink.cloneNode(true));
  
  document.querySelector('.LanguageSelector select').addEventListener('change', () => {
    const newAtualLanguage = self.location.pathname.startsWith('/de/') ? 'de' : 'en';
    localStorage.setItem('language', newAtualLanguage);
    self.location.reload();
  });
}, 1_000);
