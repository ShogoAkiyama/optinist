import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PlotlyChart from 'react-plotlyjs-ts'
import { LinearProgress, Typography } from '@material-ui/core'

import { DisplayDataContext } from '../DataContext'
import {
  selectBarData,
  selectBarDataError,
  selectBarDataIsFulfilled,
  selectBarDataIsInitialized,
  selectBarDataIsPending,
} from 'store/slice/DisplayData/DisplayDataSelectors'
import { getBarData } from 'store/slice/DisplayData/DisplayDataActions'
import { BarData } from 'store/slice/DisplayData/DisplayDataType'

export const BarPlot = React.memo(() => {
  const { filePath: path } = React.useContext(DisplayDataContext)
  const dispatch = useDispatch()
  const isPending = useSelector(selectBarDataIsPending(path))
  const isInitialized = useSelector(selectBarDataIsInitialized(path))
  const error = useSelector(selectBarDataError(path))
  const isFulfilled = useSelector(selectBarDataIsFulfilled(path))
  React.useEffect(() => {
    if (!isInitialized) {
      dispatch(getBarData({ path }))
    }
  }, [dispatch, isInitialized, path])
  if (isPending) {
    return <LinearProgress />
  } else if (error != null) {
    return <Typography color="error">{error}</Typography>
  } else if (isFulfilled) {
    return <BarPlotImple />
  } else {
    return null
  }
})

const BarPlotImple = React.memo(() => {
  const { filePath: path } = React.useContext(DisplayDataContext)

  const barData = useSelector(selectBarData(path), barDataEqualityFn)

  // const barData = {
  //   x: ['giraffes', 'orangutans', 'monkeys'],
  //   y: [20, 14, 23],
  // }

  const data = React.useMemo(
    () => [
      {
        x: Object.keys(barData),
        y: barData.map((v) => v[0]),
        type: 'bar',
      },
    ],
    [barData],
  )

  const layout = React.useMemo(
    () => ({
      title: path.split('/').reverse()[0],
      margin: {
        t: 60, // top
        l: 50, // left
        b: 30, // bottom
      },
      dragmode: 'pan',
      autosize: true,
    }),
    [],
  )

  const config = {
    displayModeBar: true,
    scrollZoom: true,
  }

  return <PlotlyChart data={data} layout={layout} config={config} />
})

function barDataEqualityFn(a: BarData | undefined, b: BarData | undefined) {
  if (a != null && b != null) {
    const aArray = Object.entries(a)
    const bArray = Object.entries(b)
    return (
      a === b ||
      (aArray.length === bArray.length &&
        aArray.every(([aKey, aValue], i) => {
          const [bKey, bValue] = bArray[i]
          return bKey === aKey // && nestEqualityFun(bValue, aValue)
        }))
    )
  } else {
    return a === undefined && b === undefined
  }
}