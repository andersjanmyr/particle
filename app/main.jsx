var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

class SearchField extends React.Component {
  render() {
    return <input value={this.props.query}/>;
  }
}

class Result extends React.Component {
  constructor() {
    super()
    this.handleDragStart = (e) => {
      e.target.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = 'move';
      console.log('dragStart', this.props.url);
      e.dataTransfer.setData('text/plain', this.props.url);
    }
    this.handleDragEnd = (e) => e.target.style.opacity = '1';
   }

  render() {
    return (
      <div draggable='true' onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
        RESULT {this.props.url}
      </div>
    );
  }
}

class SearchResults extends React.Component {
  render() {
    return (
      <ul>
        <Result url='/articles/1'/>
        <Result url='/articles/2'/>
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

class Puff extends React.Component {
  constructor(puffClass) {
    super()
    let classes = {
      'puff': true,
      // editable: this.props.editable
    }
    classes[puffClass] = true;
    this.classes = classNames(classes);
    this.handleDragEnd = (e) => e.target.style.opacity = '1';
  }

  preventDefault(e) {
    e.preventDefault();
  }

  handleDrop(e) {
    e.preventDefault();
    console.log('handleDrop', e, e.nativeEvent, e.dataTransfer);
    console.log('dataTransfer', e.dataTransfer.files.length, e.dataTransfer.files[0]);
    console.log('data', e.dataTransfer.getData('text/plain'));
  }

}

class BasicArticlePuff extends Puff {
  constructor() {
    super('basic-article')
  }

  render() {
    return (
      <div className={this.classes} onDragOver={this.preventDefault} onDrop={this.handleDrop}>
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

class ShortArticlePuff extends Puff {
  constructor() {
    super('short-article')
  }

  render() {
    return (
      <div className={this.classes}>
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


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getArticle(i) {
    return this.props.articles[i] || placeholder;
  }

  render() {
    return (
      <div className='editor'>
        {this.props.puffs.map(function(puff, i) {
          console.log(i);
          return React.createElement(puff, {article: this.getArticle(i), editable: true});
        }, this)}
      </div>
    )
  }
}


class Main extends React.Component {
  render() {

    return (
      <div>
        <Searcher/>
        <Editor puffs={puffs} articles={this.props.articles}/>
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

let Data = {
  articles: [article, article, article, article],

};

let puffs = [
  ShortArticlePuff,
  BasicArticlePuff,
  ShortArticlePuff,
  BasicArticlePuff,
  BasicArticlePuff
];

ReactDOM.render(
  <Main puffs={puffs} articles={Data.articles}/>,
  document.getElementById('example')
);

