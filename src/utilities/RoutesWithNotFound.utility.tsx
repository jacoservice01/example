import { Route, Routes } from 'react-router-dom';
import { LayoutContainer } from '../styled-components';

interface Props {
  children: JSX.Element[] | JSX.Element;
}
function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={
        <LayoutContainer>
          <div>Not Found</div>
        </LayoutContainer>
      } />
    </Routes>
  );
}
export default RoutesWithNotFound;
