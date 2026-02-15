import { defineConfig } from "allure";

export default defineConfig({
    name: "Playwright Allure Report",
    output: "./allure-report",
    baseUrl: "https://antonqa1.github.io/Diploma-task3/",
    historyPath: "./allure-history.jsonl",
    appendHistory: true
});
