import { useTransitionColor } from "../../../contexts/TransitionColorContext";
import { LighterBackgroundColors } from "./Colors";

export default function LoadingLayer() {

  const { transitionColor } = useTransitionColor();
  return (
    <div className='flex flex-col h-full w-full fixed'>
      <div className='flex' >
        <div className={`${transitionColor} h-[10rem] lg:h-[18rem] w-full brightness-[95%]`} />
      </div >
      <div className='flex h-screen'>
        <div
          className={`${LighterBackgroundColors[transitionColor]} h-full w-full brightness-[95%]`}
        />
      </div>
    </div >
  )
}