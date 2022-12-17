import React from 'react';
import LoginScreen from '../components/login/Login';
import RegisterForm from '../components/register/register';
import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <>
        <LoginScreen setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
    </>
  );
}