import { format, isToday, isYesterday, differenceInCalendarDays, startOfWeek, endOfWeek } from "date-fns"; // Import from date-fns

// For chat component

// Define role priorities for sorting
const rolePriority = {
    // author: 1, // Customer Care
    vendor: 1,
    user: 2,
    // Add more roles here if needed
};

const handleOnlineUsers = (userId, users_activity) => {
    var presence = 'offline'

    if (users_activity) {
        const user_exists = users_activity.filter(data => data?.user_name == userId)

        if (user_exists) {
            presence = user_exists[0]?.status
        }
    }

    return presence
};

// Delete this from this point
const limitHandler = (message, no = 10) => {
    // Check if the message length exceeds the limit
    const truncatedMessage = message.length > no ? message.slice(0, no) + '...' : message;

    return truncatedMessage
}

const limitHandlerWithSpace = (message, no) => {
    // Check if the message length exceeds the limit
    const truncatedMessage = message.length > no ? message.slice(0, no) + '... ' : message;

    return truncatedMessage
}

// check this program later
const limitHandlerWithPlus = (data) => {
    var truncatedMessage
    // console.log(data)
    if (data > 99) {
        truncatedMessage = "99+"
    } else if (data <= 99) {
        truncatedMessage = data
        // Check if the message length exceeds the limit
        // truncatedMessage = message.length > no ? message.slice(0, no) + '..' : message;
    }
    // console.log(truncatedMessage)

    return truncatedMessage
}

// end at this point

const chatDateFormatter = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object
    // console.log(differenceInCalendarDays(new Date(), date) <= 7) // formally
    // console.log(format(date, 'EEEE'))
    // console.log(format(date, 'dd/MM/yy'))
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return '' // Return a fallback if the date is invalid
    }

    // Get the start and end of the current week (Sunday to Saturday)
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday as start of the week
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 });     // Saturday as end of the week

    if (isToday(date)) {
        // If it's today, return time in 'p' format (e.g., 9:30 PM)
        return format(date, 'p');
    } else if (isYesterday(date)) {
        // If it was yesterday, return 'Yesterday'
        return 'Yesterday';
    } else if (date >= startOfCurrentWeek && date <= endOfCurrentWeek) {
        // If it was in the last 7 days, return the weekday (e.g., Monday)
        return format(date, 'EEEE');
    } else {
        // Else return date in 'dd/MM/yy' format (e.g., 02/09/23)
        return format(date, 'dd/MM/yy');
    }
};



const handleChatNamingForAdmin = (chatTag, isGroup, chatName) => {
    if (isGroup && chatTag === 'Highlands') {
        return limitHandler(chatName, 15)
    } else if (chatTag === 'Hills' || chatTag === 'Valley') {
        return "Customer care"
    } else if (chatTag === 'Landscape') {
        return 'Sales Chat'
    } else {
        return 'Private chat'
    }

}
// HILLS = 'Hills'  # customer care - Vendors: These will be group chats
// VALLEY = 'Valley'  # customer care - Client # this will be group chats

const handleChatNamingForAuthor = (chatTag, isGroup, chatName, users, userId) => {

    // var vendor = users?.filter((data) => data?.role == 'Client')
    // var user = users?.filter((data) => data?.role == 'Client')
    // // var userd = users?.filter((data) => data?.user_tag?.role == 'user')
    // // var userd = users?.filter((data) => data?.role == 'Client')
    // console.log(user)
    // // console.log(userd)

    // if (chatTag === 'Hills' || chatTag === 'Valley') {
    //     const data = {
    //         name: user[0]?.user_tag?.user_name,
    //         role: 'help'
    //     }
    //     return data //
    // }
    // // else
    if (chatTag === 'Hills') {
        var vendor = users?.filter((data) => data?.user_tag?.role == 'vendor')
        // var user = users?.filter((data) => data?.user_tag?.id !== userId)
        // var user_ = users?.some((data) => data?.user_tag?.id === userId)
        // console.log(user[0])
        // console.log(user_)
        const data = {
            name: vendor[0]?.user_tag?.user_name,
            role: 'vendor'
        }
        return data
    } else if (chatTag === 'Valley') {
        var user = users?.filter((data) => data?.user_tag?.role == 'user')
        // var user = users?.filter((data) => data?.user_tag?.id !== userId)
        const data = {
            name: user[0]?.user_tag?.user_name,
            role: 'client'
        }
        return data
    }
    else {
        return 'Unidentified chat'
    }

}

// VALLEY = 'Valley'  # customer care - Client # this will be group chats
// LANDSCAPE = 'Landscape'  # Vendor - Client # This will be private chats

