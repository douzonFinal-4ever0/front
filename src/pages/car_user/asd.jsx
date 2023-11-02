import React, { useState, useEffect, useRef } from 'react';
import '../../resources/assets/css/Chat.css';
import axios from 'axios';
import FileCollapse from './FileCollapse';
import { ReactSimpleChatbot } from 'react-simple-chatbot';
import ChatBotButton from '../common/ChatBotButton';
function ChatMessage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const chatMessagesRef = useRef(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [userno, setUserno] = useState('');
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);

  const openWebSocket = () => {
    if (userno) {
      const newSocket = new WebSocket(
        `ws://localhost:8081/websocket/${userno}`
      );

      newSocket.onopen = () => {
        console.log('Server connected!');
      };

      newSocket.onerror = (error) => {
        console.log(error);
      };

      newSocket.onmessage = (event) => {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      };

      setSocket(newSocket);

      axios.get('http://127.0.0.1:8081/chat/getChats').then((res) => {
        console.log(res.data);
      });
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8081/chat/getChats').then((res) => {
      console.log(res.data);
      setChats(res.data);
    });
  }, []);

  useEffect(() => {
    // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
    console.log(uploadFiles);
    // uploadFiles 상태 변수가 변경되면 이미지를 업로드한 것으로 간주하여 이미지 업로드 상태 변수를 true로 설정
    if (uploadFiles.length > 0) {
      setImageUploaded(true);
    }
  }, [messages, uploadFiles, chats]);

  const sendMessage = () => {
    socket.send(message);
    const dataToPost = {
      userno,
      contents: message
    };
    axios
      .post('http://127.0.0.1:8081/chat/saveChat', dataToPost)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('POST 요청 실패:', error);
      });
    setMessage('');
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // 파일선택창에서 선택한 파일들

    // 선택한 파일들을 기존 파일 배열에 추가
    setUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };
  const sendFile = () => {
    if (userno === '') {
      alert('로그인을 먼저하세요!!');
    } else {
      // 파일을 서버로 전송하는 로직을 구현
      // 예를 들어, FormData를 사용하여 파일을 전송할 수 있습니다.
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        // 파일 데이터 저장
        formData.append('multipartFiles', file);
      });
      const dataToPost = {
        userno
      };
      axios
        .post('http://127.0.0.1:8081/chat/uploadFiles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // 파일 업로드를 위한 헤더 설정
          },
          params: dataToPost // 기타 데이터는 URL 매개변수로 보낼 수 있습니다.
        })
        .then((res) => {
          console.log('파일 등록');
          setUploadFiles([]);
          console.log(res.data);
          setImageUploaded(true);
        })
        .catch((error) => {
          console.error('POST 요청 실패:', error);
        });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enter 키 기본 동작 방지 (새 줄 추가 방지)
      sendMessage();
    }
  };
  const handleLoginKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setUserno(e.target.value);
      console.log(e.target.value);
      openWebSocket();
    }
  };
  const handleLoginBtnClick = (e) => {
    e.preventDefault();
    setUserno(e.target.value);
    console.log(e.target.value);
    openWebSocket();
  };
  return (
    <div className="chat-container">
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="로그인하세요."
          className="form-control"
          aria-describedby="button-addon2"
          value={userno}
          onChange={(e) => setUserno(e.target.value)}
          onKeyDown={handleLoginKeyDown}
        />
        <button
          id="button-addon2"
          type="button"
          value={userno}
          className="sendBtn btn btn-outline-secondary"
          onClick={handleLoginBtnClick}
        ></button>
      </div>

      <div className="chat-messages" ref={chatMessagesRef}>
        {chats.map((chat) => {
          const time = chat.registerDate.split(' ')[0];

          return (
            <div className="message" key={chat.chatno}>
              {chat.userno} :
              {chat.contents && chat.contents.match(/\.(jpg|png)$/) ? (
                <img
                  src={'/img/' + chat.contents}
                  alt="Image"
                  style={{ width: '50%' }}
                />
              ) : (
                <span>{chat.contents}</span>
              )}
              <p className="fs-6 text-end">{time}</p>
            </div>
          );
        })}
        {messages.map((msg, index) => {
          const today = new Date(); // 현재 날짜
          const formattedDate = today.toISOString().split('T')[0]; // 날짜를 문자열로 변환하고 'T'를 기준으로 자름
          return (
            <div key={index} className="message">
              {msg && msg.match(/\.(jpg|png)$/) ? (
                <img
                  src={'/img/' + msg.contents}
                  alt="Image"
                  style={{ width: '50%' }}
                />
              ) : (
                <span>{msg}</span>
              )}
              <p className="fs-6 text-end">{formattedDate}</p>
            </div>
          );
        })}
      </div>
      <div className="input-group">
        <button
          class="btn btn-outline-secondary"
          type="button"
          onClick={() => setOpen(!open)}
        >
          +
        </button>
        <input
          type="text"
          placeholder="보낼 메세지를 입력하세요."
          className="form-control"
          aria-describedby="button-addon2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          id="button-addon2"
          type="button"
          value="전송"
          className="sendBtn btn btn-outline-secondary"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
      <FileCollapse open={open}>
        <div className="input-group mt-2">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            multiple
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={sendFile}
          >
            파일 전송
          </button>
        </div>
      </FileCollapse>
      <div>
        {imageUploaded && (
          <img
            src={'/img/' + uploadFiles[0].name}
            alt="Image"
            style={{ width: '50%' }}
          />
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
