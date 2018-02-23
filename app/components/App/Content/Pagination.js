import React from 'react';
import {Link} from 'react-router';

class Pagination extends React.Component {
  constructor(props){
    super(props);
    this.appStore = props.flux.getStore('AppStore');

    this.state = this.appStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  componentDidMount() {
    this.appStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.appStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClickItem(){
    window.scrollTo(window.scrollX, 0);
  }

  render(){
    let { maxPages, currentPage, query } = this.props;

    var navs = [];
    for ( let i = Math.min(currentPage + 2, maxPages); i >= currentPage-2; --i ) {
      if ( i <= 0 ) { break; }

      let cls = '';
      if ( i === currentPage  ) {
        cls = "current";
        if ( i != maxPages ) {
          navs.push(<Link to={"/" + query + "/" + (i+1) } key={i+"arrow"} className="arrow">→</Link>);
        }
      }
      if ( i === currentPage - 1 ) {
        navs.push(<Link to={"/" + query + "/" + i} key={i+"arrow"} className="arrow">←</Link>);
      }

      navs.push(
        <Link to={"/" + query + "/" + i} key={i} className={cls} onClick={this.handleClickItem}>{i}</Link>
      );
    }

    return (
      <div className="pagination">{navs.reverse()}</div>
  )}
}

export default Pagination;
