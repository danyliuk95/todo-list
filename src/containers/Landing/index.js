import { Button, Card, CardActions, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const Landing = () => {
  const navigate = useNavigate();
  const goToTasks = () => navigate('/todo');

  return (
    <Card className="landing-container">
      <CardContent>
        <h1 className="landing-container__header">Welcome to TODO list</h1>
      </CardContent>
      <CardActions className="landing-container__actions">
        <Button onClick={goToTasks}>Go to Tasks</Button>
      </CardActions>
    </Card>
  );
}

export default Landing;
