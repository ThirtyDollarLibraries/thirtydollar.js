import { ControlType } from "./ControlType"
import { Modifier } from "./Modifier"
import { SoundType } from "./SoundType"

/**
 * A type that declares a sound, or a control item.
 */
export type Sound = {
    /**
     * The type of the item to use.
     */
    type: SoundType | ControlType,
    /**
     * The pitch of the item. This can also be referred to as the "value" of certain control items like the tempo
     */
    pitch?: number,
    /**
     * The modifier to set on the item. Only works for control items.
     */
    modifier?: Modifier,
    repeatAmount?: number
}