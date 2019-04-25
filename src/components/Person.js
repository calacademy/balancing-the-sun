import React, {Component} from 'react'
import '../style/Person.css'

class Person extends Component {

  render() {

    let pid = parseInt(this.props.id.split('-')[1])
    let markupLocation = {__html: ''}

    if (this.props.data) {
      markupLocation = {__html: this.props.data.location[0][this.props.language]['#markup']}
    }

    return(
      <div
        id={this.props.id}
        className={ pid === this.props.currentPerson ? "person person-selected" : "person" }
        >
          <div
            className={ pid === this.props.currentPerson ? "marker selected" : "marker" }
          >
            <div className={'thumb'}>
              <div className={'thumb-image'} />
              <div
                className={'thumb-caption'}
                dangerouslySetInnerHTML={markupLocation}
              />
            </div>
            <div
              className="dot-click-zone"
              onTouchEnd={(e) => this.props.handlerOnPersonSelect(e, this.props.id)}
              onClick={(e) => this.props.handlerOnPersonSelect(e, this.props.id)}
            />
            <div
              className={'dot'}
            />
            <div className={'line'} />
          </div>


      </div>
    )

  }

}

export default Person
