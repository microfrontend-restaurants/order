class OrderAddButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <button id="order-button" class="btn btn-sm btn-secondary">
            <i class="bi-plus"></i>
        </button>`;
        this.querySelector("#order-button").addEventListener("click", () => {
            const id = +this.getAttribute("item-id");
            this.addItem(id);
        });
    }

    addItem(id) {
        const result = localStorage.getItem("checkout");
        let items = result === null ? [] : JSON.parse(result);
        items.push(id);

        localStorage.setItem("checkout", JSON.stringify(items));

        const event = new CustomEvent("order:item_added", {
            bubbles: true,
            detail: { id }
        });
        this.dispatchEvent(event);
    }
}
window.customElements.define("order-add-button", OrderAddButton);