import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Input from "../../Components/Input";

const Wrapper = styled.div`
    min-height:80vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`;

const Box = styled.div`
    ${props => props.theme.whiteBox}
    border-radius:0px;
    width:100%;
    max-width:350px;
`;

const StateChanger = styled(Box)`
    text-align:center;
    padding:20px 0px;
`;

const Link = styled.span`
 color: ${props => props.theme.blueColor};
 cursor:pointer;
`;

const Form = styled(Box)`
    padding:40px;
    padding-top:20px;
    padding-bottom:30px;
    margin-bottom:15px;
    form {
        width:100%;
        input {
            width:100%;
            &:not(:last-child){
                margin-bottom:7px;
            }
            &:first-child{
                margin-top:20px;
            }
        }
        button{
            margin-top:10px;
        }
    }
    h1{
        margin-bottom:5px;
    }
`;

const Logo = styled.h1`
    font-size:40px;
    font-family:Brush Script MT;
    text-align:center;
`;

export default ({
    setAction,
    action,
    username,
    password,
    firstName,
    lastName,
    email,
    onSubmit
}) => (
    <Wrapper>
        <Form>
            <Logo>Sangstagram</Logo>
            {action === "logIn" ?(
                <form onSubmit={onSubmit}>
                    <Input placeholder={"Email"} {...email} type="email" />
                    <Input placeholder={"Password"} {...password} type="password" />
                    <Button text={"Log in"}/>
                </form>) : (
                <form onSubmit={onSubmit}>
                    <Input placeholder={"First name"} {...firstName} />
                    <Input placeholder={"Last name"} {...lastName} />
                    <Input placeholder={"Email"} {...email} type="email" />
                    <Input placeholder={"Username"} {...username} />
                    <Input placeholder={"Password"} {...password} type="password" />
                    <Button text={"Sign up"}/>
                </form>
            )}
        </Form>
        <StateChanger>
            {action === "logIn" ? (
                <>
                    Don't have an account?{" "}
                    <Link onClick={()=>setAction("signUp")}>Sign up</Link>
                </>
            ) : (
                <>
                    Have an account?{" "}
                    <Link onClick={()=>setAction("logIn")}>Log in</Link>
                </>
            )}
        </StateChanger>
    </Wrapper>
);