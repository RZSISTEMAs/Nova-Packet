const logContainer = document.getElementById('packet-log');

// Connect to WebSocket (Same host, relative protocol)
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsUrl = `${protocol}//${window.location.host}`;
const socket = new WebSocket(wsUrl);

socket.onopen = () => {
    addLog('System', 'Connected to Nova-Packet Engine', 'system');
};

socket.onmessage = (event) => {
    try {
        const msg = JSON.parse(event.data);
        // msg structure: { timestamp, direction, data }
        addLog(msg.direction, msg.data, msg.direction === 'C->S' ? 'client' : 'server');
    } catch (e) {
        console.error('Error parsing packet', e);
    }
};

socket.onclose = () => {
    addLog('System', 'Disconnected from Engine', 'system');
};

function addLog(direction, content, type) {
    const entry = document.createElement('div');
    entry.className = `packet-entry ${type}`;
    
    // Simplistic formatting for now
    entry.innerHTML = `
        <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        <span class="direction">${direction}</span>
        <span class="content">${escapeHtml(content)}</span>
    `;

    logContainer.appendChild(entry);
    
    // Auto scroll if near bottom
    logContainer.scrollTop = logContainer.scrollHeight;
}

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
