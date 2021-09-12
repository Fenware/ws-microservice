export type User = {
  id: string,
  room: string
}

export const users: User[] = [];

export function userJoin(id: string, room: string): User {
  let user: User = { id, room };

  users.push(user);

  return user;
}

export function getCurrentUser(id: string, room: string){
  let user: User = {id: '', room: ''};
  user = users.find(user => user.id === id && user.room == room) || user;
  return user;
}

export function userLeave(id: string) {
  let userToReturn: User = {id: '', room: ''}; 
  users.forEach((user: User, index: number)=>{
    if(user.id == id){
      users.splice(index, 1);
      userToReturn = user;
    }
  });  
  return userToReturn;
}

export function getRoomUsers(room: string) {
  return users.filter(user => user.room === room);
}