let muiTheme =  {
  fontFamily: 'Roboto',
  fontSize: '64px',
  palette: {
    primary1Color: '#1958A8',
    accent1Color: "#0B314F",
    secondaryColor: '#EE3361',
    textColor: '#FFFFFF',
  },
  spacing: {
    horizontal: 45,
    vertical: 15,
    chipsSpacing: 8,
    padding: 5,
    width: '100%',
    mediaHeightSmall: 170,
    mediaHeightLarge: 330,
    textHeight: 100,
    cardMaxWidth: 650,
    cardMinWidth: 300,
    listContainerMaxWidth: 360
  },
  text: {
    title: 18,
    subtitle: 12,
    input: '2em',
    form: {
      formInput: {
        fontSize: 25
      },
      form2Input: {
        fontSize: 25,
        width: '73%'
      },
      formLabel: {
        fontSize: 24
      },
      formGroup: {
        width: '380px',
        display: 'flex',
        flexDirection: 'column'
      },
      formControl: {
        width: '230px',
        fontSize: '0.8em'
      }
    }
  },

  root: {
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingBottom: '5px',
    paddingTop: '5px',
    width: 1014,
    height: 590,
    display: 'flex',
    justifyContent: 'space-between'
  },

  container: {
    width: '100%',
    height: '330px'
  },
  components: {
    progressBar: {
      position: 'absolute',
      left: '580px',
      margin: '10px',
      height: 50,
      width: 50,
    },
    roomsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap'
    },
    chipsContainer: {
      display: 'flex',
      height: '220px',
      width: '950px',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    clockCard: {
      width: '350px',
      height: '170px',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    calendar: {
      display: 'block',
      '&>div':
        {
          border: 'none',
          borderBottom: '1px solid black',
          fontFamily: 'Roboto',
          fontSize: '1.5em',
        },
    },
    chart: {
      display: 'flex'
    }
  }
};

export default muiTheme


