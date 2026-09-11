import React, { useEffect } from "react";
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import getMessages from "../features/getMessages";
import { setArtifacts, setMessages } from "../redux/messageSlice";

function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  // ChatArea.jsx
  useEffect(() => {
    const getMesg = async () => {
      if (selectedConversation?._id) {
        const data = await getMessages(selectedConversation._id);
        dispatch(setMessages(data || []));
        const latestArtifactsMessages = [...data]
          .reverse()
          .find((msg) => msg.artifacts && msg.artifacts.length > 0);
        dispatch(setArtifacts(latestArtifactsMessages?.artifacts || []));
      }
    };
    getMesg();
  }, [selectedConversation?._id]);
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Nav />
      <MessageList />
      <ChatInput />
    </div>
  );
}

export default ChatArea;
