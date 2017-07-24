import React from 'react';
import PropTypes from 'prop-types';
import Sprite from './native/components/sprite';
import { Text, View } from 'react-native';

class PistonHurricane extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.pistonHurricaneImage = require('../assets/piston_hurricane.png');

    this.loopID = null;

    this.state = {
      npcState: 2,
      loop: false,
      spritePlaying: true,
      ticksPerFrame: 10,
      hatched: false,
      dead: false,
      direction: 1,
      hasStopped: 0,
      hasHit: 0
    };
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.aiLoop.bind(this));
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  shouldComponentUpdate() {
    return true;
  }

  aiLoop() {
   console.log(this.context.loop.loopID);
     if(this.context.loop.loopID && this.context.loop.loopID % 100 === 1) {
       const randomState = Math.floor(Math.random() * 5);
       this.props.onNpcStateChange(randomState);
     }

    // this.props.onNpcHit(30);
  }

  handlePlayStateChanged = state => {
    this.setState(
      Object.assign({}, this.state, {
        spritePlaying: state ? true : false
      })
    );
  };

  render() {
    const {npcState} = this.props;
    return (
      <View>
        <Sprite
          repeat={true}
          onPlayStateChanged={this.handlePlayStateChanged}
          src={this.pistonHurricaneImage}
          scale={2}
          state={npcState}
          steps={[
            3, //0 idle
            1, //1 jab
            2, //2 cross
            2, //3 uppercut
            1  //4 body_jab
          ]}
          offset={[0, 0]}
          tileWidth={216}
          tileHeight={216}
          ticksPerFrame={this.state.ticksPerFrame}
        />
      </View>
    );
  }
}

PistonHurricane.propTypes = {
  onNpcHit: PropTypes.func,
  onNpcStateChange: PropTypes.func,
  npcState: PropTypes.number
};
PistonHurricane.contextTypes = {
  loop: PropTypes.object,
  engine: PropTypes.object,
  scale: PropTypes.number
};

export default PistonHurricane;
