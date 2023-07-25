
import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PrivateRoutes } from '../../models';
import { RoutesWithNotFound } from '../../utilities';

const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const Home = lazy(() => import('./Home/Home'));
const Contact = lazy(() => import('./Contact/Contact'));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
      <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
      <Route path={PrivateRoutes.HOME} element={<Home />} />
      <Route path={PrivateRoutes.CONTACT} element={<Contact />} />
    </RoutesWithNotFound>
  );
}
export default Private;