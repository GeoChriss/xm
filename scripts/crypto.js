document.addEventListener('DOMContentLoaded',()=>{
    fetch('https://api.coinlore.net/api/tickers/')
    .then(response => response.json())
    .then(data =>{
        const tickers = data.data;

        const btc =tickers.find(tickers => tickers.symbol ==="BTC");
        const eth =tickers.find(tickers => tickers.symbol ==="ETH");
        const xrp =tickers.find(tickers => tickers.symbol ==="XRP");
        const ltc =tickers.find(tickers => tickers.symbol ==="LTC");
        const bch =tickers.find(tickers => tickers.symbol ==="BCH");

        updatePrice('btc',btc);
        updatePrice('eth',eth);
        updatePrice('xrp',xrp);
        updatePrice('ltc',ltc);
        updatePrice('bch',bch);
    })
    .catch(error => console.error('error fetching data: ',error));
});

function updatePrice(cryptoId ,cryptoData){
    document.getElementById(`${cryptoId}price`).innerText=`$${cryptoData.price_usd}`;

    const changeElement=document.getElementById(`${cryptoId}change`);
    const changePercent=parseFloat(cryptoData.percent_change_24h);
    changeElement.innerText=`${changePercent}%`;

    changeElement.innerHTML='';

    const icon=document.createElement('span');
    icon.classList.add('icon');

    if(changePercent>0){
        changeElement.style.color='var(--priceup)';
        icon.classList.add('up');
        icon.classList.add('fa-solid', 'fa-circle-chevron-up');
    }else{
        changeElement.style.color='var(--pricedown)';
        icon.classList.add('down');
        icon.classList.add('fa-solid','fa-circle-chevron-down');
    }

    changeElement.appendChild(icon);
    changeElement.appendChild(document.createTextNode(` ${changePercent}%`));
}
    

