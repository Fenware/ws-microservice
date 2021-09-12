/* class SocketIoController {
  constructor() {
    if (typeof SocketIoController.instance === 'object') {
      return SocketIoController.instance;
    }

    SocketIoController.instance = this;
    return SocketIoController;
  }

  setSocket(socket) {
    this.socket = socket;
  }
  
  getConnection(){
    return this.socket;
  }
  
  connect() {
    this.socket.on('connection', (socket) => {
      console.log(`New connection: ${socket.id}`);
    });
  }
} */

const SocketIoController = {
  SocketIoController: null,
  get Instance() {
    if (!this.SocketIoController) {
      this.SocketIoController = {
        amethod: () => {
          console.log('amethod');
        },
      };
    }
    return this.SocketIoController;
  },
};

module.exports = SocketIoController;
