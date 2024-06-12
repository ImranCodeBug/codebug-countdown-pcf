import React, { useEffect, useState } from 'react'
import { componentStyle, statusEnum } from './models';
import { Stack, Icon, Text } from '@fluentui/react';
import Countdown from 'react-countdown';

export interface ITimerComponent {
    heading : string,
    isPaused : boolean,
    targetDate : Date,
    actualDate : Date | null
}

const mainStackStyles = {
    root: {
        backgroundColor: 'white',
        border: '1px solid #E5E5E5',
        borderRadius: 8,
        padding: 20,
        width: 200,
      }
}


const constructTimerProps = (targetDate : Date, actualDate : Date | null) =>{
    if(actualDate === null){ // not yes resolved. ie still running
      if(targetDate < new Date()){        
        return statusEnum.Expired;
      }
      else{
        return statusEnum.Progressing
      }
    }

    else{
      if(targetDate < actualDate!){
        return statusEnum.Failed;
      }
      else{
        return statusEnum.Succeeded;
      }
        
    }
  }

const getIconStyle = (currentStatus : statusEnum) =>{   
    switch (currentStatus){
        case statusEnum.Expired : 
            return {iconName : "Warning12", iconColor : "orange", smallLabel : "Expired"};
        case statusEnum.Failed : 
            return {iconName : "Cancel", iconColor : "Red", smallLabel : "Failed"};
        case statusEnum.Paused : 
            return {iconName : "CirclePause", iconColor : "black", smallLabel : "Paused"};
        case statusEnum.Progressing : 
            return {iconName : "Flag", iconColor : "black", smallLabel : "Progressing"};
        default :
            return {iconName : "SkypeCircleCheck", iconColor : "Green", smallLabel : "Succeeded"};
    }
}

const TimerComponent = (props: ITimerComponent) => {
    const defaultCurrentStyle : componentStyle = {iconName : "Flag", iconColor : "black", smallLabel : "Progressing"};

    const [currentStyle, setCurrentStyle] = useState(defaultCurrentStyle)
    const [currentStatus, setCurrentStatus] = useState<statusEnum | null>(null)    

    useEffect(() => {
        if(props.actualDate === null){ // not yes resolved. ie still running
            if(props.targetDate < new Date()){        
                setCurrentStatus(statusEnum.Expired)              
            }
            else{
                setCurrentStatus(statusEnum.Progressing)              
            }
          }
      
          else{
            if(props.targetDate < props.actualDate!){
                setCurrentStatus(statusEnum.Failed)              
            }
            else{
                setCurrentStatus(statusEnum.Succeeded)              
            }              
          }        
    }, [])

    useEffect(() => {
        if(currentStatus){
            const currentSt = getIconStyle(currentStatus!)
            setCurrentStyle(currentSt);
        }        
    }, [currentStatus])

  return (
    <Stack
    tokens={{ childrenGap: 20 }}
    horizontalAlign="start" // Align items to the left
    styles={mainStackStyles}>
    

    <Stack horizontalAlign="start" horizontal tokens={{ childrenGap: 10 }}>
      <Icon
        iconName={props.isPaused ? "CirclePauseSolid" : currentStyle.iconName}
        styles={{ root: { fontSize: 24, color: currentStyle.iconColor, marginTop: 4 } }} // Adjust top margin
      />
      <Stack>
        <Text variant="mediumPlus" styles={{ root: { color: 'black' } }}>
          {props.heading}
        </Text>
        <Text variant="small" styles={{ root: { color: 'black' } }}>
          {currentStatus === statusEnum.Failed 
          || currentStatus === statusEnum.Succeeded 
          || currentStatus === statusEnum.Paused ?
            <span style={{color : currentStyle.iconColor}}>{currentStyle.smallLabel}</span>
          : <Countdown date={props.targetDate} overtime={true} ></Countdown>
          }
        </Text>
      </Stack>
    </Stack>

   
  </Stack>
  )
}

export default TimerComponent