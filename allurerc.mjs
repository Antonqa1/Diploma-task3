import { defineConfig } from "allure";

export default defineConfig({
    name: "Playwright Allure Report",
    output: "./allure-report",
    historyPath: "./allure-history.jsonl",
    appendHistory: true,
    links: {
        report: "https://antonqa1.github.io/diploma-task3/"
    }

});
