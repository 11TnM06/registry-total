import React from "react";
import "./style_icon.css";

/*
 * @description: Table Icon custom component
 */
function TableIcon(props, icon) {
  const btn_ref = React.useRef(null);

  React.useEffect(() => {
    var btn = btn_ref.current;
    if (btn.children[1].innerHTML) {
      var label = btn.children[1].innerHTML;
      if (label == "") {
        btn_ref.current.classList.add("icon-only");
        btn_ref.current.removeChild(btn.children[1]);
      }
    }
  }, []);

  return (
    <button className="icon-btn" ref={btn_ref}>
      {icon}
      <div className="icon-label">{props.label}</div>
    </button>
  );
}

let Icon = {};
Icon.SortAsc = (props) =>
  TableIcon(
    props,
    <svg
      className="icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
    </svg>
  );
Icon.SortDesc = (props) =>
  TableIcon(
    props,
    <svg
      className="icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
    </svg>
  );
Icon.Add = (props) =>
  TableIcon(
    props,
    <svg
      className="icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2Z"></path>
    </svg>
  );
Icon.Column = (props) =>
  TableIcon(
    props,
    <svg
      className="icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path>{" "}
    </svg>
  );
Icon.Filter = (props) =>
  TableIcon(
    props,
    <svg
      className="icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
    </svg>
  );
Icon.Export = (props) =>
  TableIcon(
    props,
    <svg
      className="icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"></path>
    </svg>
  );
Icon.PaginationNext = (props) =>
  TableIcon(
    props,
    <svg
      className="icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
    </svg>
  );
Icon.PaginationPrev = (props) =>
  TableIcon(
    props,
    <svg
      className="icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
    </svg>
  );

Icon.Option = (props) =>
  TableIcon(
    props,
    <svg
      className="icon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
      <circle cx="12" cy="5" r="2" fill="currentColor"></circle>
      <circle cx="12" cy="19" r="2" fill="currentColor"></circle>{" "}
    </svg>
  );

Icon.Upload = (props) =>
  TableIcon(
    props,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height="18"
      width="18"
    >
      <path d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
    </svg>
  );

export { Icon };
