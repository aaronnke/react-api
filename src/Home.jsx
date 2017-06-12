import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.css';

function Button(props) {
  const classes = props.id === props.active ? 'Scroller Scroller--active' : 'Scroller';
  return (
    <div className={classes} />
  );
}

Button.propTypes = {
  id: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
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
    }, 1500);
    return true;
  }

  render() {
    const pageScroll = {
      transform: `translateY(${this.state.scroll}px)`,
    };

    const buttons = [0, 1, 2].map(index =>
      (
        <Button key={index} id={index} active={this.state.activeButton} />
      ),
    );

    return (
      <div className="PageWrapper">
        <div className="PageContainer" style={pageScroll} onWheel={this.handleScroll}>
          <div className="Page Page--1"> Hi </div>
          <div className="Page Page--2"> Bye </div>
          <div className="Page Page--3"> Hi again </div>
        </div>
        <div className="ScrollerContainer">
          {buttons}
        </div>
      </div>
    );
  }
}

export default Home;
