// AccessibilityErrors.jsx
// ⚠️  This file contains INTENTIONAL accessibility errors for axe-core testing.
// Do NOT use this as a template for production code.
//
// Errors included:
//  1.  <img> missing alt text                          → WCAG 1.1.1
//  2.  Low colour contrast (grey text on white)        → WCAG 1.4.3
//  3.  <input> with no <label>                         → WCAG 1.3.1 / 4.1.2
//  4.  <button> with no accessible name               → WCAG 4.1.2
//  5.  Duplicate id attributes                         → WCAG 4.1.1
//  6.  <a> with non-descriptive "click here" text      → WCAG 2.4.4
//  7.  tabIndex={0} on a <div> used as a button        → WCAG 4.1.2 (missing role)
//  8.  autoFocus on a buried element (focus trap risk) → WCAG 2.4.3
//  9.  <html> lang attribute missing (set in index.html but shown here as comment)
// 10.  Form error not programmatically associated      → WCAG 3.3.1
// 11.  Empty <th> in table                            → WCAG 1.3.1
// 12.  Positive tabIndex disrupting focus order        → WCAG 2.4.3
// 13.  <select> missing label                          → WCAG 1.3.1
// 14.  onClick only (no onKeyDown) on non-button       → WCAG 2.1.1
// 15.  <iframe> missing title                          → WCAG 4.1.2

import { useState } from "react";

export default function AccessibilityErrors() {
  const [inputVal, setInputVal] = useState("");
  const [selectVal, setSelectVal] = useState("");

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        maxWidth: 760,
        margin: "0 auto",
        padding: "2rem",
        background: "#fff",
        color: "#111",
      }}
    >
      <h1>Accessibility Error Demo Page</h1>
      <p style={{ color: "#aaa" }}>
        {/* ❌ Error 2: Low contrast — #aaa on #fff fails WCAG 1.4.3 */}
        This paragraph has intentionally low colour contrast. axe-core should
        flag it.
      </p>

      {/* ❌ Error 1: <img> with no alt attribute */}
      <img
        src="https://placekitten.com/400/200"
        width={400}
        height={200}
        alt="Placeholder kitten image 23"
        style={{ display: "block", marginBottom: "1rem" }}
      />

      {/* ❌ Error 3: <input> with no associated <label> */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          style={{ padding: "0.5rem", width: "100%" }}
        />
        {/* ❌ Error 10: Error message not linked to input via aria-describedby */}
        {inputVal.length === 0 && (
          <span style={{ color: "red", fontSize: "0.85rem" }}>
            This field is required.
          </span>
        )}
      </div>

      {/* ❌ Error 13: <select> with no <label> */}
      <div style={{ marginBottom: "1rem" }}>
        <select
          value={selectVal}
          onChange={(e) => setSelectVal(e.target.value)}
          style={{ padding: "0.5rem", width: "100%" }}
        >
          <option value="">Choose an option</option>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </select>
      </div>

      {/* ❌ Error 4: <button> has no accessible name (empty content) */}
      <button
        style={{
          padding: "0.5rem 1rem",
          marginRight: "1rem",
          background: "#0057b7",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Submit"
      >Submit</button>

      {/* ❌ Error 6: Non-descriptive link text */}
      <a href="https://example.com" style={{ marginRight: "1rem" }}>
        click here
      </a>

      {/* ❌ Error 7 & 14: <div> acting as button — no role, no onKeyDown */}
      <div
        tabIndex={0}
        onClick={() => alert("Div clicked")}
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          background: "#444",
          color: "#fff",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Submit Form
      </div>

      {/* ❌ Error 12: Positive tabIndex — disrupts natural focus order */}
      <div style={{ marginBottom: "1rem" }}>
        <input tabIndex={5} type="text" placeholder="tabIndex=5 (bad)" />
        <input tabIndex={1} type="text" placeholder="tabIndex=1 (bad)" />
        <input tabIndex={3} type="text" placeholder="tabIndex=3 (bad)" />
      </div>

      {/* ❌ Error 5: Duplicate id values */}
      <section style={{ marginBottom: "1rem" }}>
        <h2 id="section-title">Section One</h2>
        <p id="section-title">
          {/* same id as <h2> above */}
          This paragraph shares its id with the heading above. axe-core flags
          duplicate IDs.
        </p>
      </section>

      {/* ❌ Error 8: autoFocus on a buried interactive element */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="auto-focus-field">Auto-focused field (buried)</label>
        <input
          id="auto-focus-field"
          type="email"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder="Receives focus on load — disrupts reading order"
          style={{ display: "block", padding: "0.5rem", width: "100%" }}
        />
      </div>

      {/* ❌ Error 11: Table with empty <th> cells */}
      <table
        border={1}
        style={{ width: "100%", marginBottom: "1rem", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th></th> {/* ❌ empty header */}
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Alice</td>
            <td>Developer</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Bob</td>
            <td>Designer</td>
          </tr>
        </tbody>
      </table>

      <iframe src="https://example.com" width="100%" height="500" title="External Content" aria-label="Embedded website content">

      <hr />
      <p style={{ fontSize: "0.8rem", color: "#888" }}>
        Run axe-core against this component to discover all 15 flagged issues.
      </p>
    </div>
  );
}