const handleChatNamingForVendor = (chatTag, isGroup, chatName, users, userId) => {

    if (isGroup && chatTag === 'Highlands') {
        const data = {
            name: limitHandler(chatName, 15),
            role: 'community'
        }
        return data //
    } else if (chatTag === 'Hills' || chatTag === 'Valley') {
        const data = {
            name: "Customer care",
            role: 'help'
        }
        return data //
    } else if (chatTag === 'Landscape') {
        var user = users?.filter((data) => data?.user_tag?.id !== userId)
        // var user_ = users?.some((data) => data?.user_tag?.id === userId)
        // console.log(user[0])
        // console.log(user_)
        const data = {
            name: user[0]?.user_tag?.user_name,
            role: 'client'
        }
        return data
    } else if (chatTag === 'OceanView') {
        var user = users?.filter((data) => data?.user_tag?.id !== userId)
        const data = {
            name: user[0]?.user_tag?.user_name,
            role: user[0]?.user_tag?.role
        }
        return data
    } else {
        return 'Unidentified chat'
    }

}


const handleChatNamingForClient = (chatTag, isGroup, chatName, users, userId) => {

    if (chatTag === 'Hills' || chatTag === 'Valley') {
        const data = {
            name: "Customer care",
            role: 'help'
        }
        return data //
    } else if (chatTag === 'Landscape') {
        var user = users?.filter((data) => data?.user_tag?.id !== userId)
        // var user_ = users?.some((data) => data?.user_tag?.id === userId)
        // console.log(user[0])
        // console.log(user_)
        const data = {
            name: user[0]?.user_tag?.user_name,
            role: 'vendor'
        }
        return data
    } else {
        return 'Unidentified chat'
    }

}

const handleChatNameSorting = (users, chatName) => {
    const hasAuthor = users.some(u => u?.user_tag?.role === 'author');
    const hasVendor = users.some(u => u?.user_tag?.role === 'vendor');
    const hasUser = users.some(u => u?.user_tag?.role === 'user');

    if (hasVendor && hasUser) {
        // Sort so that vendor comes first
        return [...users]
            .sort((a, b) => rolePriority[a.user_tag.role] - rolePriority[b.user_tag.role])
            .map(u => u?.user_tag?.role === 'vendor' ? "vendor: " + u.user_tag.user_name : "user: " + u.user_tag.user_name);
    }

    // Private chat between author and vendor: show vendor's name
    if (hasAuthor && hasVendor) {
        const vendors = users.filter(u => u?.user_tag?.role === 'vendor');
        return vendors.map(u => "vendor: " + u.user_tag.user_name);
    }

    // Private chat between author and user: show user's name
    if (hasAuthor && hasUser) {
        const usersList = users.filter(u => u?.user_tag?.role === 'user');
        return usersList.map(u => "user: " + u.user_tag.user_name);
    }


    if (chatName === 'Private') {
        // If both are vendors or both are users, retain original order
        return users.map(u => "vendor: " + u.user_tag.user_name);
    }

    // Group chat with only vendors: show 'Group Chat'
    if (hasVendor && !hasAuthor && !hasUser) {
        return ["Vendor's Group chat"];
    }
}

// Irrelevant (currently not in use)
// const noOfUserUnreadMessages = (messageData, userId) => {
//     console.log(messageData?.length)
//     console.log(messageData)
//     // console.log(messageData[0]?.id)

//     // let numb = ''
//     for (const data in messageData) {
//         console.log(messageData[data]?.receiver?.user_tag?.id)
//         // var numb = messageData.map((data) => data?.receiver?.user_tag?.id === userId)
//         // console.log(numb.includes(userId))
//         let numb = 0
//         // console.log(messageData[data]?.receiver?.user_tag?.id === userId)
//         // var sum = parse(numb) + 1
//         if (messageData[data]?.receiver?.user_tag?.id === userId) {
//             return numb += 1
//             //     console.log('yed')
//             //     // console.log(numb)
//             //     console.log(data)
//             //     return numb += parseInt(data) + 1
//         } else {
//             //     console.log('yel')
//             return '0' || null
//         }
//         // if (Object.prototype.hasOwnProperty.call(object, key)) {
//         //     const element = object[key];

//         // }
//     }

//     // const unreadUserId = messageData ? messageData.map((m) => m?.receiver?.user_tag?.id) : []
//     // console.log(unreadUserId)
//     // console.log(unreadUserId[0])
//     // let text = ''
//     // for (let user in unreadUserId) {
//     //     console.log(userId)
//     //     console.log(unreadUserId[user])
//     //     // text += user
//     //     // console.log(text)
//     //     if (unreadUserId[user] === userId) {
//     //         console.log('yed')
//     //         return messageData?.length
//     //     } else {
//     //         console.log('yel')
//     //         return '0' || null
//     //     }
//     // }


// }


