import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../shared/api";
const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 유효성검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const navigate = useNavigate();

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    const passwordConfirmCurrent = e.target.value;
    setPasswordConfirm(passwordConfirmCurrent);

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
      setIsPasswordConfirm(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    api.post("/auth/signup", {
      email: email,
      password: password,
    });
    navigate("/");
  };

  return (
    <Background>
      <Form onSubmit={submitHandler}>
        <Image> 𝑻𝑶𝑫𝑶-𝑳𝑰𝑺𝑻</Image>
        <Div>
          <Text>ᴇ-ᴍᴀɪʟ</Text>
          <Input value={email} onChange={onChangeEmailHandler} />
          {email.length > 0 && (
            <ComfirmText className={`message ${isEmail ? "success" : "error"}`}>
              {emailMessage}
            </ComfirmText>
          )}
        </Div>
        <Div>
          <Text>ᴘᴀssᴡᴏʀᴅ</Text>
          <Input value={password} onChange={onChangePasswordHandler} />{" "}
          {password.length > 0 && (
            <ComfirmText
              className={`message ${isPassword ? "success" : "error"}`}
            >
              {passwordMessage}
            </ComfirmText>
          )}
        </Div>
        <Div>
          <Text>ᴘᴀssᴡᴏʀᴅ ᴄʜᴇᴄᴋ</Text>
          <Input
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            passwordText=" "
            title="비밀번호 확인"
            typeTitle="passwordConfirm"
          />
          {passwordConfirm.length > 0 && (
            <ComfirmText
              className={`message ${isPasswordConfirm ? "success" : "error"}`}
            >
              {passwordConfirmMessage}
            </ComfirmText>
          )}
        </Div>
        <Button
          type="submit"
          disabled={!(isPassword || isEmail || isPasswordConfirm)}
        >
          ᴀᴄᴄᴏᴜɴᴛ
        </Button>
      </Form>
    </Background>
  );
};

export default Sign;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  height: 100vh;
  background-size: cover;
  background-image: url(https://velog.velcdn.com/images/soonger3306/post/41dbb138-607a-4793-8a17-f064330754c6/image.gif);
`;
const Image = styled.div`
  margin-top: 40px;
  color: rgb(255, 255, 255);
  height: 100px;
  font-size: 50px;
  text-shadow: 2px 2px 2px #1659b0;
  width: 50%;
`;
const Text = styled.div`
  width: 52%;
  text-align: left;
  text-decoration: underline;
  text-decoration-color: #85b5dd;
  margin-bottom: 10px;
`;
const ComfirmText = styled.span`
  color: #596e80;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50vw;
  background-color: #ffffffab;
  border-radius: 30px;
  overflow: hidden;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const Input = styled.input`
  width: 50%;
  height: 6%;
  padding: 10px;
  font-size: 20px;
  border: 1px solid rgb(87, 159, 222);
  background-color: #ffffffd0;
  border-radius: 10px;

  &:hover {
    border: 1px solid rgb(42, 134, 214);
  }
  &:focus {
    outline: 1px solid rgb(42, 134, 214);
  }
`;

const Button = styled.button`
  width: 20%;
  border: none;
  color: white;
  font-size: 20px;
  border-radius: 10px;
  margin: 20px 0px 80px 0px;
  background-color: #344e95;
  padding: 20px;
`;
