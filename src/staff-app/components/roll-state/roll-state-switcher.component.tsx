import React, { useEffect, useState } from "react"
import { RolllStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import RollStateModel from "staff-app/daily-care/RollStateModal"
interface Props {
  initialState?: RolllStateType
  size?: number
  onStateChange?: (newState: RolllStateType) => void;
  onlyList?: boolean;
}
export const RollStateSwitcher: React.FC<Props> = ({ initialState = "unmark", size = 40, onStateChange, onlyList }) => {
  const [rollState, setRollState] = useState(initialState)
  const [open, setOpen] = useState(false)

  const nextState = () => {
    const states: RolllStateType[] = ["present", "late", "absent"]
    if (rollState === "unmark" || rollState === "absent") return states[0]
    const matchingIndex = states.findIndex((s) => s === rollState)
    return matchingIndex > -1 ? states[matchingIndex + 1] : states[0]
  }
  useEffect(() => {
    if (initialState) {
      setRollState(initialState)
    }
  }, [initialState])

  const onClick = () => {
    setOpen(!onlyList);
  }

  const onSubmit = (value: string) => {
    setOpen(!open);
    if (onStateChange) {
      onStateChange(value)
    }
  }

  return (
    <>
      <RollStateIcon type={rollState} size={size} onClick={onClick}  />
      {open && <RollStateModel open={open} onSubmit={onSubmit} defaultValue={rollState} />}
    </>
  )
}
