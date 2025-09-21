"use client";

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
    const selection = window.getSelection();
    const element = document.getElementById("myElement");
    if (!selection) {
      console.log("No text selected");
      return;
    }

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      console.log(range);
      if (element?.contains(range.commonAncestorContainer)) {
        const selectedText = selection.toString();
        console.log(selectedText);
      }
    }
  }
  function italic() {
    console.log("Make it italic");
  }
  function underline() {
    console.log("Make it underline");
  }
  function undo() {
    console.log("Make it undo");
  }
  function redo() {
    console.log("Make it redo");
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
