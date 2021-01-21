import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeWarning, setAllSites } from '../../redux/actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import { request } from '../../requests/index';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    padding: '10px',
    overflow: 'scroll',
    'overflow-x': 'hidden',
    height: '400px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddSite = (props) => {
  const classes = useStyles();

  const { warning, changeWarning } = props;

  const param_site = {
    name_site: '',
    url: '',
    flex_box: '',
    title: '',
    href: '',
    image: '',
    text: '',
    author: '',
    date: '',
    dynamic: false,
    container: '',
  };
  const [site, setSite] = React.useState(param_site);

  const handleChange = (prop) => (event) => {
    setSite({ ...site, [prop]: event.target.value });
  };

  const validateForm = (url) => {
    const urlregex = new RegExp(
      "^(http|https|ftp)://([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$"
    );
    return urlregex.test(url);
  };

  const handleSubmit = async (event) => {
    if (validateForm(site.url)) {
      const flag = await request.Addsite(site);
      if (flag) {
        changeWarning(2);
        setSite(param_site);
      }
    } else {
      changeWarning(1);
    }
  };

  return (
    <form className={classes.form}>
      {warning === 1 ? (
        <Alert
          severity="error"
          onClose={() => {
            changeWarning(0);
          }}
        >
          URL сайта введен неверно!
        </Alert>
      ) : warning === 2 ? (
        <Alert
          severity="success"
          onClose={() => {
            changeWarning(0);
          }}
        >
          Сайт успешно добавлен! Ожидайте проверки сайта в общем списке.
        </Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="namesite"
              name="name_site"
              variant="outlined"
              required
              fullWidth
              id="name_site"
              label="Name site"
              autoFocus
              value={site.name_site}
              onChange={handleChange('name_site')}
              onPaste={handleChange('name_site')}
              helperText="Назовите сайт"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="url"
              label="URL"
              name="url"
              value={site.url}
              onChange={handleChange('url')}
              onPaste={handleChange('url')}
              helperText="Вставьте ссылку на сайт"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="flex_box"
              label="Flex box"
              name="flex_box"
              value={site.flex_box}
              onChange={handleChange('flex_box')}
              onPaste={handleChange('flex_box')}
              helperText="Укажите селектор блока, который можно скролить(Необязательно)"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="container"
              label="Container"
              id="container"
              value={site.container}
              onChange={handleChange('container')}
              onPaste={handleChange('container')}
              helperText="Укажите селектор блока, который содержит в себе текст/изображения/заглавие/автора/время новости(Обязательно)"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="title"
              label="Title"
              id="title"
              value={site.title}
              onChange={handleChange('title')}
              onPaste={handleChange('title')}
              helperText="Укажите селектор блока, который содержит заглавие новости"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="href"
              label="href"
              id="href"
              value={site.href}
              onChange={handleChange('href')}
              onPaste={handleChange('href')}
              helperText="Укажите селектор блока, который содержит ссылку на новость"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="image"
              label="Image"
              id="image"
              value={site.image}
              onChange={handleChange('image')}
              onPaste={handleChange('image')}
              helperText="Укажите селектор блока, который содежит изображения новости"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="text"
              label="Text"
              id="text"
              value={site.text}
              onChange={handleChange('text')}
              onPaste={handleChange('text')}
              helperText="Укажите селектор блока, который содержит текст новости"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="author"
              label="Author"
              id="author"
              value={site.author}
              onChange={handleChange('author')}
              onPaste={handleChange('author')}
              helperText="Укажите селектор блока, который содержит имя автора новости"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="date"
              label="Date"
              id="date"
              value={site.date}
              onChange={handleChange('date')}
              onPaste={handleChange('date')}
              helperText="Укажите селектор блока, который содержит время новости"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="dynamic"
                  color="primary"
                  onChange={(event) => (site.dynamic = event.target.checked)}
                />
              }
              label="Я добавляю динамический сайт."
            />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Добавить
          </Button>
        </Grid>
      )}
    </form>
  );
};

const mapStatetoProps = (state) => {
  return {
    warning: state.visible.warning,
    sites: state.sites,
  };
};

const matchDispatchtoProps = (dispatch) => {
  return bindActionCreators(
    {
      changeWarning: changeWarning,
      setAllSites: setAllSites,
    },
    dispatch
  );
};

export default connect(mapStatetoProps, matchDispatchtoProps)(AddSite);
