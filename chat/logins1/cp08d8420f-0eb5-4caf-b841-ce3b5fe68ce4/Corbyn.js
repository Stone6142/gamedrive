// PS! Replace this with your own channel ID
// If you use this channel ID your app will stop working in the future
const CLIENT_ID = 'TirWtqmHEP8HH1TY';
import { message } from "../me75f1f49c-0211-4337-a364-b7602ec38ea3/sky.js";
const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [];

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
  return (
    "Corbyn"
  );
}

function getRandomColor() {
  return '#FFA500';
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