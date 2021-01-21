import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeMenu } from '../../redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import BackspaceIcon from '@material-ui/icons/Backspace';
import IconButton from '@material-ui/core/IconButton';

import ListSites from './ListSites';
import AddSite from './AddSite';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabpanel: {
    overflow: 'scroll',
    'overflow-x': 'hidden',
    height: '600px',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    float: 'right',
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Menu = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { changeMenu } = props;
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <IconButton
            aria-label="exit"
            color="primary"
            className={classes.button}
          >
            <BackspaceIcon onClick={() => changeMenu(false)} />
          </IconButton>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Список сайтов" {...a11yProps(0)} />
                <Tab label="Добавить сайт" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.tabpanel}>
              <ListSites />
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.tabpanel}>
              <AddSite />
            </TabPanel>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {
    menu: state.visible.menu,
  };
};
const matchDispatchtoProps = (dispatch) => {
  return bindActionCreators(
    {
      changeMenu: changeMenu,
    },
    dispatch
  );
};

export default connect(mapStatetoProps, matchDispatchtoProps)(Menu);
