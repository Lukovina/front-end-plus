function render(currency, target, symbol) {
    target.innerHTML = `${currency} ${symbol}`
}

function archRender(args, diffs,  inner, symbol) {

   
    inner.innerHTML = `
        <tr>
            <td >Курс валют <input type="number" class="arch-quantity_input" value="1"></td>
            <td>Разница</td>
        </tr>
        ${args.map((item, index)=>
            `<tr>
                <td>${item} ${symbol}</td>
                <td>${diffs[index]} %</td>
            </tr>`
        ).join("")}
    `
}

module.exports = {
    render,
    archRender
}