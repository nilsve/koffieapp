import React from 'react';
import {AuthConsumer} from 'stores/AuthStore';
import {userApi} from 'apis';
import {Typography, Grid, Card, CardContent, CardActions, Button} from '@material-ui/core';

class HomeScreen extends React.Component {

  state = {
    users: [],
    drinks: [],
    username: '',
    password: '',
  }

  async componentDidMount() {
    const result = await userApi.getUsers();

    this.setState({
      users : result,
      drinks: [
        {drink: 'Koffie',     desc: 'Gewoon zwarte koffie'},
        {drink: 'Cappucino',  desc: 'Romig met een shot espresso'},
        {drink: 'Latte Macchiato',  desc: 'Heel veel melk en espresso'},
        {drink: 'Latte',  desc: 'Veel te veel melk'},
      ]
    })
  }

  render() {
    return <AuthConsumer>
      {(authData) => this.renderBody(authData)}
    </AuthConsumer>;
  }

  handleChange = key => (value) => {
    this.setState({
      [key]: value,
    });
  };

  renderBody(authData) {
    const { drinks, spacing } = this.state

    return <div className="HomeScreen">
      <h1>Welkom {authData.userInfo.username}</h1>
      <Grid container className="container" spacing={40}>
        <Grid item xs={12}>
          <Grid container className="drinks" justify="center" spacing={40}>
            {drinks.map((drink) => (
              <Grid key={drink.drink} item>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {drink.drink}
                    </Typography>
                    <Typography color="textSecondary">
                      {drink.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button>
                      Kies {drink.drink}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

    </div>
  }

  handleUpdateField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value,
    });
  };
}

export default HomeScreen;