const noOfLastAdminMessages = (messageData, userId) => {
    console.log(messageData)
    console.log(userId)

    if (!Array.isArray(messageData)) {
        return 0; // Return 0 if the input is not an array
    }

    let noOfLastMessages = 0;

    messageData?.forEach(data => {
        if (data?.admin?.id === userId) {
            noOfLastMessages += 1;
        }
    })

    // for (const message of messageData) {
    //     if (message?.admin?.id === userId) {
    //         noOfLastMessages += 1;
    //     }
    // }

    return noOfLastMessages;

}

const noOfMessages = (messageData, ) => {
    console.log(messageData)
    return messageData?.length

}


const getLastMessage = (messages) => {
    if (!messages || messages?.length === 0) return null;
    // console.log(messages)
    const lastMessage = messages?.reduce((latest, message) => {
        // console.log(latest)
        // console.log(message)
        return new Date(message?.createdAt) > new Date(latest?.createdAt) ? message : latest;
    });
    // console.log()

    // return limitHandler(lastMessage?.message, 22)
    return {
        sender: lastMessage?.sender?.user_tag?.user_name,
        content: lastMessage?.message,
        // content: limitHandler(lastMessage?.message, 13),
        createdAt: lastMessage?.createdAt,
    };
};


const getLastMessageConvoWithUsername = (messages) => {
    // console.log(messages)
    // console.log(typeof(userId))
    if (!messages || messages?.length === 0) return null;
    // console.log(messages)
    const lastMessage = messages?.reduce((latest, message) => {
        // console.log(latest)
        // console.log(message)
        return new Date(message?.createdAt) > new Date(latest?.createdAt) ? message : latest;
    });
    // console.log()
    var sender = lastMessage?.sender?.user_tag?.user_name + ': '
    // if (lastMessage?.sender?.user_tag?.id === userId) {
    //     sender = ''
    // } else {
    // sender 
    // }
    // return limitHandler(lastMessage?.message, 22)
    return {
        sender: sender || '',
        content: lastMessage?.message || '',
        // content: limitHandler(lastMessage?.message, 13),
        createdAt: lastMessage?.createdAt,
    };
};
const getLastMessageConvo = (messages, userId) => {
    // console.log(messages)
    // console.log(typeof(userId))
    // if (!messages || messages?.length === 0) return null;
    if(!messages || messages == null) return null
    // console.log(messages)
    // const lastMessage = messages?.reduce((latest, message) => {
    //     // console.log(latest)
    //     // console.log(message)
    //     return new Date(message?.createdAt) > new Date(latest?.createdAt) ? message : latest;
    // });
    // const lastMessage = messages
    // console.log(messages)
    var sender
    if (messages?.sender?.user_tag?.id === userId) {
    // if (lastMessage?.sender?.user_tag?.id === userId) {
        sender = ''
    } else {
        // sender = lastMessage?.sender?.user_tag?.user_name + ': '
        sender = messages?.sender?.user_tag?.user_name + ': '
    }
    // return limitHandler(lastMessage?.message, 22)
    return {
        sender: sender || '',
        // content: lastMessage?.message || '',
        content: messages?.message || '',
        // createdAt: lastMessage?.createdAt,
        createdAt: messages?.createdAt,
    };
};

// For message component

// Function to scroll the chat container to the bottom
// helper/chatManager.js
// helper/chatManager.js
const scrollToBottom = (instant = false, chatContainerRef) => {
    if (!chatContainerRef?.current) return;

    const container = chatContainerRef.current;

    // Force jump without animation
    if (instant) {
        const restoreScroll = () => {
            container.style.scrollBehavior = 'smooth';
        };

        // Disable animation
        container.style.scrollBehavior = 'auto';

        // Delay scroll until messages actually render
        const observer = new MutationObserver(() => {
            container.scrollTop = container.scrollHeight;
            restoreScroll();
            observer.disconnect(); // One-time scroll
        });

        observer.observe(container, { childList: true, subtree: true });
    } else {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }
};


// const scrollToBottom = (instant = false, chatContainerRef) => {
//     chatContainerRef.current?.scrollTo({
//         top: chatContainerRef.current.scrollHeight,
//         behavior: instant ? "auto" : "smooth" // Instant scroll on first load
//     });
// };


// Function to get the formatted date label for each message
const getMessageDateLabel = (date) => {
    const messageDate = new Date(date);

    if (isNaN(messageDate.getTime())) {
        return '' // Return a fallback if the date is invalid
    }

    // Get the start and end of the current week (Sunday to Saturday)
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday as start of the week
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 });     // Saturday as end of the week

    // formally : differenceInCalendarDays(new Date(), messageDate) <= 7
    if (isToday(messageDate)) {
        return "Today";
    } else if (isYesterday(messageDate)) {
        return "Yesterday";
    } else if (date >= startOfCurrentWeek && date <= endOfCurrentWeek) {
        return format(messageDate, 'EEEE'); // Returns the day of the week (e.g., "Monday")
    } else {
        return format(messageDate, 'MMMM d, yyyy'); // For older messages, show full date (e.g., "September 17, 2024")
    }
};

