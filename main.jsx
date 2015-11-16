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


class BasicArticlePuff extends React.Component {
  render() {
    return (
      <div className='basic-article'>
        <h1 className='title'>
          {this.props.article.title}
        </h1>
        <p className='ingress'>
          {this.props.article.ingress}
        </p>
        <p className='text'>
          {this.props.article.text}
        </p>
        <img className='image' src={this.props.article.images[0]} />
      </div>
    )
  }
}

class ShortArticlePuff extends React.Component {
  render() {
    return (
      <div className='short-article'>
        <h1 className='title'>
          {this.props.article.title}
        </h1>
        <p className='ingress'>
          {this.props.article.ingress}
        </p>
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
      let article = {
        title: 'Tapirs are cool!',
        ingress: 'Tapis have been voted the coolest animal in history',
        text: `
A tapir (/ˈteɪpər/ tay-pər or /təˈpɪər/ tə-peer) is a large, herbivorous mammal, similar in shape to a pig, with a short, prehensile snout. Tapirs inhabit jungle and forest regions of South America, Central America, and Southeastern Asia. The five extant species of tapirs are the Brazilian tapir, the Malayan tapir, the Baird's tapir, the kabomani tapir, and the mountain tapir. The four species that have been evaluated (the Brazilian, Malayan, Baird's and mountain tapir) are all classified as endangered or vulnerable. Their closest relatives are the other odd-toed ungulates, which include horses, donkeys, zebras and rhinoceri.
        `,
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/a/a1/Malayan_Tapir_Sitting.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/TapirAtSDZ.jpg/440px-TapirAtSDZ.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/2/24/Tapirbaby.jpg'
        ]
      };
    return (
      <div className='editor'>
        {this.props.puffs.map(function(Puff) {
          console.log(Puff);
          return React.createElement(Puff, { article: article });
        })}
      </div>
    )
  }
}


class Main extends React.Component {
  render() {
    let puffs = [
      BasicArticlePuff,
      ShortArticlePuff
    ];

    return (
      <div>
        <Searcher/>
        <Editor puffs={puffs}/>
      </div>
    )
  }
}


ReactDOM.render(
  <Main/>,
  document.getElementById('example')
);

