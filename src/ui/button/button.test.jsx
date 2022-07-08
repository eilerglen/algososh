import { Button } from "./button";
import renderer from 'react-test-renderer';
import {render, fireEvent, waitFor, screen} from "@testing-library/react"

const buttonText = "text"

describe("Check render button",() => {
    it("Checking button with text render", ()=> {
        const snap = renderer.create(<Button text="test text"/>).toJSON()
        expect(snap).toMatchSnapshot()
    });

    it("Checking button without text render", ()=> {
        const snap = renderer.create(<Button />).toJSON()
        expect(snap).toMatchSnapshot()
    });

    
    it("Checking button disabled render", ()=> {
        const snap = renderer.create(<Button disabled = {true} />).toJSON()
        expect(snap).toMatchSnapshot()
    });
    it("Checking button disabled render", ()=> {
        const snap = renderer.create(<Button isLoader = {true} />).toJSON()
        expect(snap).toMatchSnapshot()
    });

    it("Checking button click", () => {
        const fn = jest.fn()
        render(<Button text = {buttonText} onClick={fn}/>)
        const button = screen.getByText(buttonText)
        fireEvent.click(button)
    })

})
