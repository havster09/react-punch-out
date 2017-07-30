import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Loop, Stage } from 'react-game-kit/native';
import PistonHurricane from './PistonHurricane';
import { reduceNpcHealth, setNpcState } from './Actions';

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.dimensions = Dimensions.get('window');

    this.handleNpcHit = this.handleNpcHit.bind(this);
    this.handleNpcStateChange = this.handleNpcStateChange.bind(this);
  }

  handleNpcHit(damage) {
    this.props.reduceNpcHealth(damage);
  }

  handleNpcStateChange(state) {
    this.props.setNpcState(state);
  }

  render() {
    const { npcHealth, npcState } = this.props;
    return (
      <Loop>
        <Stage
          width={this.dimensions.width}
          height={this.dimensions.height}
          style={{ backgroundColor: '#fff' }}
        >
          <Text style={{ marginTop: 40 }}>
            {npcHealth}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <PistonHurricane
              npcState={npcState}
              onNpcStateChange={this.handleNpcStateChange}
              onNpcHit={this.handleNpcHit} />
          </View>
        </Stage>
      </Loop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => ({
  npcHealth: state.npcHealth,
  npcState: state.npcState
});

const mapActionsToProps = dispatch => ({
  reduceNpcHealth(damage) {
    dispatch(reduceNpcHealth(damage));
  },
  setNpcState(state) {
    dispatch(setNpcState(state));
  }
});

export default (Main = connect(mapStateToProps, mapActionsToProps)(Main));

// todo make npcState into an object add repeat value
// todo add idle stance frame
// todo extend sprite to hold last frame
// todo add touch events for player attacks
