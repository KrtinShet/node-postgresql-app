import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { useParams } from 'react-router';

import useAuthor from '../../containers/Author/useAuthor';
import useBook from '../../containers/Book/useBook';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 560,
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
  saveBtn: {
    fontSize: 12,
    textTransform: 'capitalize',
    marginTop: theme.spacing(2),
  },
}));

const Author = () => {
  const authorStore = useAuthor();
  const bookStore = useBook();

  const classes = useStyles();

  const { id } = useParams();

  useEffect(() => {
    authorStore.fetchAuthorApi(id);
    bookStore.fetchBookListApi();
  }, [id]);

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {authorStore.state.author.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              <Chip
                className={classes.chip}
                label={`${authorStore.state.author.books &&
                  authorStore.state.author.books.length} books`}
              />
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Select
          isMulti
          name="books"
          className="basic-multi-select"
          classNamePrefix="select"
          options={bookStore.state.booksList}
          value={authorStore.state.author.books}
          onChange={authorStore.handleAuthorData}
        />
      </div>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        className={classes.saveBtn}
        onClick={() => authorStore.updateAuthorApi(authorStore.state.author)}
      >
        Save Author
      </Button>
    </div>
  );
};

export default Author;
