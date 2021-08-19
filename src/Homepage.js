import React from 'react';
import './style.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import 'react-awesome-button/dist/themes/theme-red.css';
import { Link } from 'react-router-dom';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.genereaza()
    };
    this.socket = this.props.socket;
    this.genereaza = this.genereaza.bind(this);
  }
  genereaza() {
    var link1 = 'https://react-upk3at.stackblitz.io/game?';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 1; i <= 10; i++) {
      link1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.setState({ link: link1 });
    //this.socket.emit('invite', window.location.search.substring(1));
    return link1;
  }
  render() {
    return (
      <div>
        <h1>Chess.com</h1>
        <p>
          {' '}
          Send this link to your friend:
          <input
            type="text"
            value={this.state.link}
            size="30"
            autoFocus
            readOnly
          />
        </p>
        <Link
          to={{
            pathname: '/game',
            search: this.state.link.substring(this.state.link.length - 10),
            state: { fromDashboard: true }
          }}
        >
          <AwesomeButton> New Game </AwesomeButton>
        </Link>
      </div>
    );
  }
}
