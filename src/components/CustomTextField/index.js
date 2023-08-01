import { TextField } from '@mui/material';
import './styles.scss';
import PropTypes from 'prop-types';

const CustomTextField = ({label, value, onChange, onKeyDown, onSearch}) => {
  return (
    <TextField
      className="custom-text-field"
      label={label}
      variant="standard"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onClick={onSearch}
    />
  );
}

CustomTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
}

CustomTextField.defaultProps = {
  label: 'New Task'
}

export default CustomTextField;
