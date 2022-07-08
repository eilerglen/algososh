import { Input } from "./input";
import {screen, fireEvent, render} from "@testing-library/react"

describe("Checking Input events", () => {
    it('Input should render text according to input', () => {
        render(<Input />)
        const input = screen.getByTestId("input")
        fireEvent.change(input, {
            target: {
                value: "Hello!"
            }
        })
        expect(input.value).toBe("Hello!")
    })
})