import { useForm } from "react-hook-form";
import app from "../firebase-config";
import { doc, setDoc } from "firebase/firestore"; 
import { useUserAuth } from "../context/userAuthContext";
import { getFirestore } from 'firebase/firestore'
import { FieldValue } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
// import { useEffect } from "react";



import React, { useEffect } from 'react'

const db = getFirestore(app);

function Form({list, fetchDomainsList})  {

    // useEffect(() => {
    //     // if (loading) return;
    //     // if (!user) return navigate("/");
    //     setList([docSnap.data()])      }, [])

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => createUserData();
    const onSubmit = data => reg(data);
    const { logOut, user } = useUserAuth();


    // const docRef = doc(db, "users", user );

    // const data = {
    //     domain_name: data
    //  };



async function reg(data)  {
    // const docRef = doc(db, "users", (user.uid));
    // setList([
    //     ...list,{data}
    // ])

    // console.log("updatedlist")
    // console.log(list)
    // await docRef.UpdateAsync("domaine_array", FieldValue.ArrayUnion("data"));

    const docRef = doc(db, "users", (user.uid));
    // try {
   
        const docSnap = await getDoc(docRef);
        if(docSnap.exists())
         {
            await updateDoc(docRef, {
                domaine_array: arrayUnion(data)
            });

            // docRef.update({
            //     domaine_array: arrayUnion("greater_virginia")
            //   });
        }
        

        else {

                        await setDoc(doc(db, "users", (user.uid)), {
                            domaine_array : list , 
                            // champ_test : "test field"
                    
                        },  { merge: false });

            }


            fetchDomainsList()

} 
    
//     function createUserData(){     //Function to create user document in a 'users' collection
//         if (user){
//             const cityRef = doc(db, 'cities', 'BJ');
// setDoc(cityRef, { capital: true }, { merge: true });    //Merge checks to see if values exist, if so don't overwrite everything, just update
//         }
//     }

//     if (user){     //Make sure a user is authenticated and run createUserData()
//         console.log("creating user data");
//         createUserData();
//     }

// console.log(watch(list)); 
    console.log(watch("domain_name")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Add new domain to monitor:</p>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="mydomain.com" {...register("domain_name" , { required: true })} />

          
          
          {/* include validation with required or other standard HTML validation rules */}
          {/* <input {...register("exampleRequired", { required: true })} /> */}
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
          
          <input type="submit" />
        </form>
      );
}

export default Form