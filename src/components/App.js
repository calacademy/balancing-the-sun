import React, { Component } from 'react'
import '../style/App.css'
import Loader from './Loader'
import Translator from './Translator'
import Credits from './Credits'
import Video from './Video'
import Attract from './Attract'
import Main from './Main'
import Popup from './Popup'
import fetchJsonp from 'fetch-jsonp'

class App extends Component {
  constructor() {
    super()
    this.state = {
      display: 'loader', // loader || attract || main || popup || video || credits
      data: null,
      parsedDataBasics: null,
      parsedDataPersons: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}], // assumes 17 persons FOR NOW
      parsedDataInfoUV: [{},{},{}], // assumes 3 entries
      parsedDataInfoSkinPigment: [{},{},{},{},{}], // assumes 5 entries
      dataBasicsReady: false,
      dataPersonsReady: false,
      dataInfoUVReady: false,
      dataInfoSkinPigmentReady: false,
      dataReady: false,
      dataCredits: null,
      currentLanguage: 'en', // en || es || zh || tl
      inactivityInt: 60000,
      dateLastTouch: null,
      currentPerson: null,
      currentPopup: null // folate || vitamin
    }

    // Loader handler
    this.handlerLoadComplete = this._loadComplete.bind(this)

    // Translator handlers
    this.handlerSelectLanguage = this._selectLanguage.bind(this)
    this.handlerOpenCredits = this._openCredits.bind(this)

    // Credits handlers
    this.handlerCloseCredits = this._closeCredits.bind(this)

    // Main > Person handler
    this.handlerOnPersonSelect = this._onPersonSelect.bind(this)

    // Main handler
    this.handlerOpenVideo = this._openVideo.bind(this)
    this.handlerOpenPopup = this._openPopup.bind(this)

    // Popup handler
    this.handlerClosePopup = this._closePopup.bind(this)

    // Video handler
    this.handlerCloseVideo = this._closeVideo.bind(this)

    // prevent screen flicker on init load
    this.instantStyle = { display: 'none' }

  }

  _getLanguageName(l) {
    var lang = ''
    switch (l) {
      case "en":
        lang = 'English'
        break
      case "es":
        lang = 'Spanish'
        break
      case "zh":
        lang = 'Chinese'
        break
      case "tl":
        lang = 'Filipino'
        break
      default:
        break
    }
    return lang
  }

  _inactivityCheck() {
    var now = new Date()
    var check = new Date(now.getTime() - this.state.inactivityInt)
    if (this.state.dateLastTouch !== null) {
      if ((this.state.dateLastTouch < check) && (this.state.dataReady) && (this.state.display !== 'video')) {
        this.setState({
          currentLanguage: 'en',
          display: 'main',
          currentPerson: null,
          currentPopup: null,
          dateLastTouch: null
        })
      }
    }
  }

  _getDataCredits() {
    var _this = this
    fetchJsonp(process.env.REACT_APP_REST_URL_CREDITS)
    //fetch("./dev-data/dataCredits.json")
    .then((response) => {
      return response.json()
    }).then((data) => {
      _this.setState ({
        dataCredits: data
      })
    }).catch((ex) => {
      console.log('JSON data credits fetch failed: fetching again in 30 seconds', ex)
      // try again in 30 sec
      setTimeout(() => {
       _this._getDataCredits()
     }, 30000)
    })
  }

  _getData() {
    const _this = this
    fetchJsonp(process.env.REACT_APP_REST_URL_TEXT, { timeout: 10000, })
    //fetch("./dev-data/data.json")
    .then((response) => {
      return response.json()
    }).then((data) => {
      _this.setState ({
        data: data
      })
      _this._prepareData()
    }).catch((ex) => {
      console.log('JSON data text fetch failed: fetching again in 30 seconds', ex)
      // try again in 30 sec
      setTimeout(() => {
       _this._getData()
     }, 30000)
    })
  }

  _prepareData() {
    const _this = this

    let dataBasics = {}
    let dataPersons = []
    let dataInfoUV = []
    let dataInfoSkinPigment = []

    this.state.data.forEach((item, i) => {
      if (item.title_administrative === "Balancing the Sun Basics") {
        dataBasics.items = item.items
      } else if (item.title_administrative.indexOf("Balancing the Sun Person") > -1) {
        dataPersons.push(item)
      } else if (item.title_administrative.indexOf("Balancing the Sun Info UV") > -1) {
        dataInfoUV.push(item)
      } else if (item.title_administrative.indexOf("Balancing the Sun Info Skin Pigment") > -1) {
        dataInfoSkinPigment.push(item)
      }
    })

    // verify some data properties
    const requiredBasicsItemCount = 19
    const requiredPersonCount = 17
    const requiredInfoUVCount = 3
    const requiredInfoSkinPigment = 5
    if (dataBasics.items.length !== requiredBasicsItemCount) {
      console.log('data error: basics items count')
      return
    }
    if (dataPersons.length !== requiredPersonCount) {
      console.log('data error: person count')
      return
    }
    if (dataInfoUV.length !== requiredInfoUVCount) {
      console.log('data error: info UV count')
      return
    }
    if (dataInfoSkinPigment.length !== requiredInfoSkinPigment) {
      console.log('data error: info skin pigment count')
      return
    }

    // [name of item in cms, name for this state obj]
    const arrDataBasicsItemsToParse = [
      ['header', 'header'],
      ['description', 'description'],
      ['video-header', 'videoHeader'],
      ['video-description', 'videoDescription'],
      ['cta-label-folate', 'ctaLabelFolate'],
      ['cta-label-vitamin', 'ctaLabelVitamin'],
      ['explanation-folate', 'explanationFolate'],
      ['explanation-vitamin', 'explanationVitamin'],
      ['animation-label-folate-1', 'animationLabelFolate1'],
      ['animation-label-folate-2', 'animationLabelFolate2'],
      ['animation-label-folate-3', 'animationLabelFolate3'],
      ['animation-label-folate-4', 'animationLabelFolate4'],
      ['animation-label-folate-5', 'animationLabelFolate5'],
      ['animation-label-vitamin-1', 'animationLabelVitamin1'],
      ['animation-label-vitamin-2', 'animationLabelVitamin2'],
      ['animation-label-vitamin-3', 'animationLabelVitamin3'],
      ['animation-label-vitamin-4', 'animationLabelVitamin4'],
      ['attract-header', 'attractHeader'],
      ['attract-cta', 'attractCta']
    ]
    let itemsProcessedBasics = 0
    arrDataBasicsItemsToParse.forEach((item, i, arr) => {
      if (_this._breakDownParsedDataBasics(dataBasics, item[0], item[1])) {
        itemsProcessedBasics++
        if (itemsProcessedBasics === arr.length) {
          _this.setState ({
            dataBasicsReady: true
          })
        }
      }
    })

    // [name of item in cms, name for this state obj]
    const arrDataPersonItemsToParse = [
      ['location', 'location']
    ]
    let itemsProcessedPersons = 0
    arrDataPersonItemsToParse.forEach((item, i, arr) => {
      itemsProcessedPersons++
      dataPersons.forEach((person, p) => {
        let items = {'items':dataPersons[p].items}
        let key = dataPersons[p].title_administrative
        if (_this._breakDownParsedDataArray(p, items, item[0], item[1], 'parsedDataPersons', key)) {
          if ((itemsProcessedPersons === arr.length) && (p === (dataPersons.length - 1))) {
            _this.setState ({
              dataPersonsReady: true
            })
          }
        }
      })
    })

    // [name of item in cms, name for this state obj]
    const arrDataInfoUVItemsToParse = [
      ['header', 'header'],
      ['description', 'description']
    ]
    let itemsProcessedInfoUV = 0
    arrDataInfoUVItemsToParse.forEach((item, i, arr) => {
      itemsProcessedInfoUV++
      dataInfoUV.forEach((info, i) => {
        let items = {'items':dataInfoUV[i].items}
        let key = dataInfoUV[i].title_administrative
        if (_this._breakDownParsedDataArray(i, items, item[0], item[1], 'parsedDataInfoUV', key)) {
          if ((itemsProcessedInfoUV === arr.length) && (i === (dataInfoUV.length - 1))) {
            _this.setState ({
              dataInfoUVReady: true
            })
          }
        }
      })
    })

    // [name of item in cms, name for this state obj]
    const arrDataInfoSkinPigmentItemsToParse = [
      ['header', 'header'],
      ['description', 'description']
    ]
    let itemsProcessedInfoSkinPigment = 0
    arrDataInfoSkinPigmentItemsToParse.forEach((item, i, arr) => {
      itemsProcessedInfoSkinPigment++
      dataInfoSkinPigment.forEach((info, i) => {
        let items = {'items':dataInfoSkinPigment[i].items}
        let key = dataInfoSkinPigment[i].title_administrative
        if (_this._breakDownParsedDataArray(i, items, item[0], item[1], 'parsedDataInfoSkinPigment', key)) {
          if ((itemsProcessedInfoSkinPigment === arr.length) && (i === (dataInfoSkinPigment.length - 1))) {
            _this.setState ({
              dataInfoSkinPigmentReady: true
            })
          }
        }
      })
    })

  }

  _breakDownParsedDataBasics(arrParsedData, cmsName, objName) {
    let arrItem = arrParsedData.items.filter((item) => {
      return item.Key['#markup'] === cmsName
    })
    if (arrItem.length === 1) {
      let dataGroupParsed = Object.assign({}, this.state.parsedDataBasics)
      dataGroupParsed[objName] = arrItem
      this.setState ({
        parsedDataBasics: dataGroupParsed
      })
      return true
    } else {
      console.log('data error: dataBasics ' + cmsName)
      return false
    }
  }

  _breakDownParsedDataArray(i, arrParsedData, cmsName, objName, state, key) {
    let arrItem = arrParsedData.items.filter((item) => {
      return item.Key['#markup'] === cmsName
    })
    if (arrItem.length === 1) {
      let dataGroupParsed = Object.assign([], this.state[state])
      dataGroupParsed[i][objName] = arrItem
      dataGroupParsed[i]['key'] = key
      this.setState ({
        [state]: dataGroupParsed
      })
      return true
    } else {
      console.log('data error: ' + state + ' ' + cmsName)
      return false
    }
  }

  _loadComplete() {
    this.setState({
      display: 'main'
    })
  }

  _selectLanguage(e, lang) {
    e.preventDefault()
    this.setState({
      currentLanguage: lang,
      dateLastTouch: new Date()
    })
  }

  _openCredits() {
    this.setState({
      display: 'credits',
      dateLastTouch: new Date()
    })
  }
  _closeCredits() {
    this.setState({
      currentPerson: null,
      currentPopup: null,
      display: 'main',
      dateLastTouch: new Date()
    })
  }

  _openPopup(e, p) {
    e.preventDefault()
    this.setState({
      display: 'popup',
      currentPopup: p,
      dateLastTouch: new Date()
    })
  }
  _closePopup() {
    this.setState({
      display: 'main',
      currentPopup: null,
      dateLastTouch: new Date()
    })
  }

  _openVideo() {
    this.setState({
      display: 'video',
      dateLastTouch: new Date()
    })
  }

  _closeVideo() {
    this.setState({
      display: 'main',
      dateLastTouch: new Date()
    })
  }

  _onPersonSelect(e, person) {
    e.preventDefault()
    let strPersonInt = parseInt(person.split('-')[1])
    if (strPersonInt === this.state.currentPerson) {
      this.setState({
        currentPerson: null,
        dateLastTouch: new Date()
      })
    } else {
      this.setState({
        currentPerson: parseInt(strPersonInt),
        dateLastTouch: new Date()
      })
    }
  }

  componentDidMount() {
    this._getData()
    this._getDataCredits()

    setInterval(() => this._inactivityCheck(), 5000)
    setTimeout(() => {
      this.instantStyle = { display: 'block' }
      // put this here to re-init instantStyle
      this.setState({
        dateLastTouch: new Date()
      })
    }, 1000)

  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.dataReady) {
      // check for all data readiness
      if (
        (this.state.dataBasicsReady) &&
        (this.state.dataPersonsReady) &&
        (this.state.dataInfoUVReady) &&
        (this.state.dataInfoSkinPigmentReady)
      ) {
        this.setState({
          dataReady: true
        })
      }
    }
  }

  render() {

    return (
      <div
        style={this.instantStyle}
        id="app">
        <div id="container-loader"
          className={this.state.display !== 'loader' ? 'hide' : ''}>
          <Loader
            // needs to verify all data
            dataReady={this.state.dataReady}
            handlerLoadComplete={this.handlerLoadComplete}
          />
        </div>
        <div id="container-translator"
          className={this.state.display === 'loader' ? 'hide' : ''}>
          <Translator
            language={this.state.currentLanguage}
            handlerSelectLanguage={this.handlerSelectLanguage}
            handlerOpenCredits={this.handlerOpenCredits}
            display={this.state.display}
           />
        </div>
        <div id="container-credits"
          className={this.state.display !== 'credits' ? 'hide-anim' : ''}>
          <Credits
            display={this.state.display}
            dataCredits={this.state.dataCredits}
            handlerCloseCredits={this.handlerCloseCredits}
            language={this.state.currentLanguage}
           />
        </div>
        <div id="container-video"
          className={(this.state.display !== 'video' ) ? 'hide-anim' : ''}>
          <Video
            dataReady={this.state.dataReady}
            language={this.state.currentLanguage}
            display={this.state.display}
            handlerCloseVideo={this.handlerCloseVideo}
          />
        </div>
        <div
          id="container-popup"
          className={(this.state.display !== 'popup' ) ? 'hide-anim' : ''}
          >
          <Popup
            display={this.state.display}
            dataReady={this.state.dataReady}
            parsedDataBasics={this.state.parsedDataBasics}
            language={this._getLanguageName(this.state.currentLanguage)}
            currentPopup={this.state.currentPopup}
            handlerClosePopup={this.handlerClosePopup}
          />
        </div>
        <div id="container-attract"
          className={this.state.display !== 'attract' ? 'hide' : ''}>
          <Attract
            dataReady={this.state.dataReady}
            language={this._getLanguageName(this.state.currentLanguage)}
          />
        </div>
        <div id="container-main"
          className={(this.state.display !== 'main' ) ? 'hide' : ''}>
          <Main
            parsedDataBasics={this.state.parsedDataBasics}
            parsedDataInfoUV={this.state.parsedDataInfoUV}
            parsedDataInfoSkinPigment={this.state.parsedDataInfoSkinPigment}
            parsedDataPersons={this.state.parsedDataPersons}
            dataReady={this.state.dataReady}
            currentPerson={this.state.currentPerson}
            language={this._getLanguageName(this.state.currentLanguage)}
            handlerOnPersonSelect={this.handlerOnPersonSelect}
            handlerOpenVideo={this.handlerOpenVideo}
            handlerOpenPopup={this.handlerOpenPopup}
          />
        </div>
      </div>
    )
  }
}

export default App
