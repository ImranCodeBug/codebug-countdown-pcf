import React from 'react'
import TimerComponent from './TimerComponent'

export interface IMainContainerComponentProps {
  targetDate : Date | null
  completionDate : Date | null
  fieldLabel : string
}

const MainContainerComponent = (props: IMainContainerComponentProps) => {
  return (
    <>
    {(props.targetDate) 
    ? <TimerComponent heading={props.fieldLabel} isPaused={false} 
      targetDate={props.targetDate!} 
      actualDate={null} ></TimerComponent>
    : <div>No Target date provided. the control cannot be loaded</div>}
    </>
  )
}

export default MainContainerComponent 