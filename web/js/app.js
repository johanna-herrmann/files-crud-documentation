const footer = `
  <div style="border-top:1px solid var(--border-color);padding-top:30px;margin: 40px 0;color:#999999;font-size: .9rem;">
    &copy; ${new Date().getFullYear()} Developed by <a href="https://github.com/johanna-herrmann/" target="_blank">Johanna Herrmann</a>. Released under MIT license.
  </div>
`;

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
  if (self.location.pathname.startsWith('/de/')) {
    document.querySelectorAll('.router-link-active')[0].href = '/de/';
  }
  document.querySelector('.LanguageSelector select').addEventListener('change', () => {
    self.location.reload();
  });
}, 1_000);
