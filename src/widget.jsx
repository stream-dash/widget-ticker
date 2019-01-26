import {h, Component, createRef} from 'preact';
import cx from 'classnames';
import Marquee from './marquee.jsx';

import StringFormatter from 'quickstring';
import strings from './strings';
import {displayTime, waitTime} from './config';

import styles from './widget.scss';

const {getString} = new StringFormatter(strings);

const stringNames = Object.keys(strings);

export default class Widget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      open: false
    };

    this.key = -1;
    this.marqueeRef = createRef();
  }

  componentDidMount() {
    this.showNextMessage();
  }

  showNextMessage = () => {
    this.key += 1;
    if (this.key > stringNames.length - 1) { this.key = 0; }

    const key = stringNames[this.key];

    this.setState({
      message: getString(key),
      open: true
    }, () => {
      const {current: marquee} = this.marqueeRef;
      marquee.setupMarquee();
      setTimeout(this.hideMessage, displayTime * 1000);
    });
  };

  hideMessage = () => {
    this.setState({
      open: false
    }, () => {
      setTimeout(this.showNextMessage, waitTime * 1000);
    });
  };

  render() {
    const {message, open} = this.state;
    const width = open ? null : 0;
    const animClass = open ? styles.animated : null;

    return (
      <div className={styles.ticker}>
        <img src={require('./images/logo_small.png')} className={animClass} />
        <div className={styles.infoBox} style={{width}}>
          <Marquee text={message} running={open} ref={this.marqueeRef} />
        </div>
      </div>
    );
  }
}
