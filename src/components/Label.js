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
        if ((this.props.animLeft <= -74156) && (this.props.animLeft >= -104156)) {
          reveal = true
        }
      }
      else if (this.props.dataLabel['Key']['#markup'] === 'animation-label-folate-2') {
        if ((this.props.animLeft <= -134156) && (this.props.animLeft >= -194156)) {
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
