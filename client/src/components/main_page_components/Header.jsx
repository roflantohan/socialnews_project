import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeMenu } from '../../redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Header = (props) => {
  const classes = useStyles();

  const { changeMenu } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Echo
        </Typography>
        <IconButton></IconButton>
        <Button
          variant="outlined"
          size="small"
          onClick={() => changeMenu(true)}
        >
          Menu
        </Button>
      </Toolbar>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {};
};
const matchDispatchtoProps = (dispatch) => {
  return bindActionCreators(
    {
      changeMenu: changeMenu,
    },
    dispatch
  );
};

export default connect(mapStatetoProps, matchDispatchtoProps)(Header);
