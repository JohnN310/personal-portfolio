const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const code = ts.transpileModule(fs.readFileSync("src/components/layout/SectionLink.tsx", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
function setup(current, destination, reduced = false, found = true) {
  const scrolls = [], frames = [];
  const exports = {};
  const section = { scrollIntoView: options => scrolls.push(options) };
  vm.runInNewContext(code, { exports, URL, require: name => name === "react/jsx-runtime" ? { jsx: (type, props) => ({ type, props }) } : { default: "a" }, window: { location: { href: current }, matchMedia: () => ({ matches: reduced }) }, document: { getElementById: id => found && id === "research" ? section : null }, requestAnimationFrame: callback => frames.push(callback) });
  const element = exports.SectionLink({ href: "/#research", children: "Research Experience" });
  const event = { button: 0, currentTarget: { href: destination }, preventDefault() { this.defaultPrevented = true; } };
  return { click: () => element.props.onClick(event), event, scrolls, frames };
}
const research = "https://johnn310.github.io/personal-portfolio/#research";
test("repeated anchor clicks scroll each time without router navigation", () => {
  const h = setup(research, research);
  h.click(); assert.equal(h.event.defaultPrevented, true); assert.equal(h.scrolls.length, 0);
  h.frames.shift()(); assert.equal(h.scrolls[0].behavior, "smooth");
  h.event.defaultPrevented = false; h.click(); h.frames.shift()(); assert.equal(h.scrolls.length, 2);
});
test("reduced motion uses instant scrolling", () => {
  const h = setup(research, research, true); h.click(); h.frames.shift()(); assert.equal(h.scrolls[0].behavior, "instant");
});
test("different hashes and detail-page navigation remain with Next Link", () => {
  for (const url of [research.replace("#research", "#work"), research.replace("/#research", "/work/remeli/")]) {
    const h = setup(url, research); h.click(); assert.equal(h.frames.length, 0); assert.equal(h.event.defaultPrevented, undefined);
  }
});
test("modified clicks and absent targets retain native behavior", () => {
  for (const modifier of ["ctrlKey", "metaKey", "shiftKey", "altKey"]) {
    const h = setup(research, research); h.event[modifier] = true; h.click(); assert.equal(h.frames.length, 0);
  }
  const h = setup(research, research, false, false); h.click(); assert.equal(h.event.defaultPrevented, undefined);
});
