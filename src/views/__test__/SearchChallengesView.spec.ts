import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import SearchChallengesView from "@/views/SearchChallengesView.vue";

describe("SearchChallengesView", () => {
    it("renders the correct heading", () => {
        const wrapper = mount(SearchChallengesView);
        const heading = wrapper.find("h1");
        expect(heading.text()).toContain("Challenges zoeken");
    });
});
