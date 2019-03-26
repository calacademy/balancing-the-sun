import React, {Component} from 'react'
import '../style/Loader.css'

class Loader extends Component {

  componentDidUpdate(prevProps, prevState) {
    var _this = this
    if (this.props.dataReady !== prevProps.dataReady) {
      setTimeout(function() {
        _this.props.handlerLoadComplete()
      }, 30000)
    }
  }

  render() {

    let animFolate = []
    let animVitamin = []

    for (let i = 0; i < 450; i++) {
      let fiver = ('0000' + i).slice(-5)
      animFolate.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + "animation/folate/BalancingTheSun-Folate_v05_" + fiver + ".png"} alt="" />
      )
      animVitamin.push(
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + "animation/vitamin/BalancingTheSun-VitaminD_v04_" + fiver + ".png"} alt="" />
      )
    }

    return(
      <div id="loader">
        <div id="asset-container">
          <div id="loader-source-images">
            <div id="map-1" />
            <div id="map-2" />
            <div id="map-3" />
            <div id="map-4" />
          </div>
          <div id="loader-animation-images">
            {animFolate}
            {animVitamin}
          </div>
          <p className="a">Test123!@#</p>
          <p className="b">Test123!@#</p>
          <p className="c">Test123!@#</p>
          <p className="d">Test123!@#</p>
          <p className="e">Test123!@#</p>
          <p className="f">Test123!@#</p>
          <p className="g">Test123!@#</p>
          <p className="h">Test123!@#</p>
          <p className="i">測試中文字體</p>
          <p className="j">測試中文字體</p>
          <p className="k">測試中文字體</p>
        </div>
        <div id="message-container">
          <p>This exhibit is being updated.</p>
        </div>
      </div>
    )
  }

}

export default Loader
