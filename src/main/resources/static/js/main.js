'use strict';

import supabase from "./supabaseClient.js";

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;
var roomcode = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {
    username = document.querySelector('#name').value.trim();
    roomcode = document.querySelector('#code').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/' + roomcode, onMessageReceived);

    //load previous chat history
    renderMessages(roomcode)

    // Tell your username to the server
    stompClient.send("/app/chat.addUser/" + roomcode,
        {},
        JSON.stringify({roomId: "public", sender: username, type: 'JOIN'})
    )

    

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

//stores a message
function storeMessage(messageContent, roomCode, roomId, type, username){
const store = async () => {
    const { data, error } = await supabase
    .from('messages_test')  // Table name in your Supabase database
    .insert([
        { 
            content: messageContent, 
            room_id: roomId, 
            username: username, 
            type: type,
            room_code: roomCode
        }
    ]);

if (error) {
    console.error('Error inserting message:', error);
} else {
    console.log('Message inserted:', data);
    }
  }
  store();
}

 function renderMessage(message){
    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

function renderMessages(roomCode){
    const fetchMessages = async () => {
        const {data, error} = await supabase
        .from('messages_test')
        .select('content, type, room_id, username')
        .eq('room_code', roomCode)
        .order('created_at', { ascending: true }); // Order by creation time

        if (error) {
            console.log(error);
        }
        if(data){
            for(let fetchedMessage of data){
                var chatMessage = {
                    roomId: fetchedMessage.room_id,
                    sender: fetchedMessage.username,
                    content: fetchedMessage.content,
                    type: fetchedMessage.type
                };
                renderMessage(chatMessage)
            }
            
        }
    }
    fetchMessages()
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if(messageContent && stompClient) {
        var chatMessage = {
            roomId: "public",
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage/" + roomcode, {}, JSON.stringify(chatMessage));
        messageInput.value = '';

       
        const fetchMessages = async () => {
            const {data, error} = await supabase
            .from('messages_test')
            .select('content, type')
            .eq('room_code', roomcode)
            .order('created_at', { ascending: true }); // Order by creation time

            if (error) {
                console.log(error);
            }
            if(data){
                console.log(data)
                console.log(data.length)
                var chatMessage2 = {
                    roomId: "public",
                    sender: username,
                    content: data[0].content,
                    type: 'CHAT'
                };
                //stompClient.send("/app/chat.sendMessage/" + roomcode, {}, JSON.stringify(chatMessage2));
            }
        }
        fetchMessages();
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    renderMessage(message); 
    
    storeMessage(message.content, roomcode, message.room_id, message.type, message.sender);
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)