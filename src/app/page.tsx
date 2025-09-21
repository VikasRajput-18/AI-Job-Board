"use client";
import React from "react";

function unwrapBold(range: Range) {
  const contents = range.extractContents();

  const walker = document.createTreeWalker(contents, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      return node.nodeName === "STRONG" || node.nodeName === "B"
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });

  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentNode;
    while (node.firstChild) {
      parent?.insertBefore(node.firstChild, node);
    }
    parent?.removeChild(node);
  }

  range.insertNode(contents);
}

function RichTextEditor() {
  function handleAction(action: string) {
    return function () {
      if (action === "bold") {
        bold();
      } else if (action === "italic") {
        italic();
      } else if (action === "underline") {
        underline();
      } else if (action === "undo") {
        undo();
      } else if (action === "redo") {
        redo();
      } else {
        console.log("No Action");
      }
    };
  }

  function bold() {
    toggleBold();
    function toggleBold() {
      const selection = window.getSelection();
      if (!selection) return;
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      if (range.collapsed) return; // No text selected

      // Create a span to inspect the selection's formatting
      const span = document.createElement("span");
      span.appendChild(range.cloneContents());

      const alreadyBold = span.querySelector("strong, b");
      if (alreadyBold) {
        // If it's bold, unwrap <strong>/<b>
        unwrapBold(range);
      } else {
        // If not bold, wrap with <strong>
        const strong = document.createElement("strong");
        strong.appendChild(range.extractContents());
        range.insertNode(strong);
      }
    }
  }

  function italic() {
    const selection = window.getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return; // No text selected
    // If not bold, wrap with <i>
    const italic = document.createElement("i");

    italic.appendChild(range.extractContents());

    range.insertNode(italic);
  }

  function underline() {
    const selection = window.getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return; // No text selected
    // If not bold, wrap with <i>
    const underline = document.createElement("u");

    underline.appendChild(range.extractContents());

    range.insertNode(underline);
  }

  function undo() {
    // basic undo/redo can be delegated to document.execCommand as fallback
    // (deprecated) or use a proper history stack
    document.execCommand("undo");
  }
  function redo() {
    document.execCommand("redo");
  }

  return (
    <div className="rich-text-editor ">
      <h6 className="mt-2">Rich Text Editor</h6>
      <div className="py-2 toolbar border-y border-neutral-500  w-full flex space-x-5 justify-center items-center">
        <button
          className="px-4 py-2 rounded-md bg-neutral-950 bold"
          onClick={handleAction("bold")}
        >
          B
        </button>
        <button
          className="px-4 py-2 rounded-md bg-neutral-950 italic"
          onClick={handleAction("italic")}
        >
          I
        </button>
        <button
          className="px-4 py-2 rounded-md bg-neutral-950 underline"
          onClick={handleAction("underline")}
        >
          U
        </button>

        <button
          className="px-4 py-2 rounded-md bg-neutral-950"
          onClick={handleAction("undo")}
        >
          Undo
        </button>
        <button
          className="px-4 py-2 rounded-md bg-neutral-950"
          onClick={handleAction("redo")}
        >
          Redo
        </button>
      </div>
      <div
        id="myElement"
        className="editor border-0 outline-none"
        contentEditable={true}
      ></div>
    </div>
  );
}

export default RichTextEditor;
