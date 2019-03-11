import React, {Component} from 'react'
import '../style/Loader.css'

class Loader extends Component {

  componentDidUpdate(prevProps, prevState) {
    var _this = this
    if (this.props.dataReady !== prevProps.dataReady) {
      setTimeout(function() {
        _this.props.handlerLoadComplete()
      }, 10000)
    }
  }

  render() {
    return(
      <div id="loader">
        <div id="asset-container">
          <div id="loader-source-images">
            <div id="map-1" />
            <div id="map-2" />
            <div id="map-3" />
            <div id="map-4" />
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
