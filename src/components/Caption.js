import React, {Component} from 'react'
import '../style/Caption.css'

class Caption extends Component {
  constructor() {
    super()
    this.caption = ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.caption !== this.props.caption) {
      this.caption = this.props.caption
    }
  }

  render() {

    let markupCaption = {__html: ''}

    if (this.props.caption) {
      markupCaption = {__html: this.props.caption}
    }

    return(
      <div
        className={ this.props.id === this.props.language ? 'caption show-anim' : 'caption'}
        >
        <span dangerouslySetInnerHTML={markupCaption} />
      </div>
    )

  }

}

export default Caption
