var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

class SearchField extends React.Component {
  render() {
    return <input value={this.props.query}/>;
  }
}

class SearchResults extends React.Component {
  render() {
    return (
      <ul>
        <li draggable='true'>Result 1</li>
        <li draggable='true'>Result 1</li>
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
   var puffClass = classNames({
      'puff': true,
      'basic-article': true,
      'editable': this.props.editable
    });
    return (
      <div className={puffClass}>
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
   var puffClass = classNames({
      'puff': true,
      'short-article': true,
      'editable': this.props.editable
    });
    return (
      <div className={puffClass}>
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
    return (
      <div className='editor'>
        {this.props.puffs.map(function(Puff, i) {
          console.log(i);
          return React.createElement(Puff, {article: Data.getArticle(i), editable: true});
        })}
      </div>
    )
  }
}


class Main extends React.Component {
  render() {
    let puffs = [
      ShortArticlePuff,
      BasicArticlePuff,
      ShortArticlePuff,
      BasicArticlePuff,
      BasicArticlePuff
    ];

    return (
      <div>
        <Searcher/>
        <Editor puffs={puffs}/>
      </div>
    )
  }
}

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

let placeholder = {
  title: 'Placeholder',
  ingress: 'placeholder',
  text: `
  placeholder
  `,
  images: [
    'images/placeholder.png',
    'images/placeholder.png',
    'images/placeholder.png'
  ]
}

let Data = {
  articles: [article, article, article, article],

  getArticle: function(i) {
    return this.articles[i] || placeholder;
  }
};


ReactDOM.render(
  <Main/>,
  document.getElementById('example')
);

