import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch, useSelector } from 'react-redux';
import { usePostUserMutation } from '@/lib/services/userApi';
import { setUserDetail, clearUserDetail, selectUserDetail } from '@/lib/features/slices/userSlice';
import { userPostData } from '@/types/userTypes';

const useAuthSync = () => {
    const { user, isLoading } = useUser();
    const [postUser] = usePostUserMutation();
    const dispatch = useDispatch();
    const userDetail = useSelector(selectUserDetail);
  
    useEffect(() => {
      const syncUserData = async () => {
        if (user && !userDetail) {
          const userData: userPostData = {
            name: user.name || '',
            email: user.email || '',
            email_verified: user.email_verified || false,
            nickname: user.nickname || '',
            picture: user.picture || '',
          };
  
          try {
            const result = await postUser(userData).unwrap();
            dispatch(setUserDetail(result));
          } catch (error) {
            console.error('Failed to sync user data:', error);
            // Aquí podrías dispatch una acción para manejar el error, si lo deseas
          }
        } else if (!user && userDetail) {
          dispatch(clearUserDetail());
        }
      };
  
      syncUserData();
    }, [user, postUser, dispatch, userDetail]);
  
    return { user, isLoading, userDetail };
  };
  
  export default useAuthSync;