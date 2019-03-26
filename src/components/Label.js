import React, {Component} from 'react'
import '../style/Label.css'

class Label extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.animLeft !== this.props.animLeft) {
      let reveal = false

      if (this.props.dataLabel['Key']['#markup'] === 'animation-label-folate-1') {
        reveal = true
      }
      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-folate-2') {
        reveal = true
      }
      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-folate-3') {
        reveal = true
      }
      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-folate-4') {
        if ((this.props.animLeft <= -9000) && (this.props.animLeft >= -380000)) {
          reveal = true
        }
      }
      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-folate-5') {
        if ((this.props.animLeft <= -9000) && (this.props.animLeft >= -92000)) {
          reveal = true
        }
      }

      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-vitamin-1') {
        reveal = true
      }
      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-vitamin-2') {
        reveal = true
      }
      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-vitamin-3') {
        reveal = true
      }
      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-vitamin-4') {
        if ((this.props.animLeft <= -9000) && (this.props.animLeft >= -380000)) {
          reveal = true
        }
      }
      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-vitamin-5') {
        if ((this.props.animLeft <= -102000) && (this.props.animLeft >= -170000)) {
          reveal = true
        }
      }
      this.setState({
        show: reveal
      })
    }
  }

  render() {

    let id = ''
    let markupLabel = {__html: ''}

    if (this.props.dataReady) {
      id = this.props.dataLabel['Key']['#markup']
      markupLabel = {__html: this.props.dataLabel[this.props.language]['#markup']}
    }

    return(
      <div
        className={this.state.show ? 'reveal label' : 'label'}
        id={id}
        dangerouslySetInnerHTML={markupLabel}
        >
      </div>
    )

  }

}

export default Label
