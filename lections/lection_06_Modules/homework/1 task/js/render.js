function render(currency, target, symbol) {
    target.innerHTML = `${currency} ${symbol}`
}

function archRender(args, inner) {
   
    inner.innerHTML += `
        ${args.map(item=>
            `<tr><td>${item}</td></tr>`
        ).join("")}
    `
}

module.exports = {
    render,
    archRender
}