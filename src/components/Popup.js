import React, {Component} from 'react'
import '../style/Popup.css'
import Animation from './Animation'

class Popup extends Component {

  render() {

    let markupBasicsPopupHeader = {__html: ''}
    let markupBasicsPopupDescription = {__html: ''}

    if (this.props.dataReady) {

      if (this.props.currentPopup === 'folate') {
        markupBasicsPopupHeader = {__html: this.props.parsedDataBasics.ctaLabelFolate[0][this.props.language]['#markup']}
        markupBasicsPopupDescription = {__html: this.props.parsedDataBasics.explanationFolate[0][this.props.language]['#markup']}
      } else if (this.props.currentPopup === 'vitamin') {
        markupBasicsPopupHeader = {__html: this.props.parsedDataBasics.ctaLabelVitamin[0][this.props.language]['#markup']}
        markupBasicsPopupDescription = {__html: this.props.parsedDataBasics.explanationVitamin[0][this.props.language]['#markup']}
      }

    }

    return(
      <div id="popup">
        <div
          className={(this.props.display === 'popup') ? 'popup-inner' : 'hide popup-inner'}
          >
          <button
            onTouchEnd={() => this.props.handlerClosePopup()}
            onClick={() => this.props.handlerClosePopup()}
          />
          <div className="popup-left">
            <h1 dangerouslySetInnerHTML={markupBasicsPopupHeader} />
            <p dangerouslySetInnerHTML={markupBasicsPopupDescription} />
          </div>
          <div className="container-animation">
            <Animation
              language={this.props.language}
              dataReady={this.props.dataReady}
              currentPopup={this.props.currentPopup}
              parsedDataBasics={this.props.parsedDataBasics}
            />
          </div>
        </div>
      </div>
    )

  }

}

export default Popup
