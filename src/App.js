import React, { Component } from "react";
import "./App.css";
import data from "./contacts.json";

class App extends Component {
  state = {
    contacts: data.slice(0, 5),
    displayContacts: data.splice(0, 5),
    search: ""
  };

  addRandomActor = () => {
    const randomNo = Math.floor(Math.random() * data.length);
    let randomContact = data.splice(randomNo, 1);
    // set state takes two parameters. In this case first one is the object that defines changes we want to make to the state and the second one is the function that we want to execute after the state is changed
    this.setState(
      {
        contacts: [randomContact[0], ...this.state.contacts]
      },
      this.search // this is executed after the state is set to make sure that the filter is applied to new contacts too
    );
  };

  sortByName = () => {
    let copyOfTheContacts = [...this.state.contacts];
    copyOfTheContacts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    this.setState(
      {
        contacts: copyOfTheContacts,
        displayContacts: copyOfTheContacts
      },
      this.search
    );
  };

  sortByPopularity = () => {
    let copyOfTheContacts = [...this.state.contacts];
    copyOfTheContacts.sort((a, b) => b.popularity - a.popularity);
    this.setState(
      {
        contacts: copyOfTheContacts
      },
      this.search
    );
  };

  deleteContact = actor => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(el => el.id !== actor.id)
      }),
      this.search
    );
  };

  search = () => {
    let filteredContacts = this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.search)
    );
    this.setState({
      displayContacts: filteredContacts
    });
  };

  handleChange = e => {
    // here we set the search term to the state
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      this.search
    );
  };

  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <input
          type="text"
          name="search"
          onChange={this.handleChange}
          value={this.state.search}
        />
        <button onClick={this.addRandomActor}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort By Name</button>
        <button onClick={this.sortByPopularity}>Sort By Popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.displayContacts.map((actor, index) => {
              return (
                <tr key={actor.id}>
                  <td>
                    <img
                      src={actor.pictureUrl}
                      alt={actor.name}
                      style={{ height: "200px" }}
                    />
                  </td>
                  <td>{actor.name}</td>
                  <td>{actor.popularity.toFixed(2)}</td>
                  <td>
                    <button onClick={() => this.deleteContact(actor)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
