function render(currency, target, symbol) {
    target.innerHTML = `${currency} ${symbol}`
}

function archRender(current, args = [], inner) {
    inner.innerHTML = `
         <tr><td>${current}</td></tr>
    `
    inner.innerHTML+= `
        ${args.map(item=>
            `<tr><td>${item}</td></tr>`
        ).join("")}
    `
}

module.exports = {
    render,
    archRender
}