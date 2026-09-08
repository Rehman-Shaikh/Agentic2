import React, { useEffect } from 'react'
import Nav from './Nav'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useSelector, useDispatch } from 'react-redux'
import getMessages from '../features/getMessages'
import { setMessages } from '../redux/messageSlice'

function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMesg = async () => {
      if (selectedConversation) {
        dispatch(setMessages([])); // Reset messages on chat switch
        const data = await getMessages(selectedConversation._id); // Fix: _id instead of id
        dispatch(setMessages(data || []));
      }
    };
    getMesg();
  }, [selectedConversation, dispatch]);

  return (
    <div className='flex-1 flex flex-col h-full overflow-hidden'>
      <Nav />
      <MessageList />
      <ChatInput />
    </div>
  );
}

export default ChatArea;