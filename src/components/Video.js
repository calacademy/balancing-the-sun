import React, {Component} from 'react'
import '../style/Video.css'
import Progress from './Progress'
import Caption from './Caption'

class Video extends Component {
  constructor() {
    super()
    this.state = {
      percent: 0,
      cue_en: '',
      cue_es: '',
      cue_zh: '',
      cue_tl: ''
    }
    this.media = null
  }

  componentDidMount() {
    this._initMedia()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.display !== this.props.display) {
      if (this.props.display !== 'video') {
        this._stopMedia()
      } else {
        this._startMedia()
      }
    }
  }

  _initMedia() {
    const _this = this
    this.media = document.querySelector('video')
    this.media.currentTime = 0
    this.media.addEventListener('ended', this.props.handlerCloseVideo)
    this.media.addEventListener('timeupdate', () => {
      _this.setState({
        percent: _this.media.currentTime / this.media.duration
      })
    })
    if (this.media.textTracks) {
      Array.from(this.media.textTracks).forEach((track) => {
        track.mode = 'hidden'
        track.oncuechange = (() => {
          _this._onCueChange(track)
        })
      })
    }
  }

  _stopMedia() {
    this.media.pause()
    this.media.currentTime = 0
    this.setState({
      percent: 0,
      cue_en: '',
      cue_es: '',
      cue_zh: '',
      cue_tl: ''
    })
  }

  _startMedia() {
    this.media.currentTime = 0
    this.setState({
      percent: 0,
      cue_en: '',
      cue_es: '',
      cue_zh: '',
      cue_tl: ''
    })
    this.media.play()
  }

  _onCueChange(t) {
    let cue = t.activeCues[0]
    if (cue) {
      this.setState({
        ['cue_' + t.language]: cue.text
      })
    }

  }

  render() {

    return(
      <div id="video">
        <div id="progress-container">
          <Progress
            percent={this.state.percent}
          />
        </div>
        <button
          onTouchEnd={() => this.props.handlerCloseVideo()}
          onClick={() => this.props.handlerCloseVideo()}
        />
        <div id="caption-container">
          <Caption
            id="en"
            caption={this.state.cue_en}
            language={this.props.language}
          />
          <Caption
            id="es"
            caption={this.state.cue_es}
            language={this.props.language}
          />
          <Caption
            id="zh"
            caption={this.state.cue_zh}
            language={this.props.language}
          />
          <Caption
            id="tl"
            caption={this.state.cue_tl}
            language={this.props.language}
          />
        </div>
        <video>
          <source src="./video/movie.mp4" type="video/mp4" />
          <track kind="subtitles" srcLang="en" src="./video/en.vtt" />
          <track kind="subtitles" srcLang="es" src="./video/es.vtt" />
          <track kind="subtitles" srcLang="zh" src="./video/zh.vtt" />
          <track kind="subtitles" srcLang="tl" src="./video/tl.vtt" />
        </video>
      </div>
    )

  }

}

export default Video