// Irrelevant
// // study and correct this code later
// const handleIndicateAdminUnread = (messageUnread, messages) => {
//     // console.log(messageUnread)
//     // console.log(messages)

//     // Extract unread message IDs
//     const unreadMessageIds = messageUnread ? messageUnread.map((m) => m.message.id) : []

//     // console.log(unreadMessageIds)

//     // Find the index of the first unread message
//     const firstUnreadIndex = messages ? messages.findIndex((m) => unreadMessageIds.includes(m.id)) : -1;
//     // console.log(firstUnreadIndex)
//     return firstUnreadIndex
// }

const handleIndicateUnread = (messageUnread, messages) => {
    // console.log(messageUnread)
    // console.log(messages)

    // Extract unread message IDs
    const unreadMessageIds = messageUnread ? messageUnread.map((m) => m.message.id) : []

    // console.log(unreadMessageIds)

    // Find the index of the first unread message
    const firstUnreadIndex = messages ? messages.findIndex((m) => unreadMessageIds.includes(m.id)) : -1;
    // console.log(firstUnreadIndex)
    return firstUnreadIndex
}


const handleIndicateUnreadWithBlockedFilter = (messageUnread, messages, userId) => {
    // console.log(messageUnread)
    // console.log(messages)

    // Extract unread message IDs
    const unreadMessageIds = messageUnread ? messageUnread.map((m) => m.message.id) : []

    // console.log(unreadMessageIds)

    // Find the index of the first unread message where the user is included in the receivers array
    const firstUnreadIndex = messages
        ? messages.filter(data => data.receivers?.includes(userId)).findIndex((m) => unreadMessageIds.includes(m.id) && m.receivers?.includes(userId))
        : -1;
    // console.log(firstUnreadIndex)
    return firstUnreadIndex;


    // // Find the index of the first unread message where the user is included in the receivers array
    // const firstUnreadIndex = messages && messages.filter(m => m.receivers?.includes(userId))
    //     ? messages.findIndex((m) => unreadMessageIds.includes(m.id))
    //     : -1;
    // // console.log(firstUnreadIndex)
    // return firstUnreadIndex;

    // // Find the index of the first unread message
    // const firstUnreadIndex = messages ? messages.findIndex((m) => unreadMessageIds.includes(m.id)) : -1;
    // // console.log(firstUnreadIndex)
    // return firstUnreadIndex

    // let unreadIdx = 0
    // for (let userMessages of messages) {
    //     console.log(userMessages?.receivers)
    //     if (userMessages?.receivers?.includes(userId)) {
    //         const firstUnreadIndex = messages ? messages.findIndex((m) => unreadMessageIds.includes(m.id)) : -1;
    //         // return firstUnreadIndex
    //         unreadIdx += firstUnreadIndex
    //     } else {
    //         unreadIdx = unreadIdx
    //     }
    // }

    // return unreadIdx
}
// study and correct this code later
// const handleIndicateUnread = (messageUnread, messages, userId) => {
//     console.log(messageUnread)
//     console.log(messages)
//     console.log(userId)

//     // compare user id with chat id 

//     const unreadUserId = messageUnread ? messageUnread.map((m) => m?.receiver?.user_tag?.id) : []

//     if (unreadUserId === userId) {
//         // Extract unread message IDs
//         const unreadMessageIds = messageUnread ? messageUnread.map((m) => m.message.id) : []

//         // console.log(unreadMessageIds)

//         // Find the index of the first unread message
//         const firstUnreadIndex = messages ? messages.findIndex((m) => unreadMessageIds.includes(m.id)) : -1;
//         // console.log(firstUnreadIndex)
//         return firstUnreadIndex
//     } else {
//         return -1
//     }
// }


export {
    handleOnlineUsers,
    limitHandler,
    limitHandlerWithSpace,
    limitHandlerWithPlus,
    chatDateFormatter,
    handleChatNameSorting,
    handleChatNamingForAdmin,
    handleChatNamingForAuthor,
    handleChatNamingForVendor,
    handleChatNamingForClient,
    getLastMessage,
    getLastMessageConvo,
    getLastMessageConvoWithUsername,
    // noOfUserUnreadMessages,
    noOfMessages,
    noOfLastAdminMessages,
    scrollToBottom,
    getMessageDateLabel,
    // handleIndicateAdminUnread,
    handleIndicateUnread,
    handleIndicateUnreadWithBlockedFilter
}