import { Sequence, Modifier, Sound, SoundType, ControlType } from './index'

describe('create a simple sequence', () => {
    it('should be able to parse 5 items into a valid sequence string', () => {
        let seq = new Sequence([]);
        for (let i = 0; i < 5; i++) seq.addItem("boom")

        expect(seq.parseToString()).toBe("boom@0|boom@0|boom@0|boom@0|boom@0")
    })
    it('should be able to parse back into a Sequence object', () => {
        let seq = Sequence.parseFromString("boom@0|boom@0|boom@0|boom@0|boom@0")
        
        expect(seq.sounds).toHaveLength(5)
        expect(seq.sounds[0]).toStrictEqual(<Sound>{modifier: Modifier.Set, type: "boom", pitch: 0, repeatAmount: null })
    })
    it('should be able to add sounds with null props', () => {
        let seq = new Sequence([]);
        seq.addItem("boom")

        expect(seq.parseToString()).toBe("boom@0")
    })
})

describe('1.1.0 features', () => {
    it('should be able to create a sound with a repeat count of 5', () => {
        let seq = new Sequence([]);

        seq.addItem("boom", 0, Modifier.Set, 5)
        expect(seq.parseToString()).toBe("boom=5@0")
    })
})