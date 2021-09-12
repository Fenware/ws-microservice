export default class SocketsController {
  private static instance: SocketsController;
  private static socket: any;

  private constructor() {}

  public static getInstance(): SocketsController{
    if(!SocketsController.instance){
      SocketsController.instance = new SocketsController();
    }
    return SocketsController.instance;
  }

  public static setSocket(socket: any) {
    this.socket = socket;
  }

  public static getConnection() {
    return this.socket;
  }

  public static connect() {
    this.socket.on("connection", (socket: any) => {
      console.log(`New connection: ${socket.id}`);

      socket.on("room:create", (data: any) => {
        console.log(data);
        socket.emit(`room:${data.id_group}`, data);
      });
      socket.on("room:delete", (data: any) => {
        console.log(data);
        socket.emit(`room:delete_${data.id_group}`, data);
      });

    });
  }
}