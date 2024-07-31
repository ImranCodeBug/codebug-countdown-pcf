import React from 'react'
import TimerComponent from './TimerComponent'

export interface IMainContainerComponentProps {
  targetDate : Date | null
  completionDate : Date | null
  fieldLabel : string
  pausedFieldValue: number | null;
  pausedValue: number | null
}

const MainContainerComponent = (props: IMainContainerComponentProps) => {
  return (
    <>
    {(props.targetDate) 
    ? <TimerComponent heading={props.fieldLabel} isPaused={false} 
      targetDate={props.targetDate!} 
      actualDate={props.completionDate} 
      pausedFieldValue={props.pausedFieldValue}
      pausedValue={props.pausedValue}></TimerComponent>
    : <div>No Target date provided. the control cannot be loaded</div>}
    </>
  )
}

export default MainContainerComponent 