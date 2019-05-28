import React from 'react';
import {AuthConsumer} from 'stores/AuthStore';
import {userApi, orderApi} from 'apis';
import {Typography, CardMedia, Grid, Card, CardContent, Button, ButtonBase, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import {Americano, Cappuccino, CafeLatte, Espresso, Macchiato, Mocha} from '../assets';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class OrderScreen extends React.Component {

  state = {
    users: [],
    drinks: [],
    choice: '',
    milk: 0,
    sugar: 0,
    username: '',
    password: '',
    dialogOpen: false,
  }

  async componentDidMount() {
    const result = await userApi.getUsers();
    this.setState({
      users: result,
      drinks: [
        {drink: 'Americano', desc: 'Espresso with hot water on top', image: Americano},
        {drink: 'Cappuccino', desc: 'Espresso with steamed milk and foamy milk on top', image: Cappuccino},
        {drink: 'Cafe Latte', desc: 'Single shot of coffee with steamed milk', image: CafeLatte},
        {drink: 'Espresso', desc: 'Small amount of highly concentrated coffee', image: Espresso},
        {drink: 'Macchiato', desc: 'Espresso topped off with foamed milk', image: Macchiato},
        {drink: 'Mocha', desc: 'Latte with added chocolate syrup', image: Mocha},
      ]
    })
  }

  render() {
    return <AuthConsumer>
      {(authData) => this.renderBody(authData)}
    </AuthConsumer>;
  }

  renderBody(authData) {
    const style = {
      height: 250,
    };
    const {drinks, milk, sugar} = this.state
    return <div className="HomeScreen">
    {this.renderDialog()}
      <Typography component="h4" variant="h2" gutterBottom>Welkom {authData.userInfo.username}</Typography>
      <Grid container className="container" spacing={40}>
        <Grid item xs={6}>
          <Grid container className="drinks" justify="flex-start" spacing={40}>
            {drinks.map((drink) => this.renderCard(drink))}
          </Grid>
        </Grid>
        <Grid item xs={6} alignItems="center">
          <Grid container className="sliders" justify="center" alignItems="center" style={style}>
            <Typography variant="h5" component="h2">
              Melk: {milk}
            </Typography>
            <Slider
              value={milk}
              min={0}
              max={3}
              step={1}
              onChange={(e, value) => this.setState({milk: value})}
            />
            <Typography variant="h5" component="h2">
              Suiker: {sugar}
            </Typography>
            <Slider
              value={sugar}
              min={0}
              max={3}
              step={1}
              onChange={(e, value) => this.setState({sugar: value})}
            />
          </Grid>
        </Grid>
        <Grid container className="button" justify="center">
          <Button variant="contained" disabled={!this.state.choice} onClick={this.handleClick}>
            Bestellen
          </Button>
        </Grid>
      </Grid>
    </div>
  }


  renderCard(drink) {
    const style = {
      height: 300,
      width: 200,
      backgroundColor: this.state.choice === drink.drink ? 'lightgrey' : null,
    };
    const styleMedia = {
      height: 150,
      width: 200, 
      paddingTop: 0,
    }
    
    return <Grid key={drink.drink} item>
      <Card style={style}>
        <ButtonBase style={style} onClick={() => this.handleToggleDrink(drink.drink)}>
          <CardContent>
            <CardMedia style={styleMedia}
              component="img"
              image={drink.image}
            />
            <br/>
            <Typography variant="h5" component="h2">
              {drink.drink}
            </Typography>
            <Typography color="textSecondary">
              {drink.desc}
            </Typography>
          </CardContent>
        </ButtonBase>
      </Card>
    </Grid>;
  }

  renderDialog() {
    return <Dialog
      open={this.state.dialogOpen}
      onClose={this.handleClose}
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bestelling geplaatst!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={this.handleClose}>
            Verbergen
        </Button>
      </DialogActions>
    </Dialog>
  }

  handleClose = () => {
    this.setState({dialogOpen: false});
  }

  handleToggleDrink = drink => {
    this.setState({
      choice: this.state.choice !== drink ? drink : null,
    })
  }

  handleClick = async () => {
    const {choice, milk, sugar} = this.state
    const group = '1'
    try {
      await orderApi.order(choice, milk, sugar, group);
      this.setState({dialogOpen: true});
    } catch (err) {
      
    }
  }

  handleUpdateField = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value,
    });
  };
}

export default OrderScreen;
