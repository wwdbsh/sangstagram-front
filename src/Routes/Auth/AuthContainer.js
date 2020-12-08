import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT, LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
    const [action, setAction] = useState("logIn");
    const username = useInput("");
    const password = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("wwdbsh@gmail.com");
    const [requestSecret] = useMutation(LOG_IN, {
        update: (_, { data }) => {
            const { requestSecret } = data;
            if(!requestSecret){
                toast.error("You don't have an account yet, create one");
                setTimeout(() => setAction("signUp"), 3000);
            }
        },
        variables:{
            email:email.value
        }
    });
    const [createAccount] = useMutation(CREATE_ACCOUNT, {
        variables:{
            email:email.value,
            username:username.value,
            firstName:firstName.value,
            lastName:lastName.value
        }
    });
    const onSubmit = e => {
        e.preventDefault();
        if(action === "logIn"){
            if(email.value !== ""){
                requestSecret();
            }else{
                toast.error("Email is required");
            }
        }else if(action === "signUp"){
            if(email.value !== "" &&
            username.value !== "" &&
            firstName.value !== "" &&
            lastName.value !== ""){
                createAccount();
            }else{
                toast.error("All fields are required");
            }
        }
    };
    return (
        <AuthPresenter
         setAction={setAction} 
         action={action} 
         username={username}
         password={password} 
         firstName={firstName} 
         lastName={lastName} 
         email={email} 
         onSubmit={onSubmit}
        />
    );
}