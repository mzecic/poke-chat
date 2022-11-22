import './InboxPage.css';
import { useState, useEffect, useRef } from 'react';
import * as inboxAPI from '../../utilities/inbox-api';
import * as usersAPI from '../../utilities/users-api';
import ChatList from '../../components/ChatList/ChatList';
import UserList from '../../components/UserList/UserList';
import InboxSection from '../../components/InboxSection/InboxSection';


export default function InboxPage({ user }) {
    const [inboxes, setInboxes] = useState([]);
    const [selectedInbox, setSelectedInbox] = useState(null);
    const [users, setUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const scrollDown = useRef();

    useEffect(function() {
        (async function() {
            try {
                const allUsers = await usersAPI.getAllUsers();
                setUsers(allUsers);
            } catch(err) {
                console.log(err);
            }
        })();
    }, [])

    useEffect(function() {
        (async function() {
            try {
                const result = await inboxAPI.getInboxes(user._id);
                setInboxes(result);
            } catch(err) {
                console.log(err);
            }

      })();
      }, [user])

      function handleInboxClick(e, inbox) {
        // console.log(inbox)
        // console.log(e.target.innerText);
        setSelectedInbox(inbox)
      }

    return (
        <div className="inbox-div">
            {inboxes.length ?
            <>
                <ChatList inboxes={inboxes} user={user} handleInboxClick={handleInboxClick}/>
                <InboxSection
                ref={scrollDown}
                selectedInbox={selectedInbox}
                user={user}/>
                <UserList allUsers={allUsers}/>
            </>
            :
            <>
                <div className="left-div">This is where your current chats will show</div>
                <div className="middle-div">No Conversation Selected</div>
                <div className="right-div">Start a new conversation</div>
            </>
            }
        </div>
    )
}
