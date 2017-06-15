import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Home.css';

function ScrollerContainer(props) {
  const scrollers = [];
  const activeButton = props.activeButton;
  for (let i = 0; i < props.buttonCount; i += 1) {
    const className = i === activeButton ? 'Scroller Scroller--active' : 'Scroller';
    const scroller = <li key={i} className={className} />;
    scrollers.push(scroller);
  }

  return (
    <ol className="ScrollerContainer">
      {scrollers}
    </ol>
  );
}

ScrollerContainer.propTypes = {
  buttonCount: PropTypes.number.isRequired,
  activeButton: PropTypes.number.isRequired,
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      scroll: 0,
      isScrolling: false,
      height: window.innerHeight,
      activeButton: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  handleScroll(e) {
    if (this.state.isScrolling) return false;
    this.setState({ isScrolling: true });
    const height = this.state.height;
    if (e.deltaY > 0 && this.state.scroll > -(height * 2)) {
      this.setState(prevState =>
        ({
          scroll: prevState.scroll - height,
          activeButton: prevState.activeButton + 1,
        }),
      );
    } else if (e.deltaY < 0 && this.state.scroll < 0) {
      this.setState(prevState => ({
        scroll: prevState.scroll + height,
        activeButton: prevState.activeButton - 1,
      }));
    }
    setTimeout(() => {
      this.setState({ isScrolling: false });
    }, 1200);
    return true;
  }

  render() {
    const pageScroll = {
      transform: `translateY(${this.state.scroll}px)`,
    };

    return (
      <div className="PageWrapper">
        <div className="PageContainer" style={pageScroll} onWheel={this.handleScroll}>
          <div className="Page Page--1"> Find inspiration. </div>
          <div className="Page Page--2"> Work with professionals. </div>
          <div className="Page Page--3"> Purchase products. </div>
        </div>
        <ScrollerContainer buttonCount={3} activeButton={this.state.activeButton} />
      </div>
    );
  }
}

export default Home;
