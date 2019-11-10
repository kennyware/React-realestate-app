const ConvertPrice = price => {
    let newPrice = '';
    if(price !== price.toString()){
        price = price.toString()
    } 

    price = price.split('').reverse().join('');
    for(let i = 0; i < price.length; i++){
        if(i % 3 !== 0){
            newPrice += price[i]
        } else {
            if(i === 0) newPrice += price[i]
            else newPrice += ','.concat(price[i])
        }
        
    }

    return '$'.concat(newPrice.split('').reverse().join(''))
}

export default ConvertPrice;