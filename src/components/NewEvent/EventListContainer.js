import React from 'react';
import PropTypes from 'prop-types';

// Material
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  root: {
    width: '360px',
    height: '100%'
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#3f51b5',
  },
  checkbox: {
    width: 36,
    height: 36
  }
};

class EventListContainer extends React.Component {
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        {/* <List>
          {[0, 1, 2, 3, 4, 5, 6].map(value => (
            <ListItem key={value} dense button className={classes.listItem}>
              <Avatar className={classes.purpleAvatar}>OP</Avatar>
              <ListItemText primary={`User Name ${value + 1}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  className={classes.checkbox}
                  onChange={this.handleToggle(value)}
                  checked={this.state.checked.indexOf(value) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List> */}
      </Paper>
    );
  }
}


EventListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventListContainer);
