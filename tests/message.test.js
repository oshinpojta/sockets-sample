const expect = require("expect").expect;

const { generateMessage } = require("../utils/message");

describe("Generate Message", () => {
    it("should generate correct message object", () => {
        let from =  "User "+Math.random(),
            text = "Random Text := "+Math.random()+" random number",
            message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe("number")
        expect(message).toMatchObject({ from, text})
    })
})