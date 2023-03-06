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
// const isDomainValid = require('../');
import isDomainValid from 'is-domain-valid';
import checkmark from '../img/icons8-done.svg'
import warning from '../img/warning-sign-svgrepo-com.svg'

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
function checkDomainValidity(domainname) {

 
    const res = isDomainValid(domainname);
    if (res.result) {
      return (   <img style={{width:"50px"}} src={checkmark} alt="checkmark" />);
    } else {
      return ( <span><img style={{width:"50px"}} src={warning} alt="warning" /> {res.message}</span>);
    }
}

async function getDomainStatus() {
    // With .then and .catch section
    // let response = await fetch("https://" + domainname, {
        let response = await fetch("https://google.fr", {
      method: "GET", // *Type of request GET, POST, PUT, DELETE
      mode: "no-cors", // Type of mode of the request
      cache: "no-cache", // options like default, no-cache, reload, force-cache
      credentials: "same-origin", // options like include, *same-origin, omit
      headers: {
        "Access-Control-Allow-Origin": "*"
        // "Content-Type": "application/json" // request content type
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      // body: JSON.stringify(data) // Attach body with the request
    });

    
    
      this.then(response => {
        // console.log(domainname + response.json());
        console.log( response.json());
      })
      .catch(error => {
        console.log(error);
      });
  }
getDomainStatus()

    if (newlist) {
    return (
        <div>
            <h1>My domainss</h1>
            
            <ul> {newlist.map((domain, index) => (
        <li key={index}><b>{domain.domain_name}</b><br></br> {checkDomainValidity(domain.domain_name)}<br></br></li> 
       
        // { getDomainStatus(domain.domain_name)}
       
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