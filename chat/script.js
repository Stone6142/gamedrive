const CLIENT_ID = 'TirWtqmHEP8HH1TY';

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [];
/*function getPublicIP() {
  fetch('https://httpbin.org/ip')
    .then(response => response.json())
     .then(data => {
      // do what you want to do with the IP address
      // ... eg. log it to the console
      console.log(data.origin);
      if(data.origin == "127.0.0.1, 206.176.84.28") {
          console.log("Skyler");
          document.getElementById("car").href="./yourcars/me/";
      }
      if(data.origin == "127.0.0.1, 206.176.84.28") {
          console.log("Cale");
          document.getElementById("car").href="./yourcars/cj/";
      }
    });
}
    
getPublicIP();*/
check_userid();
drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({ id }) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getRandomName() {
  const adjs = ["Fear", "Poo Poo", "Braeden", "USSR", "Illuminoti", "Fart", "Human", "School", "Game", "Math", "A", "Inert", "Staff", "Quiet", "Job", "Dog", "Owl", "Attack", "Attack", "HTML", "CSS", "Google", "Connection", "ERROR", "Red", "Friends", "Family", "Touch", "Your", "Wood", "Random", "IDK", "I NEED SO MANY", "Welp", "Admin", "RDM", "Smile", "Could", "Young", "Chat", "Time", "I have to", "garry's", "Save", "Console", "John", "Jain", "428"];
  const nouns = ["Asylum", "Poop", "God", "EXE", "Computer", "Drive", "Reading", "Download", "Creative Name", "He/Him", "They/them/It", "She/her", "Helicopter", "Heli", "Script", "Chrome", "Lost", "ERROR", "Pink", "For", "Guy", "firefly", "Grass", "Mom", "Plank", "Name", "WHY DO", "Img", "REEEE", "Staff", "line 63 char:323", "Word", "Thunder", "Teacher", "Watchers", "much free time", "mod", "Run", "Stress", "Doe", "Doe", "428"];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    " " +
    nouns[Math.floor(Math.random() * nouns.length)] +
    ":"
  );
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  if (value === '/happy') {
    DOM.input.value = '';
    drone.publish({
      room: 'observable-room',
      message: '😄',
    })
  } else {
    if (value === '/sad') {
      DOM.input.value = '';
      drone.publish({
        room: 'observable-room',
        message: '😔',
      })
    } else {
      if (value === '/sleep') {
        DOM.input.value = '';
        drone.publish({
          room: 'observable-room',
          message: '😴',
        })
      } else {
        if (value === '/help') {
          DOM.input.value = '';
          window.open('../chat/help', '_blank');
        }
        else {
          if (value === '/die') {
            DOM.input.value = '';
            drone.publish({
              room: 'observable-room',
              message: '⚰️',
            })
          } else {
            if (value === '/jesuschrist') {
              DOM.input.value = '';
              window.close();
              window.open('https://assets.churchofjesuschrist.org/fc/f2/fcf2f6dcf6b808fa027795738e8c14b9ee5358c1/jesus_sermon_mount.jpeg')
              drone.publish({
                room: 'observable-room',
                message: 'type /jesuschrist',
              })
            } else {
              DOM.input.value = '';
              drone.publish({
                room: 'observable-room',
                message: value,
              })
            };
          }
        }
      }
    }
  }
}
function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}

function check_userid() {
  console.log(document.cookie);
  console.log(document.cookie);
  if(document.cookie._gid == "GA1.2.2093362707.1684416666"){
    console.log("skyler");
  }
}
