import React, {Component} from 'react'
import Person from './Person'
import '../style/Main.css'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      currentInfoUV: null,
      currentInfoSkinPigment: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentPerson !== this.props.currentPerson) {
      switch(this.props.currentPerson) {
        case 1:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV High',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment High'
          })
          break
        case 2:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV High',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment High'
          })
          break
        case 3:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV High',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment High'
          })
          break
        case 4:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV High',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment High'
          })
          break
        case 5:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV High',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment High Exception'
          })
          break
        case 6:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Medium',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Moderate'
          })
          break
        case 7:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Medium',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Moderate'
          })
          break
        case 8:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Medium',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Moderate'
          })
          break
        case 9:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Medium',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Moderate'
          })
          break
        case 10:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Medium',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Moderate'
          })
          break
        case 11:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Medium',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Moderate'
          })
          break
        case 12:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Medium',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Moderate'
          })
          break
        case 13:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Low',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Light'
          })
          break
        case 14:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Low',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Light'
          })
          break
        case 15:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Low',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Light'
          })
          break
        case 16:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Low',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Light'
          })
          break
        case 17:
          this.setState({
            currentInfoUV: 'Balancing the Sun Info UV Low',
            currentInfoSkinPigment: 'Balancing the Sun Info Skin Pigment Light Exception'
          })
          break
        default:
          this.setState({
            currentInfoUV: null,
            currentInfoSkinPigment: null
          })
          break
      }
    }
  }



  componentDidMount() {}

  render() {

    const _this = this

    let styleUV = ''
    let styleSP = ''

    let markupBasicsHeader = {__html: ''}
    let markupBasicsDescription = {__html: ''}

    let markupBasicsVideoHeader = {__html: ''}
    let markupBasicsVideoDescription = {__html: ''}

    let markupBasicsCtaLabelFolate = {__html: ''}
    let markupBasicsCtaLabelVitamin = {__html: ''}

    let markupInfoUVHeader = {__html: ''}
    let markupInfoUVDescription = {__html: ''}

    let markupInfoSkinPigmentHeader = {__html: ''}
    let markupInfoSkinPigmentDescription = {__html: ''}

    let markupBasicsFootnoteDots = {__html: ''}

    let persons = []

    if (this.props.dataReady) {

      markupBasicsHeader = {__html: this.props.parsedDataBasics.header[0][this.props.language]['#markup']}
      markupBasicsDescription = {__html: this.props.parsedDataBasics.description[0][this.props.language]['#markup']}

      markupBasicsVideoHeader = {__html: this.props.parsedDataBasics.videoHeader[0][this.props.language]['#markup']}
      markupBasicsVideoDescription = {__html: this.props.parsedDataBasics.videoDescription[0][this.props.language]['#markup']}

      markupBasicsCtaLabelFolate = {__html: this.props.parsedDataBasics.ctaLabelFolate[0][this.props.language]['#markup']}
      markupBasicsCtaLabelVitamin = {__html: this.props.parsedDataBasics.ctaLabelVitamin[0][this.props.language]['#markup']}

      markupBasicsFootnoteDots = {__html: this.props.parsedDataBasics.footnoteDots[0][this.props.language]['#markup']}

      if (this.state.currentInfoUV) {

        switch(this.state.currentInfoUV) {
          case 'Balancing the Sun Info UV Low':
            styleUV = 'uv-low'
            break
          case 'Balancing the Sun Info UV Medium':
            styleUV = 'uv-medium'
            break
          case 'Balancing the Sun Info UV High':
            styleUV = 'uv-high'
            break
          default:
            styleUV = ''
            break
        }

        let currentDataInfoUV = this.props.parsedDataInfoUV.filter((item) => {
          return item.key === _this.state.currentInfoUV
        })
        markupInfoUVHeader = {__html: currentDataInfoUV[0].header[0][this.props.language]['#markup']}
        markupInfoUVDescription = {__html: currentDataInfoUV[0].description[0][this.props.language]['#markup']}

      }

      if (
        (this.state.currentInfoSkinPigment) &&
        (this.props.currentPerson)
      ) {

        styleSP = 'sp' + this.props.currentPerson

        let currentDataInfoSkinPigment = this.props.parsedDataInfoSkinPigment.filter((item) => {
          return item.key === _this.state.currentInfoSkinPigment
        })
        markupInfoSkinPigmentHeader = {__html: currentDataInfoSkinPigment[0].header[0][this.props.language]['#markup']}
        markupInfoSkinPigmentDescription = {__html: currentDataInfoSkinPigment[0].description[0][this.props.language]['#markup']}

      }

      this.props.parsedDataPersons.forEach((person, i) => {
        let intPerson = 0
        let strPersonInt = person.key.slice(-2).trim()
        intPerson = parseInt(strPersonInt)
        if (intPerson > 0) {
          persons.push(
            <Person
              key={intPerson}
              id={'person-' + intPerson}
              data={person}
              handlerOnPersonSelect={_this.props.handlerOnPersonSelect}
              currentPerson={_this.props.currentPerson}
              language={_this.props.language}
            />
          )
        }

      })

    }

    return(
      <div
        id="main"
        className={styleUV}
        >
        <div
           id="container-map-reset"
           onTouchEnd={() => this.props.handlerClosePerson()}
           onClick={() => this.props.handlerClosePerson()}
        />
        <div id="container-persons">
          {persons}
        </div>
        <div
          id="container-footnote-dots"
          dangerouslySetInnerHTML={markupBasicsFootnoteDots}
        />
        <div id="top-left">
          <h1 dangerouslySetInnerHTML={markupBasicsHeader} />
          <p dangerouslySetInnerHTML={markupBasicsDescription} />
        </div>
        <div id="bottom">
          <div
            id="info-uv-skin"
            className={this.props.currentPerson ? '' : 'hide'}
            >
            <div
              id="info-uv"
              className={styleUV}
              >
              <h1 dangerouslySetInnerHTML={markupInfoUVHeader} />
              <p dangerouslySetInnerHTML={markupInfoUVDescription} />
            </div>
            <div
              id="info-skin"
              className={styleSP}
              >
                <h1 dangerouslySetInnerHTML={markupInfoSkinPigmentHeader} />
                <p dangerouslySetInnerHTML={markupInfoSkinPigmentDescription} />
                <div className="info-skin-buttons">
                  <button
                    onTouchEnd={(e) => this.props.handlerOpenPopup(e, 'folate')}
                    onClick={(e) => this.props.handlerOpenPopup(e, 'folate')}
                    >
                    <span dangerouslySetInnerHTML={markupBasicsCtaLabelFolate} />
                  </button>
                  <button
                    onTouchEnd={(e) => this.props.handlerOpenPopup(e, 'vitamin')}
                    onClick={(e) => this.props.handlerOpenPopup(e, 'vitamin')}
                    >
                    <span dangerouslySetInnerHTML={markupBasicsCtaLabelVitamin} />
                  </button>
                </div>
            </div>
          </div>
          <div
            id="info-video"
            className={this.props.currentPerson ? 'hide' : ''}
          >
            <div
              id="video-thumb"
            />
            <div
              id="video-thumb-play-button"
              onTouchEnd={() => this.props.handlerOpenVideo()}
              onClick={() => this.props.handlerOpenVideo()}
            />

            <div className="info-video-text">
              <h1 dangerouslySetInnerHTML={markupBasicsVideoHeader} />
              <div className="info-video-columns">
                <p dangerouslySetInnerHTML={markupBasicsVideoDescription} />
              </div>
            </div>
            <div className="info-video-buttons">
              <button
                onTouchEnd={(e) => this.props.handlerOpenPopup(e, 'folate')}
                onClick={(e) => this.props.handlerOpenPopup(e, 'folate')}
                >
                <span dangerouslySetInnerHTML={markupBasicsCtaLabelFolate} />
              </button>
              <button
                onTouchEnd={(e) => this.props.handlerOpenPopup(e, 'vitamin')}
                onClick={(e) => this.props.handlerOpenPopup(e, 'vitamin')}
                >
                <span dangerouslySetInnerHTML={markupBasicsCtaLabelVitamin} />
              </button>
            </div>
          </div>

        </div>

      </div>
    )

  }

}

export default Main
