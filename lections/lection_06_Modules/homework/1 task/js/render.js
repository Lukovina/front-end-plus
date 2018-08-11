function render(currency, target, symbol) {
    target.innerHTML = `${currency} ${symbol}`
}

function archRender(args, diffs,  inner, symbol) {

   
    inner.innerHTML += `
        ${args.map((item, index)=>
            `<tr>
                <td>${item} ${symbol}</td>
                <td>${diffs[index]} %<td>
            </tr>`
        ).join("")}
    `
}

module.exports = {
    render,
    archRender
}