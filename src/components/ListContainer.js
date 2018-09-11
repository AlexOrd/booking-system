import React from 'react';
import PropTypes from 'prop-types';

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

const styles = {
  root: {
    width: '100%',
    maxWidth: 360
  },
};

const ListContainer = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <List>
        <ListItem button>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText inset primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem button>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText inset primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem button>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
          <ListItemText inset primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
        <ListItem button>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText inset primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem button>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText inset primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem button>
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
