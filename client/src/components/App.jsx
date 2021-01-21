import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setPosts,
  selectSites,
  setLastSites,
  addPosts,
} from '../redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Header from './main_page_components/Header';
import Discription from './main_page_components/Discription';
import Post from './main_page_components/Post';
import Footer from './main_page_components/Footer';
import Menu from './menu_components/Menu';

import { request } from '../requests/index';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  checkout: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    'background-color': 'rgba(0,0,0,0.5)',
    'z-index': 1,
  },
}));

const App = (props: any) => {
  const classes = useStyles();

  const { last_sites, setLastSites } = props;
  const { selected_sites } = props;
  const { posts, setPosts, addPosts } = props;
  const { menu } = props;

  const loadMorePosts = async (sites) => {
    const change = [];
    sites.map(async (site) => {
      const data = await request.getContent(site);
      if (data.length) {
        addPosts(data);
        change.push({
          id_site: data[data.length - 1].id_site,
          id_post: data[data.length - 1].id_record,
        });
      }
    });
    if (change.length) setLastSites(change);
  };

  React.useEffect(() => {
    const loadPosts = async (sites) => {
      const change = [];
      const content = [];
      sites.map(async (site) => {
        const data = await request.getContent({ id_site: site, id_post: 0 });
        if (data.length) {
          content.push(...data);
          change.push({
            id_site: data[data.length - 1].id_site,
            id_post: data[data.length - 1].id_record,
          });
        }
      });
      setPosts(content);
      setLastSites(change);
    };

    loadPosts(selected_sites);
  }, [selected_sites, setPosts, setLastSites]);

  return (
    <React.Fragment>
      {menu ? (
        <div className={classes.checkout}>
          <Menu />
        </div>
      ) : (
        ''
      )}

      <CssBaseline />
      <Container maxWidth="lg">
        <Header className="overlay" />

        <main>
          <Discription />

          <Grid container spacing={4}>
            {!posts.length ? (
              <Grid>
                <Typography variant="h5" color="inherit" paragraph>
                  Выберите сайты для просмотра
                </Typography>
              </Grid>
            ) : (
              posts.map((post) => <Post key={post.id_post} post={post} />)
            )}
          </Grid>
          <br />
          {posts.length ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => loadMorePosts(last_sites)}
            >
              Ещё
            </Button>
          ) : (
            ''
          )}
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return {
    posts: state.posts,
    selected_sites: state.sites.selected_sites,
    menu: state.visible.menu,
    last_sites: state.sites.last_sites,
  };
};

const matchDispatchtoProps = (dispatch) => {
  return bindActionCreators(
    {
      setPosts: setPosts,
      selectSites: selectSites,
      setLastSites: setLastSites,
      addPosts: addPosts,
    },
    dispatch
  );
};

export default connect(mapStatetoProps, matchDispatchtoProps)(App);
