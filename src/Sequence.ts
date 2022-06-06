import { ControlType } from "./ControlType";
import { Modifier } from "./Modifier";
import { Sound } from "./Sound";
import { SoundType } from "./SoundType";

export class Sequence {
    sounds: Sound[]

    constructor(sounds: Sound[]) {
        this.sounds = sounds
    }

    /**
     * "Compiles" the sequence into the valid sequence file format.
     * @returns The "compiled" sequence.
     */
    parseToString() {
        let sa = this.sounds.map(snd => `${snd.type}@${snd.pitch ?? 0}${snd.modifier ?? ""}${snd.repeatAmount == undefined ? "" : `=${snd.repeatAmount}` ?? ""}`)
        return sa.join('|')
    }

    /**
     * Appends a tempo change into the sequence.
     * @param tempo The tempo to change to.
     */
    setTempo(tempo: number) {
        this.sounds.push({ type: "!speed", pitch: tempo })
    }

    /**
     * Appends a pause for a specified amount of units.
     * @param units The units to pause for.
     * @param type The type of pause to take into consideration.
     */
    pauseFor(units: number, type: "combined" | "individualUnits" | "stopBlock") {
        if (type == "combined") {
            this.sounds.push({ type: "_pause", repeatAmount: units })
        } else if (type == "individualUnits") {
            for (let i = 0; i < units + 1; i++) this.sounds.push({ type: "_pause" })
        } else if (type == "stopBlock") {
            this.sounds.push({ type: "!stop", pitch: units })
        }
    }

    /**
     * Syntactic sugar to append an item to the sounds array.
     * @param item The type of item to add.
     * @param pitch The pitch/value of the item.
     * @param modifier 
     */
    addItem(item: SoundType | ControlType, pitch?: number, modifier?: Modifier, repeatAmount?: number) {
        this.sounds.push({ type: item, pitch: pitch, modifier: modifier, repeatAmount: repeatAmount })
    }

    static parseFromString(sequence: string): Sequence {
        let seq = new Sequence([]);
        const items = (sequence || "").replace(/\s/g, "").split('|')

        items.forEach(x => {
            let [data, count] = x.split("=")
            let [main, pitch, num] = data.split("@")
            if (!main || !data) return

            for (let i=0; i<(count || 1); i++) seq.addItem(main, (isNaN(parseFloat(pitch))) ? 0 : parseFloat(pitch), num as Modifier ?? Modifier.Set, (isNaN(parseInt(count))) ? null : parseInt(count)); return
        })

        return seq
    }
}