// Custom Elements
// Shadow DOM
// Slot

const template = document.createElement("template");

template.innerHTML = `
  <style>
    .user-card {
      font-family: 'Arial', sans-serif;
      background: #f4f4f4;
      width: 500px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10px;
      margin-bottom: 15px;
      border-bottom: darkorchid 5px solid;
    }

    .user-card img {
      width: 100%;
    }

    .user-card button {
      cursor: pointer;
      background: darkorchid;
      color: #fff;
      border: 0;
      border-radius: 5px;
      padding: 5px 10px;
    }
  </style>
  <div class='user-card'>
    <img />
    <div>
      <h3></h3>
      <div class='info'>
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">
        Hide info
      </button>
    </div>
  </div>
  `;

class UserCard extends HTMLElement {
  constructor() {
    super();
    // simple - global h3 styles will affect this. So going for shadowDOM
    // this.innerHTML = `<h3>${this.getAttribute("name")}</h3>`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggle-info")
      .addEventListener("click", this.toggleInfo);
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#toggle-info")
      .removeEventListener("click", this.toggleInfo);
  }

  toggleInfo = (e) => {
    this.shadowRoot.querySelector(".info").style.display =
      e.target.innerText === "Hide info" ? "none" : "block";
    e.target.innerText =
      e.target.innerText === "Hide info" ? "Show info" : "Hide info";
  };
}

customElements.define("user-card", UserCard);
