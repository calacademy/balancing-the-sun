import React, {Component} from 'react'
import '../style/Loader.css'

class Loader extends Component {

  componentDidUpdate(prevProps, prevState) {
    var _this = this
    if (this.props.dataReady !== prevProps.dataReady) {
      setTimeout(function() {
        _this.props.handlerLoadComplete()
      }, 60000)
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
        <img key={i} src={process.env.REACT_APP_ANIMATION_PATH + "animation/vitamin/BalancingTheSun-VitaminD_v05_" + fiver + ".png"} alt="" />
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
            <div id="person-1" />
            <div id="person-2" />
            <div id="person-3" />
            <div id="person-4" />
            <div id="person-5" />
            <div id="person-6" />
            <div id="person-7" />
            <div id="person-8" />
            <div id="person-9" />
            <div id="person-10" />
            <div id="person-11" />
            <div id="person-12" />
            <div id="person-13" />
            <div id="person-14" />
            <div id="person-15" />
            <div id="person-16" />
            <div id="person-17" />
            <div id="uv-1" />
            <div id="uv-2" />
            <div id="uv-3" />
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
