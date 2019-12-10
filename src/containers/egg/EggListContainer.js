import React from "react"
import { withRouter } from "react-router-dom"
import { useSelector } from "react-redux"
import EggCard from "components/egg/EggCard"

const EggListContainer = ({ history }) => {
  const { eggs } = useSelector(({ eggReducer }) => ({ eggs: eggReducer.eggs }))

  return (
    <>
      {eggs.map((egg, index) => {
        return <EggCard egg={egg} key={index} />
      })}
    </>
  )
}

export default withRouter(EggListContainer)
