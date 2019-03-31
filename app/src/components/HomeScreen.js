import React from 'react';
import {AuthConsumer} from 'stores/AuthStore';
import {userApi,orderApi} from 'apis';

class HomeScreen extends React.Component {

  state = {
    drink: '',
    group: '',
    allOrders: [],
  }

  async componentDidMount() {
    const result = orderApi.getOrders()
    console.log(result)
    this.setState({
      allOrders:result
    })
  }

  render() {
    return this.renderHomeScreen()
  }

  renderHomeScreen() {    
    const {drink,allOrders} = this.state

    console.log(allOrders)

    return <div className="HomeScreen">
      <div className="Drinks">
        <h3>Dranken</h3>
        <input type="button" value="Zwart" onClick={(pick) => this.handleClick('Zwart')} />
        <input type="button" value="Espresso" onClick={(pick) => this.handleClick('Espresso')} />
        <input type="button" value="Cappuccino" onClick={(pick) => this.handleClick('Cappuccino')} />
        <input type="button" value="Heet water" onClick={(pick) => this.handleClick('Heet water')} />
      </div>
      {allOrders} 
      <div className="Orderbutton">
        <input type="button" value="Bestellen" onClick={this.handleOrder} />
      </div>
      <div>
       <h3>Bestellingen</h3>
        <table className="AllGroupsTable">
          <thead>
            <tr>
              <th><b>Gebruiker</b></th>
              <th><b>Groep</b></th>
              <th><b>Drank</b></th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => <tr><td>{order.user}</td><td>{order.group}</td><td>{order.drink}</td></tr>)}
          </tbody>
        </table>
       </div>
    </div>
  }

  handleClick = async (pick) => {
    this.setState({
      drink: pick
    })
  }

  handleOrder = () => {
    //Stuur shit naar Mongo.
  }
}

export default HomeScreen;


