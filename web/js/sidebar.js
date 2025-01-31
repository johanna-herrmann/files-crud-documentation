const sidebar = [
    { title: 'Introduction', link: '/introduction' },
    { title: 'Permissions', link: '/permissions' },
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
    ]}
];
