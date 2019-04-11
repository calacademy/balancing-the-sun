import React, { Component } from 'react'
import '../style/AttractAnimation.css'

class AttractAnimation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      filebase: '',
      frames: 0
    }
  }

  componentDidMount() {
    if (this.props.currentAnim === 'attract') {
      this.setState({
        name: 'attract',
        filebase: 'BalanceAttract_',
        frames: 895
      })
    }
  }

  render() {

    let images = []

    if (this.props.dataReady) {

      for (let i = 0; i < this.state.frames; i++) {
        let fiver = ('0000' + i).slice(-5)
        images.push(
          <img
            key={i}
            src={process.env.REACT_APP_ANIMATION_PATH + "animation/" + this.state.name + "/" + this.state.filebase + "" + fiver + ".jpg"}
            alt="" />
        )
      }

    }

    return(
      <div id="attract-animation">
        <div
          id="attract-animation-container-images"
          className={this.state.name === this.props.currentAnim ? 'play-' + this.state.name : ''}>
          {images}
        </div>
      </div>
    )
  }
}

export default AttractAnimation
