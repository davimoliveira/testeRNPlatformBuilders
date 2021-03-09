export async function Get(url){
    return (
        //Requisição da api de clima, a variavel 'url' contem os dados da requisição
        fetch("https://api.openweathermap.org/data/2.5/"+url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}).then((response) => response.json())
            .then((json)=>{
                return(json);
            })
            .catch((error)=>{
                alert(JSON.stringify(error));
            })
    )
}