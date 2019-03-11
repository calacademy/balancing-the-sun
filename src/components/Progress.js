import React, {Component} from 'react'
import '../style/Progress.css'

class Progress extends Component {
  constructor() {
    super()
    this.dash = 170
    this.styleDash = { 'strokeDashoffset': 170 }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.percent !== this.props.percent) {
      let per = this.props.percent * -1
      this.styleDash = {  'strokeDashoffset': per * this.dash * -1 }
    }
  }

  render() {

    return(
      <div id="progress">
        <svg>
          <circle className="bg" r="27" cx="30" cy="30" />
          <circle
            style={this.styleDash}
            className="progress" r="27" cx="30" cy="30" />
        </svg>
      </div>
    )

  }

}

export default Progress
