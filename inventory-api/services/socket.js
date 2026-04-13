const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // allow NextJS frontend to connect seamlessly
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('🔗 Client connected to delivery tracker: ' + socket.id);

    // Clients/Drivers can join strict delivery rooms
    socket.on('join_delivery', (deliveryId) => {
      socket.join(deliveryId);
      console.log(`Socket ${socket.id} joined delivery ${deliveryId}`);
    });

    // Drivers emit their current coords
    socket.on('driver_location_update', (data) => {
      // E.g., { deliveryId: "123", lat: 28.6, lng: 77.2 }
      if (data.deliveryId) {
        // Broadcast to clients listening to this specific delivery
        io.to(data.deliveryId).emit('delivery_tracking', data);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });
};

const getIo = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

module.exports = { initSocket, getIo };
