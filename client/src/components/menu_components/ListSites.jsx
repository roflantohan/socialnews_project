import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import DeleteIcon from '@material-ui/icons/Delete';

import DeleteForm from './DeleteForm';

import { request } from '../../requests/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  selectSites,
  setAllSites,
  deleteSite,
  changeDelete,
} from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll',
    'overflow-x': 'hidden',
    height: '400px',
  },
  list_check: {
    color: 'orange',
  },
  list_ready: {
    color: 'green',
  },
  list_break: {
    color: 'red',
  },
}));

const ListSites = (props) => {
  const classes = useStyles();

  const { all_sites, setAllSites } = props;
  const { selected_sites, selectSites } = props;
  const { del, changeDelete } = props;
  const { deleted_site, deleteSite } = props;

  const handleToggle = (value) => () => {
    const currentIndex = selected_sites.indexOf(value);
    const newChecked = [...selected_sites];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    selectSites(newChecked);
  };

  React.useEffect(() => {
    const loadSites = async () => {
      const data = await request.getSites();
      setAllSites(data);
    };
    loadSites();
  }, [deleted_site, setAllSites]);

  return (
    <List className={classes.root}>
      {del ? (
        <DeleteForm />
      ) : (
        all_sites.map((obj) => {
          const labelId = `checkbox-list-label-${obj.id_site}`;
          return (
            <ListItem
              key={obj.id_site}
              className={
                obj.status === 'work'
                  ? classes.list_ready
                  : obj.status === 'checking'
                  ? classes.list_check
                  : classes.list_break
              }
              button
              onClick={handleToggle(obj.id_site)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selected_sites.indexOf(obj.id_site) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={obj.name_site + ' : ' + obj.status}
              />
              <ListItemSecondaryAction>
                <a href={obj.url} target="_blank" rel="noopener noreferrer">
                  <IconButton edge="end" aria-label="site">
                    <InsertLinkIcon />
                  </IconButton>
                </a>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    deleteSite({
                      id_site: obj.id_site,
                      name_site: obj.name_site,
                    });
                    changeDelete(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      )}
    </List>
  );
};

const mapStatetoProps = (state) => {
  return {
    all_sites: state.sites.all_sites,
    del: state.visible.del,
    deleted_site: state.sites.deleted_site,
    selected_sites: state.sites.selected_sites,
  };
};

const matchDispatchtoProps = (dispatch) => {
  return bindActionCreators(
    {
      selectSites: selectSites,
      setAllSites: setAllSites,
      deleteSite: deleteSite,
      changeDelete: changeDelete,
    },
    dispatch
  );
};

export default connect(mapStatetoProps, matchDispatchtoProps)(ListSites);
