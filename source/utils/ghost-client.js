import GhostContentAPI from '@tryghost/content-api';

// Create API instance with default keys
// These keys must be replaced by the user or injected via environment variables
// export const ghostClient = new GhostContentAPI({
//     url: import.meta.env.VITE_GHOST_URL || 'http://localhost:2368',
//     key: import.meta.env.VITE_GHOST_KEY || '22444f78447824223cefc48062', // Demo key as placeholder
//     version: "v5.0"
// });

export const ghostClient = new GhostContentAPI({
    url: 'https://demo.ghost.io',
    key: '22444f78447824223cefc48062',
    version: "v5.0"
});