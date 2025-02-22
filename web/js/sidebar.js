const sidebar = [
    { title: 'Introduction', link: '/introduction' },
    { title: 'Usage', toc: false, collapsable: true, children: [
        { title: 'Install', link: '/usage/install' },
        { title: 'CLI', link: '/usage/cli' },
        { title: 'Docker', link: '/usage/docker' },
        { title: 'Fullstack', link: '/usage/fullstack' }
    ]},
    { title: 'Configuration', toc: false, collapsable: true, children: [
        { title: 'General', link: '/configuration/general' },
        { title: 'Database', link: '/configuration/database' },
        { title: 'Logging', link: '/configuration/logging' },
        { title: 'Storage', link: '/configuration/storage' },
        { title: 'Server', link: '/configuration/server' },
        { title: 'Server - CORS', link: '/configuration/server-cors' }
    ]},
    { title: 'API', toc: false, collapsable: true, children: [
        { title: 'General', link: '/api/general' },
        { title: 'User Endpoints', link: '/api/user' },
        { title: 'File Endpoints', link: '/api/file' }
    ]},
    { title: 'Permissions', link: '/permissions' },
    { title: 'Auth', link: '/auth' }
];

const sidebarDE = [
    { title: 'Einleitung', link: '/de/introduction' },
    { title: 'Anwendung', toc: false, collapsable: true, children: [
        { title: 'Installation', link: '/de/usage/install' },
        { title: 'CLI', link: '/de/usage/cli' },
        { title: 'Docker', link: '/de/usage/docker' },
        { title: 'Fullstack', link: '/de/usage/fullstack' }
    ]},
    { title: 'Konfiguration', toc: false, collapsable: true, children: [
        { title: 'Allgemein', link: '/de/configuration/general' },
        { title: 'Datenbank', link: '/de/configuration/database' },
        { title: 'Logging', link: '/de/configuration/logging' },
        { title: 'Speicher', link: '/de/configuration/storage' },
        { title: 'Server', link: '/de/configuration/server' },
        { title: 'Server - CORS', link: '/de/configuration/server-cors' }
    ]},
    { title: 'API', toc: false, collapsable: true, children: [
        { title: 'Allgemein', link: '/de/api/general' },
        { title: 'Nutzer Endpoints', link: '/de/api/user' },
        { title: 'Datei Endpoints', link: '/de/api/file' }
    ]},
    { title: 'Berechtigungen', link: '/de/permissions' },
    { title: 'Auth', link: '/de/auth' }
];
