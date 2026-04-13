
// Obselete(no longer in use)
// const handleUserManagement = ( userIde, users_id, setUsers, setUsersId) => {
//     // Destructure user to get id and username
//     const { id, user_name } = userIde;

//     // This is to maintain user view
//     // Check if the user is already added
//     if (users[id]) {
//         // Remove user from the users object
//         setUsers((prevUsers) => {
//             const newUsers = { ...prevUsers };
//             delete newUsers[id];
//             return newUsers;
//         });
//     } else {
//         // Add user to the users object
//         setUsers((prevUsers) => ({
//             ...prevUsers,
//             [id]: user_name
//         }));
//     }

//     // This is for maintaining for database
//     if (users_id.includes(id)) {
//         // console.log('remove')
//         setUsersId((prevUsers) => prevUsers.filter((data) => data !== id));
//         // setUsersName((prevUsers) => prevUsers.filter((data) => data !== user_name));
//         // setUsersId((prev) => [...prev, userId])
//     } else {
//         // console.log('add')
//         setUsersId((prev) => [...prev, id])
//         // setUsersName((prev) => [...prev, user_name]);
//     }
// }


// export {
//     handleUserManagement
// }