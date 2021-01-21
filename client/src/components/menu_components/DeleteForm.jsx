import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeDelete, setAllSites, deleteSite } from '../../redux/actions';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { request } from '../../requests/index';

const DeleteForm = (props) => {
  const { deleted_site } = props;
  const { changeDelete } = props;
  const { deleteSite } = props;

  const delSite = async (site) => {
    await request.deleteSite(site.id_site);
    deleteSite({});
    changeDelete(false);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Вы уверены, что хотите удалить сайт <br /> '{deleted_site.name_site}'?
        </Typography>
        <div>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => delSite(deleted_site)}
              >
                Да
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => changeDelete(false)}
              >
                Нет
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {
    deleted_site: state.sites.deleted_site,
  };
};

const matchDispatchtoProps = (dispatch) => {
  return bindActionCreators(
    {
      changeDelete: changeDelete,
      setAllSites: setAllSites,
      deleteSite: deleteSite,
    },
    dispatch
  );
};

export default connect(mapStatetoProps, matchDispatchtoProps)(DeleteForm);
