document.addEventListener("DOMContentLoaded", () => {
    const taxToggle = document.getElementById("switchCheckDefault");
    const taxRate = 0.18;
    const priceElements = document.querySelectorAll(".listing-price");
    const taxLabels = document.querySelectorAll(".tax-info");

    const formatPrice = price => `&#8377; ${price.toLocaleString("en-IN")}`;

    const updatePrices = () => {
        const includeTax = taxToggle.checked;

        priceElements.forEach(priceElement => {
            const basePrice = Number(priceElement.dataset.price);
            const displayPrice = includeTax
                ? Math.round(basePrice * (1 + taxRate))
                : basePrice;

            priceElement.innerHTML = formatPrice(displayPrice);
        });

        taxLabels.forEach(taxLabel => {
            taxLabel.style.display = includeTax ? "inline" : "none";
        });
    };

    if (taxToggle) {
        taxToggle.addEventListener("change", updatePrices);
    }
});