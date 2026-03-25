import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { YearlyReportView } from "./YearlyReportView";

describe("Yearrly report", () => 
    it("has UI components", async () => {
        render(<YearlyReportView />)
    })
})