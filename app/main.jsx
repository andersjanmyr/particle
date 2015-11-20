var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var $ = require('jquery');

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuery = (e) => {
      this.props.onQuery(e.target.value);
    }
  }

  render() {
    return <input onChange={this.handleQuery}/>;
  }
}

class Result extends React.Component {
  constructor() {
    super()
    this.handleDragStart = (e) => {
      e.target.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = 'move';
      console.log('dragStart', this.props.article.url);
      e.dataTransfer.setData('text/plain', this.props.article.url);
    }
    this.handleDragEnd = (e) => e.target.style.opacity = '1';
   }

  render() {
    return (
      <li className='search-result' draggable='true' onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
        <img className='image' src={this.props.article.images[0]} />
        <h1 className='title'>
          {this.props.article.title}
        </h1>
        <p className='ingress'>
          {this.props.article.ingress}
        </p>
      </li>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className='search-results'>
        {this.props.articles.map(function(article) {
            return <Result article={article}/>
          })}
      </ul>
    );
  }
}

class Searcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      articles: []
    };
    this.findArticle = (filter) => {
      this.props.data.articles.find(filter).then((articles) => {
        this.setState({
          query: filter,
          articles: articles
        });
      })
    }
    this.findArticle()
    this.onQuery = this.findArticle
  }



  render() {
    return (
      <div className='searcher'>
        <SearchField onQuery={this.onQuery}/>
        <SearchResults articles={this.state.articles}/>
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
    let url = e.dataTransfer.getData('text/plain');
    console.log('url', url);
    $.get(url).then((data) => {
      console.log(data.length, data);
    })
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
          return React.createElement(puff, {article: this.getArticle(i), editable: true});
        }, this)}
      </div>
    )
  }
}


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      puffs: props.data.puffs,
      articles: []
    }

    this.props.data.articles.find().then((articles) => {
      this.setState({
        articles: articles
      });
    })
  }

  render() {

    return (
      <div>
        <Searcher data={this.props.data}/>
        <Editor puffs={this.state.puffs} articles={this.state.articles}/>
      </div>
    )
  }
}

class Rest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  find(filter) {
    if (!filter) filter=''
    return $.get(`${this.baseUrl}?filter=${filter}`)
  }
}

let Data = {
  articles: new Rest('/api/articles'),
  puffs: [
    ShortArticlePuff,
    BasicArticlePuff,
    ShortArticlePuff,
    BasicArticlePuff,
    BasicArticlePuff
  ]
};


ReactDOM.render(
  <Main data={Data}/>,
  document.getElementById('example')
);

