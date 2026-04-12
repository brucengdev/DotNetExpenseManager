import { describe, expect, it } from "vitest";
import { CheckBox } from "./CheckBox";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

describe("CheckBox control", () => {
    it("disables checkbox if disabled is true", () => {
        render(<CheckBox label="Test Checkbox" 
            checked={false} 
            onChange={() => {}} 
            disabled={true}
            dataTestId="test-checkbox" />)
        
        expect(screen.getByRole("checkbox")).toBeDisabled()
    })

    const disabledValues = [undefined, false]
    disabledValues.forEach(disabledValue => {
        it(`enables checkbox if disabled is ${disabledValue}`, () => {
            render(<CheckBox label="Test Checkbox" 
                checked={false} 
                onChange={() => {}} 
                disabled={disabledValue}
                dataTestId="test-checkbox" />)
            
            expect(screen.getByRole("checkbox")).toBeEnabled()
        })
    })
})