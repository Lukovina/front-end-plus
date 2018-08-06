function render(currency, target, symbol) {
    target.innerHTML = `${currency} ${symbol}`
}

module.exports = {
    render
};