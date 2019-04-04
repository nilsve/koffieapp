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

  renderBody(authData) {
    const { drinks } = this.state

    return <div className="HomeScreen">
      <Typography component="h4" variant="h2" gutterBottom>Welkom {authData.userInfo.username}</Typography>
      <Grid container className="container" spacing={40}>
        <Grid item xs={12}>
          <Grid container className="drinks" justify="center" spacing={40}>
            {drinks.map((drink) => (
              <Grid key={drink.drink} item>
                <Card elevation={3}>
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
