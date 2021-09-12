import {
  User,
  users,
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} from "../utils/users";
export default class SocketsController {
  private static instance: SocketsController;
  private static io: any;

  private constructor() {}

  public static getInstance(): SocketsController {
    if (!SocketsController.instance) {
      SocketsController.instance = new SocketsController();
    }
    return SocketsController.instance;
  }

  public static setSocket(io: any) {
    this.io = io;
  }

  public static getConnection() {
    return this.io;
  }

  public static connect() {
    this.io.on("connection", (socket: any) => {
      console.log(`New connection: ${socket.id}`);

      socket.on("join:room", (room: string) => {
        const user: User = userJoin(socket.id, room);
        socket.join(user.room);

        // Para implementar
        /* socket.broadcast
          .to(user.room)
          .emit(
            "message",
            formatMessage(botName, `${user.username} has joined the chat`)
          ); */

        /* this.io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        }); */
      });

      socket.on('room:newMessage', (data: any) => {
        let user: User = getCurrentUser(socket.id,`room:${data.id_query}`);
        this.io.to(user.room).emit('room:message', data);
      });

      socket.on('disconnect', () => {
        const user: User = userLeave(socket.id);
    
        if (user.id != '') {
          /* this.io.to(user.room).emit(
            'message',
            formatMessage(botName, `${user.username} has left the chat`)
          ); */
    
          // Send users and room info
          this.io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
          console.log("Disconnected" );
        }
      });
      /* Salas de chat */
      /* Mensajes de chat */
      /* socket.on("room:create", (data: any) => {
        console.log(data);
        socket.emit(`room:${data.id_group}`, data);
      });
      socket.on("room:delete", (data: any) => {
        console.log(data);
        socket.emit(`room:delete_${data.id_group}`, data);
      }); */
    });
  }
}