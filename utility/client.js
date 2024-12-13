const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connected to WebSocket server');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'notification') {
    // Handle the notification, e.g., display a popup, update UI
    console.log('Received notification:', data.message);
  }
};
socket.send(JSON.stringify({ type: 'chat', message: 'Hello, world!' }));

socket.onclose = () => {
  console.log('WebSocket connection closed');
};
