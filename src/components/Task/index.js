import PropTypes from 'prop-types';
import { Button, Avatar, Card, CardContent, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import './styles.scss';

const Task = ({value, isDone, onRemove, onStatus}) => (
  <Card>
    <CardContent className="task">
      <Avatar>{value.length > 2 ? value.slice(0, 2) : value[0]}</Avatar>
      <Typography variant="h5" component="h3">{value}</Typography>
      <span>{isDone ? <CheckCircleOutlineIcon /> : <DoNotDisturbIcon />}</span>
      <Button onClick={onStatus}>
        Status
      </Button>
      <Button onClick={onRemove}>
        Remove
      </Button>
    </CardContent>
  </Card>
);

Task.propTypes = {
  value: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
};

export default Task;
