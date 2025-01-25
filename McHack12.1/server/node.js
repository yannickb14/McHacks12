const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

// Function to broadcast messages to all connected clients except the sender
function broadcastToOthers(sender, message) {
    wss.clients.forEach((client) => {
        // Only send to clients that are not the sender and are open
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Handle new connections
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Handle incoming messages from this client
    ws.on('message', (message) => {
        console.log('Received:', message);

        // Broadcast the message to all other clients
        broadcastToOthers(ws, message);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

