import { act, cleanup, fireEvent, RenderResult } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "regenerator-runtime/runtime";
import Topbar from "../../../layout/Topbar";
import { render } from "../../test-utils";

afterEach(cleanup);

it("User should not see the tech tabs", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <BrowserRouter>
                <Topbar setUser={() => { }} user={{ role: "user", userName: "Jan" }} />
            </BrowserRouter>
        );
    });

    expect(renderResult.queryByRole("tab")).toBeNull();
});

it("Tech should see two tabs", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <BrowserRouter>
                <Topbar setUser={() => { }} user={{ role: "tech", userName: "Paweł" }} />
            </BrowserRouter>
        );
    });

    expect(renderResult.queryAllByRole("tab")).toHaveLength(2);
});

it("Active tabs should be selected", async () => {
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(
            <BrowserRouter>
                <Topbar setUser={() => { }} user={{ role: "tech", userName: "Paweł" }} />
            </BrowserRouter>
        );
    });
    const tabs = renderResult.queryAllByRole("tab");
    await act(async () => {
        fireEvent.click(tabs[0]);
    });

    expect(tabs[0].getAttribute("aria-selected")).toEqual("true");
    expect(tabs[1].getAttribute("aria-selected")).toEqual("false");
    await act(async () => {
        fireEvent.click(tabs[1]);
    });
    expect(tabs[0].getAttribute("aria-selected")).toEqual("false");
    expect(tabs[1].getAttribute("aria-selected")).toEqual("true");
});


