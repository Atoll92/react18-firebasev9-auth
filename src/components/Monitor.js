import React, { useEffect } from 'react'
import DomainsList from './DomainsList'
import Form from './Form'
import { db } from '../firebase-config'
import { getFirestore } from 'firebase/firestore'
import { doc, getDoc } from "firebase/firestore";
import { useState } from 'react'
import { useUserAuth } from '../context/userAuthContext'

function Monitor() {
    const { logOut, user, loading } = useUserAuth();

    const [list, setList] = useState(null)
    // const [listgood, setListGood] = useState([])

    

    // const [list_fixed, setListFixed] = useState([])
 

    const fetchDomainsList = async () => {
        console.log("user")
        console.log(user)
        const docRef = doc(db, "users", (user.uid));
        try {
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                console.log("docSnap.data()");

                console.log(docSnap.data());
                setList(docSnap.data())
           
               
                // console.log("list from monitor init");
                // console.log(list[0]);
            } else {
                console.log("Document does not exist")
            }
        
        } catch(error) {
            console.log(error)
        }

    }


    // fetchDomainsList();
    //   console.log(" monitor")
    // console.log(list)

    useEffect(() => {
        // if (loading) return;
        if (!user.uid) return ;

        // if (!user) return navigate("/");
        // setListFixed([list[0]])
        // console.log("list_fixed")
     
        // console.log(list_fixed)
    fetchDomainsList();

    console.log(" monitor")
    console.log(list)
       
      }, [user, loading, logOut]);

// if(list) {
//         setListGood(list[0])
//         console.log("listgood:")

//         console.log(listgood)
//     }

    return (
        <div>
            <h1>Monitor

            </h1>
            <Form list = {list} fetchDomainsList = {fetchDomainsList}/>
           {list && <DomainsList list = {list} />}
        </div>
    )
}

export default Monitor
