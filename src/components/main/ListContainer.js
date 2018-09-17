import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

// Material
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import ImageIcon from '@material-ui/icons/Image';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import theme from './../muiTheme';

const styles = {
  root: {
    width: theme.spacing.width,
    maxWidth: theme.spacing.listContainerMaxWidth
  },
};

const ListContainer = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <List>
        <ListItem component={Link} to="/info" button>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText inset primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem component={Link} to="/info" button>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText inset primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem component={Link} to="/info" button>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
          <ListItemText inset primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
        <ListItem component={Link} to="/info" button>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText inset primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem component={Link} to="/info" button>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText inset primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem component={Link} to="/info" button>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
          <ListItemText inset primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </Paper>
  );
};

ListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListContainer);
