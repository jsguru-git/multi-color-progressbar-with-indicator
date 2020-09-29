import React, { Component } from 'react'
import { Progress } from 'reactstrap'
import Style from 'style-it'
import PropTypes from "prop-types"
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './styles.module.css'

export default class MultiColorProgressbar extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      ...this.props
    }
  }

  static defaultProps = {
    height: 10,             // in pixel
    color: '#007bff',
    bars: [{width: 100}],
    minVal: 0,
    maxVal: 100,
    value: 0,
    fontSize: 15,           // in pixel
    indicatorVisible: true,
    stepValuesVisible: true
  }

  static propTypes = {
    height: PropTypes.number,
    color: PropTypes.string,
    bars: PropTypes.arrayOf(PropTypes.object),
    minVal: PropTypes.number,
    maxVal: PropTypes.number,
    value: PropTypes.number,
    fontSize: PropTypes.number,
    indicatorVisible: PropTypes.bool,
    stepValuesVisible: PropTypes.bool
  }
  componentWillMount() {
    let {value, minVal, maxVal} = this.state
    
    if (minVal > maxVal) {
      let temp = minVal
      minVal = maxVal
      maxVal = temp
    }

    if (value < minVal) {
      value = minVal
    } else if (value > maxVal) {
      value = maxVal
    }

    this.setState({
      value, minVal, maxVal
    })
  }

  render() {
    let {height, color, bars, minVal, maxVal, value, fontSize, indicatorVisible, stepValuesVisible} = this.state

    /***************** Get indicator color ***************************/
    let sequenceSum = 0
    let valAndWidth = bars.map(itm => {
        sequenceSum += itm.width
        itm.value = (maxVal - minVal) * sequenceSum / 100 + minVal
        return itm
    })

    valAndWidth.reverse()
    let indicator_color = valAndWidth.reduce((color,itm) => {
        if (value < itm.value) color = itm.color
        return color
    }, null);
    /****************************************************************/
    let normalized_value = Number(((value - minVal) / (maxVal - minVal)).toFixed(2))
    let stepValue_left = 0

    return (
      <div className={styles.multiColorProgressbar}>
        <div className="progress" style={{height: `${height}px`}}>
        {/* <Progress multi style={{height: `${height}px`}}> */}
          {bars.map((itm, idx )=> {
            // return <div className="progress-bar" role="progressbar" style={{width: `${itm.width}%`, backgroundColor: itm.color ? itm.color : color}} aria-valuenow={`${itm.width}`} aria-valuemin="0" aria-valuemax="100"></div>
            return <Progress key={idx} bar value={itm.width} style={{width: `${itm.width}%`, backgroundColor: itm.color ? itm.color : color}} />
          })}
        </div>
        {/* </Progress> */}
        {stepValuesVisible && (
          <div className={styles.stepValueWrapper} style={{fontSize: `${fontSize}px`}}>
            <div className={styles.stepValue}>{minVal}</div>
            {bars.map((itm, idx )=> {
              stepValue_left += itm.width
              return <div key={idx} className={styles.stepValue} style={{left: `${stepValue_left}%`}}>{itm.value}</div>
            })}
          </div>
        )}
        {indicatorVisible && Style.it(`.${styles.indicator} {top: calc(${height}px + 0.75rem)} .${styles.indicator}::before {border-bottom-color: ${indicator_color}}`,
          <div className={styles.indicator} style={{left: `${normalized_value * 100}%`, backgroundColor: indicator_color}}></div>
        )}
        
      </div>
    )
  }
}