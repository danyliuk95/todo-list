import './styles.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const goToMain = () => navigate('/');

  return (
    <div className="header">
      <h1 className="header__text" onClick={goToMain}>ToDo List</h1>
    </div>
  );
};

export default Header;
