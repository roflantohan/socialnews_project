import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid key={post.id_post} item xs={12} md={6}>
      <CardActionArea
        component="a"
        href={post.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.author + '/' + post.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.text}
              </Typography>
              <Typography variant="subtitle1" color="primary"></Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};
