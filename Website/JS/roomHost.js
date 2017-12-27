function getOpenRoom(database){
 return new Promise((resolve, reject) => {
   const code = generateRoomCode();
   const room = database.ref('rooms/'+code);
   room.once('value').then((snapshot) => {
     const roomData = snapshot.val();
     if (roomData == null) {
       // Room does not exist
       createRoom(room).then(resolve(code));
     } else {
       const roomTimeout = 1800000; // 30 min
       const now = Date.now();
       const msSinceCreated = now - roomData.createdAt;
       if (msSinceCreated > roomTimeout) {
         // It is an old room so wipe it and create a new one
         room.remove().then(() => createRoom(room)).then(resolve(code));
       } else {
         // The room is in use so try a different code
         resolve(getOpenRoom(database));
       }
     }
   })
 });
}