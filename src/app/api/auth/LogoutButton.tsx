import { useDispatch } from 'react-redux';
import { clearUserDetail } from '@/lib/features/slices/userSlice';

function LogOutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUserDetail());
    window.location.href = "/api/auth/logout";
  };

  return (
    <button onClick={handleLogout}>
      <span className="text-[#05264E]">Log Out</span>
    </button>
  );
}

export default LogOutButton;
