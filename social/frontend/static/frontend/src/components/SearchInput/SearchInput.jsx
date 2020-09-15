import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

// Local
import { APP_NAME } from '../../constants';

import { getSearch, selectSearchString } from '../../redux/search';

import useStyles from './styles';

const SearchInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [searchString, setSearchString] = React.useState(
    useSelector(selectSearchString),
  );
  const [typingTimeout, setTypingTimeout] = React.useState(null);

  React.useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(setTimeout(() => {
      dispatch(getSearch(searchString));
    }, 250));
  }, [searchString]);

  const handleClear = () => {
    setSearchString('');
  };

  const handleInput = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <div className={classes.searchContainer}>
      <InputBase
        classes={{
          input: classes.inputInput,
          root: classes.inputRoot,
        }}
        endAdornment={searchString.length
          ? (
            <IconButton
              color="primary"
              onClick={handleClear}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ) : null}
        onInput={handleInput}
        placeholder={`Search ${APP_NAME}`}
        startAdornment={(
          <SearchIcon
            className={classes.searchIcon}
          />
        )}
        value={searchString}
      />
    </div>
  );
};

export default SearchInput;
