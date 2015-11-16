var React = require('react');
var ReactDOM = require('react-dom');

class SearchField extends React.Component {
  render() {
    return <input value={this.props.query}/>;
  }
}

class SearchResults extends React.Component {
  render() {
    return (
      <ul>
        <li>Result 1</li>
        <li>Result 1</li>
      </ul>
    );
  }
}

class Searcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='searcher'>
        <SearchField query={this.state.query}/>
        <SearchResults query={this.state.results}/>
      </div>
    )
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='editor'>
        <SearchField query={this.state.query}/>
        <SearchResults query={this.state.results}/>
      </div>
    )
  }
}
class Main extends React.Component {
  render() {
    return (
      <div>
        <Searcher/>
        <Editor/>
      </div>
    )
  }
}


ReactDOM.render(
  <Main/>,
  document.getElementById('example')
);

