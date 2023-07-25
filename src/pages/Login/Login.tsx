import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes, Roles } from '../../models';
import { createUser, resetUser, UserKey } from '../../redux/states/user';
import { LayoutContainer} from '../../styled-components';
import { getMorty} from '../../services/public.service';
import { clearLocalStorage } from '../../utilities';
import { Button } from '@mui/material';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  }, []);

  const login = async () => {
    try {
      const result = await getMorty();
      dispatch(createUser({ ...result.data, rol: Roles.USER }));
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    } catch (error) {}
  };
  return (
    <LayoutContainer>
      <Button variant='outlined' style={{alignSelf: "center"}}  onClick={login}>Enter here</Button>
    </LayoutContainer>
  );
}
export default Login;
