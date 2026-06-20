import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

const calMock = vi.fn();
const getCalApiMock = vi.fn().mockResolvedValue(calMock);

vi.mock("@calcom/embed-react", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => (
    <div data-testid="cal-embed" data-namespace={props.namespace} data-cal-link={props.calLink} />
  ),
  getCalApi: (...args: unknown[]) => getCalApiMock(...args),
}));

import { CalEmbed } from "./CalEmbed";
import { CAL_LINK, CAL_NAMESPACE, CAL_UI_CONFIG } from "@/lib/cal";

describe("CalEmbed", () => {
  it("renders the Cal embed with the configured namespace and link", () => {
    const { getByTestId } = render(<CalEmbed />);
    const el = getByTestId("cal-embed");
    expect(el).toHaveAttribute("data-namespace", CAL_NAMESPACE);
    expect(el).toHaveAttribute("data-cal-link", CAL_LINK);
  });

  it("initializes the Cal API with the namespace and applies the UI config", async () => {
    render(<CalEmbed />);
    await vi.waitFor(() => {
      expect(getCalApiMock).toHaveBeenCalledWith({ namespace: CAL_NAMESPACE });
      expect(calMock).toHaveBeenCalledWith("ui", CAL_UI_CONFIG);
    });
  });
});
