import React from 'react';
import './hp.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.genereaza(),
      random: true,
      cautare: false,
      gasit: false
    };
    this.socket = this.props.socket;
    this.genereaza = this.genereaza.bind(this);
    this.joaca = this.joaca.bind(this);
  }
  componentDidMount() {
    this.socket.on(
      'gasit',
      function(cod) {
        this.setState({ link: cod });
        this.setState({ gasit: true });
      }.bind(this)
    );
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
  joaca() {
    this.setState({ random: false });
    this.setState({ cautare: true });
    var nimic = null;
    this.socket.emit('cautare', nimic);
  }
  render() {
    return (
      <div>
        {this.state.gasit && (
          <Redirect
            to={{
              pathname: '/game',
              search: this.state.link,
              state: { fromDashboard: true }
            }}
          />
        )}
        <nav id="title">
          <h1>Chess.com</h1>
        </nav>
        <p id="invite">
          {' '}
          Invite your friend with this link !
          <input
            id="link"
            type="text"
            value={this.state.link}
            size="30"
            autoFocus
            readOnly
          />
          <Link
            to={{
              pathname: '/game',
              search: this.state.link.substring(this.state.link.length - 10),
              state: { fromDashboard: true }
            }}
          >
            <AwesomeButton className="ms-2"> Play with friend</AwesomeButton>
          </Link>
        </p>
        {this.state.random && (
          <AwesomeButton className="ms-3" onPress={this.joaca}>
            {' '}
            Play with random{' '}
          </AwesomeButton>
        )}
        {this.state.cautare && <h2> Searching for player... </h2>}
      </div>
    );
  }
}
