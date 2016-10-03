import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NoExport from './NoExport'

const Undefined = undefined;
const RandomObject = {what: true};

const fail = () => {
  throw new Error('failure');
}

const RenderError = React.createClass({
  render() {
    fail();
    return <div>Hi</div>
  }
})

const BadReturn = () => ({some: 'thing'})

const BadClick = React.createClass({
  getInitialState() {
    return {on: false}
  },
  render() {
    if (this.state.on) {
      fail();
    }
    return <button onClick={() => this.setState({on: true})}>
      Do not click, this will problem
    </button>
  }
})

const DidMount = React.createClass({
  componentDidMount() {
    fail()
  },
  render: () => <span>Hi</span>
})

const WillMount = React.createClass({
  componentWillMount() {
    fail()
  },
  render: () => <span>Hi</span>
})

const DidUpdate = React.createClass({
  componentDidUpdate() {
    fail()
  },
  render: () => <span>Hi</span>
})

const sources = {
  undefined: `
const Undefined = undefined;
`,
  random: `
const RandomObject = {what: true};
`,
  renderError: `
const RenderError = React.createClass({
  render() {
    fail();
    return <div>Hi</div>
  }
})
`,
  badReturn: `
const BadReturn = () => ({some: 'thing'})
`,
  badClick: `
const BadClick = React.createClass({
  getInitialState() {
    return {on: false}
  },
  render() {
    if (this.state.on) {
      fail();
    }
    return <button onClick={() => this.setState({on: true})}>
      Don't click, this will problem
    </button>
  }
})
`,
}

const routes = {
  undefined: () => <Undefined />,
  random: RandomObject,
  renderError: RenderError,
  badReturn: BadReturn,
  badClick: BadClick,
  didMount: DidMount,
  willMount: WillMount,
  didUpdate: DidUpdate,
}

const styles = {
  link: {
    display: 'block',
    margin: '5px 10px',
  },
}

const Child = React.createClass({
  getInitialState() {
    return {clicked: false};
  },
  handleClick() {
    this.setState({clicked: true});
    this.props.onClick()
  },
  render() {
    return (
      <div style={{padding: 10, border: '1px solid #ccc',
        backgroundColor: this.state.clicked ? 'green' : 'white',
      }}>
      <button onClick={this.handleClick}>
        Click me
      </button>
      </div>
    )
  }
});

const Parent = React.createClass({
  propTypes: {
    numFriends: React.PropTypes.number.isRequired,
  },
  getInitialState() {
    return {clicks: 0}
  },
  render() {
    return (
      <div style={{margin: '0 auto', width: 200, padding: 10, border: '1px solid #ccc'}}>
      Parent clicks: {this.state.clicks}
      <Child onClick={() => this.setState({clicks: this.state.clicks + 1})}/>
      </div>
    );
  }
});
let Nothing = undefined;

class App extends Component {
  constructor() {
    super()
    this.state = {
      tick: false,
      text: ''
    }
  }
  componentDidMount() {
    this.setState({tick: true})
  }
  render() {
    const Route = routes[window.location.search.slice(1)]
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {Object.keys(routes).map(key => (
          <a style={styles.link} key={key} href={"?" + key}>{key}</a>
        ))}
        <input
          placeholder="Input Before Problem"
          value={this.state.text}
          onChange={e => this.setState({text: e.target.value})}
        />
        <br/>
        <br/>
        {this.state.tick && <Route />}
        <br/>
        <br/>
        <input
          placeholder="Input After Problem"
          value={this.state.text}
          onChange={e => this.setState({text: e.target.value})}
        />
        <br/>
        <br/>
        {Route && <pre style={{textAlign: 'left', width: 500, alignSelf: 'center', margin: '0 auto'}}>
          {sources[window.location.search.slice(1)]}
          </pre>}
        <br/>
        <Parent numFriends="none"/>
        {[1,2,3].map(x => <span />)}
        <Nothing
          name={10}
        />
      </div>
    );
  }
}

export default App;
