import { Routes, Route } from 'react-router-dom';

import Login from './LogIn';
import SignUp from './SingUp';
import VerifyAccount from './VerifyAccount';

export default function Auth() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyAccount />} />
      </Routes>
    </>
  );
}
