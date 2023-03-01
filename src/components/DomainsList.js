import React from 'react'
import app from '../firebase-config';
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { useUserAuth } from '../context/userAuthContext';
import { useState } from 'react';
// import { collection } from 'firebase/firestore';
import { query, collection, getDocs, where } from "firebase/firestore";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const db = getFirestore(app);

  function DomainsList ({list}) {

    const navigate = useNavigate();

    const { logOut, user, loading } = useUserAuth();
    const [DomainsListLive, setDomainsList] = useState([]);
    const newlist = list.domaine_array
    console.log("newlist")

    console.log(newlist)
    // const arrayDataItems = newlist.map((domain_name) => <li>{domain_name}</li>);

   

    // setDomainsList(list)

    const fetchDomainsList = async () => {
        const docRef = doc(db, "users", (user.uid));
        try {
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                console.log("docSnap.data()");
                console.log(docSnap.data());
                setDomainsList([docSnap.data()])
             

              
                // console.log(DomainsListLive);
            } else {
                console.log("Document does not exist")
            }
        
        } catch(error) {
            console.log(error)
        }

    }
    //   useEffect(() => {
    //     if (loading) return;
    //     if (!user) return navigate("/");
    //     // fetchDomainsList();
    //     console.log("DomainsListLive")
    //     console.log(DomainsListLive)
    //     console.log("DomainsListLive")
    //     console.log("list display== ");
    //     console.log(list.domaine_array)
        
    //   }, [user, loading, list]);


// // s
// const ar = list.domaine_array
    // if (list) {
    //     console.log("list from display")
    //     console.log(list)
    // }

    // if (!list) {
    //     console.log("no list ")
        
    // }


    if (newlist) {
    return (
        <div>
            <h1>My domains</h1>
            
            <ul> {newlist.map((domain, index) => (
                
        <li key={index}>{domain.domain_name}</li> 

       
    ))}</ul>

    <ul>
    {/* {arrayDataItems} */}
    </ul>
{/* <ul> */}
{/* {DomainsListLive.map(domain => (
        <li key={domain}>{domain.data}</li>
      ))}
      </ul> */}
            {/* <p>{user.uid}</p> */}
        </div>

    )
    }
    else {
        return (
            <div>
            <p></p>
            <i>No monitored domain yet</i>
            </div>
        )
    }
    
}

export default DomainsList