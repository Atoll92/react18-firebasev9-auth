import Firestore from "firestore"

 async function fetchAll() {
    console.log("fetching all")
    const users = Firestore.collection('users')
    const user = await users.where('domaine_array', '!=', false).get()
    user.forEach(snapshot => {
        console.log(snapshot.ref.value) 
    })
}

module.exports = fetchAll

// exports.getDomainsStatus = functions.pubsub
//     .schedule('0 0 1 * *')
//     .onRun(async (context) => {
//         const users = firestore.collection('users')
//         const user = await users.where('domaine_array', '!=', false).get()
//         user.forEach(snapshot => {
//             console.log(snapshot.ref.value) 
//         })
//         return null;
//     })

