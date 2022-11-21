import './ChatList.css';
import ChatListItem from '../ChatListtem/ChatListItem';

export default function ChatList({ inboxes, user, handleInboxClick }) {

        const userInboxes = inboxes.map((inbox) => {
                return <ChatListItem
                inbox={inbox}
                user={user}
                key={inbox._id}
                handleInboxClick={handleInboxClick}
                />
            })

        return(
                <div className="left-div">
                {userInboxes}
                </div>
        )
}