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

// Listen for new players
playersRef.on('child_added', (res) => {
  const playerName = res.key;

  // Create Peer channel
  const peer = new SimplePeer();

  // Listen for signaling data from specific player
  playerRef.on('child_added', (res) => peer.signal(JSON.parse(res.val().data)));

  // Upload signaling data from host
  const signalDataRef = database.ref('/rooms/'+code+'/host/'+playerName);
  peer.on('signal', (signalData) => {
    const newSignalDataRef = signalDataRef.push();
    newSignalDataRef.set({
      data: JSON.stringify(signalData)
    });
  });
});