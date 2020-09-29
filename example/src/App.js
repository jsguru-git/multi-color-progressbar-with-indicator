import React from 'react'

import MultiColorProgressbar from 'multi-color-progressbar-with-indicator'
import 'multi-color-progressbar-with-indicator/dist/index.css'

const App = () => {
  var bars = [
    {width: 40, color: '#dc3545'},
    {width: 15, color: '#d5873d'},
    {width: 15, color: '#f2d261'},
    {width: 15, color: '#9baa4b'},
    {width: 15, color: '#6fa053'}
  ]
  let wrapper = {
    padding: '30px'
  }
  return (
    <div style={{width: '50%', margin: '0 auto', paddingTop: '10%'}}>
      <div style={wrapper}>
        <MultiColorProgressbar height={30} bars={bars} minVal={0} maxVal={1000} value={650} />
      </div>
      <div style={wrapper}>
        <MultiColorProgressbar height={30} bars={bars} minVal={0} maxVal={1000} value={780} />
      </div>
      <div style={wrapper}>
        <MultiColorProgressbar height={30} bars={bars} minVal={0} maxVal={1000} value={350} />
      </div>
    </div>
  )
}

export default App
