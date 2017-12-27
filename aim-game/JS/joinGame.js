// code and name are entered by user
const peer = new SimplePeer({initiator: true});
this.peer = peer;
this.setState({host: peer});

// Sending signaling data from player
peer.on('signal', (signalData) => {
  const nameRef = database.ref('/rooms/'+code+'/players/'+name);
  const newSignalDataRef = nameRef.push();
  newSignalDataRef.set({
    data: JSON.stringify(signalData)
  });
});

// Listen for signaling data from host for me
const hostSignalRef = database.ref('/rooms/'+code+'/host/'+name);
hostSignalRef.on('child_added', (res) => {
  peer.signal(JSON.parse(res.val().data));
});