import { useDispatch } from 'react-redux';
import { clearUserDetail } from '@/lib/features/slices/userSlice';
import { AnchorProps } from '@/components/Navbar/Navbar';

function LogOutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUserDetail());
    window.location.href = "/api/auth/logout";
  };

  return (
    <a onClick={handleLogout} style={{ "--i": 6, "margin": 0 } as AnchorProps}>
      <span className="text-[#05264E] mobile:font-[500] mobile:text-[1.1rem] md:font-normal md:text-sm">Log Out</span>
    </a>
  );
}

export default LogOutButton;
