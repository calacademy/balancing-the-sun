import React, { Component } from 'react'
import '../style/Animation.css'
import Label from './Label'

class Animation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      filebase: '',
      frames: 0,
      animLeft: 0,
      dataLabels: null
    }
  }

  componentDidMount() {
    setInterval(() => this._animationState(), 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentPopup !== this.props.currentPopup) {

      if (this.props.currentPopup === 'folate') {
        let labels = Object.values(this.props.parsedDataBasics).filter((item) => {
          return item[0]["Key"]["#markup"].indexOf("animation-label-folate") !== -1
        })
        this.setState({
          name: 'folate',
          filebase: 'BalancingTheSun-Folate_v05_',
          frames: 450,
          dataLabels: labels
        })
      }
      else if (this.props.currentPopup === 'vitamin') {
        let labels = Object.values(this.props.parsedDataBasics).filter((item) => {
          return item[0]["Key"]["#markup"].indexOf("animation-label-vitamin") !== -1
        })
        this.setState({
          name: 'vitamin',
          filebase: 'BalancingTheSun-VitaminD_v04_',
          frames: 450,
          dataLabels: labels
        })
      }
      else {
        this.setState({
          name: '',
          filebase: '',
          frames: 0,
          dataLabels: null
        })
      }


    }
  }

  _animationState() {
    let pos = window.getComputedStyle(document.querySelector('#container-images')).left
    pos = pos.replace('px', '')
    pos = parseInt(pos)
    this.setState({
      animLeft: pos
    })
  }

  render() {

    const _this = this
    let images = []
    let labels = []

    if (this.props.dataReady) {

      for (let i = 0; i < this.state.frames; i++) {
        let fiver = ('0000' + i).slice(-5)
        images.push(
          <img
            key={i}
            src={"/animation/" + this.state.name + "/" + this.state.filebase + "" + fiver + ".png"}
            alt="" />
        )
      }

      if (this.state.dataLabels) {
        this.state.dataLabels.forEach((item, i) => {
          labels.push(
            <Label
              key={i}
              dataReady={this.props.dataReady}
              language={_this.props.language}
              dataLabel={item[0]}
              animLeft={this.state.animLeft}
            />
          )
        })
      }

    }

    return(
      <div id="animation">

        <div id="label-container">
          {labels}
        </div>

        <div
          id="container-images" className={this.state.name === this.props.currentPopup ? 'play-' + this.state.name : ''}>
          {images}
        </div>
      </div>
    )
  }
}

export default Animation
