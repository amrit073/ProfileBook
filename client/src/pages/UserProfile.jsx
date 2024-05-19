import { useContext } from 'react';
import Profile from '../components/Profile';
import ListUsers from '../components/ListUsers';
import { ProfileContext } from '../context/profile.context';

export default function UserProfile() {
  const context = useContext(ProfileContext);

  if (context === undefined) throw new Error('useProfile must be used within a ProfileProvider');
  const { role } = context;

  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        <Profile />
        {role === 'ADMIN' && <ListUsers />}
      </div>
    </>
  );
}
