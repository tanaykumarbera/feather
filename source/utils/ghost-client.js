import GhostContentAPI from '@tryghost/content-api';

// Create API instance with default keys
// These keys must be replaced by the user or injected via environment variables
// Read from window object (injected by default.hbs) or fall back to demo values
const ghostUrl = window.GHOST_CONFIG?.url || 'https://demo.ghost.io';
const ghostKey = window.GHOST_CONFIG?.key || '22444f78447b972424a05ad2a0';

export const ghostClient = new GhostContentAPI({
    url: ghostUrl,
    key: ghostKey,
    version: "v5.0"
});