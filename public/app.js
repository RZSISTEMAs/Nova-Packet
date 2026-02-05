const logContainer = document.getElementById('packet-log');

// Connect to WebSocket (Same host, relative protocol)
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsUrl = `${protocol}//${window.location.host}`;
const socket = new WebSocket(wsUrl);

socket.onopen = () => {
    // addLog('SYS', 'System Connected', 'system');
};

socket.onmessage = (event) => {
    try {
        const msg = JSON.parse(event.data);
        // msg structure: { timestamp, direction, data: { header, length, raw, meta: { label, icon } } }
        
        const timestamp = msg.timestamp;
        const dir = msg.direction;
        const type = dir === 'C->S' ? 'client' : 'server';
        
        let header = '-';
        let length = '-';
        let raw = '';
        let icon = '';

        if (typeof msg.data === 'object' && msg.data.raw) {
             header = msg.data.header;
             length = msg.data.length;
             raw = msg.data.raw;
             if (msg.data.meta) {
                 icon = msg.data.meta.icon;
             }
        } else {
            raw = msg.data;
        }

        addRow(timestamp, dir, header, length, icon, raw, type);

    } catch (e) {
        console.error('Error parsing packet', e);
    }
};

function addRow(time, dir, id, len, icon, data, type) {
    const entry = document.createElement('div');
    entry.className = `packet-entry ${type}`;
    
    // Simplistic formatting for now
    entry.innerHTML = `
        <span class="col-time">${time}</span>
        <span class="col-dir">${dir}</span>
        <span class="col-id">${id}</span>
        <span class="col-len">${len}</span>
        <span class="col-icon">${icon}</span>
        <span class="col-data" title="${data}">${data}</span>
    `;

    logContainer.appendChild(entry);
    
    // Auto scroll rule (simple)
    if (logContainer.children.length > 200) {
        logContainer.removeChild(logContainer.children[1]); // Remove oldest (keep header)
    }
    
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
