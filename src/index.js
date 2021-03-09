import React, {useState, useEffect} from "react";
import {View, Text, PermissionsAndroid, Button, Platform, Image, TouchableOpacity} from "react-native";
import Geolocation from '@react-native-community/geolocation';
import {Get} from './services/api';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import Loading from "./components/Loading";
import Error from "./components/Error";

export default function App () {
    const coresClima = {
        "01d":  ['#0463CA', '#0487E2', '#65C2F5'],
        "01n": ['#040a2e', '#04164e', '#0a2680'],
        "02d": ['#3768af', '#8fa8ee', '#e4e4e7'],
        "02n": ['#040434', '#04164e', '#a4a4b0'],
        "03d": ['#3768af', '#8fa8ee', '#e4e4e7'],
        "03n": ['#040434', '#04164e', '#a4a4b0'],
        "04d": ['#9d9d9d', '#b0b0b1', '#e4e4e7'],
        "04n": ['#9d9d9d', '#b0b0b1', '#e4e4e7'],
        "09d": ['#9d9d9d', '#b0b0b1', '#e4e4e7'],
        "09n": ['#9d9d9d', '#b0b0b1', '#e4e4e7'],
        "50d": ['#9d9d9d', '#b0b0b1', '#e4e4e7'],
        "50n": ['#9d9d9d', '#b0b0b1', '#e4e4e7'],
        "10d": ['#6d6d6d', '#566f97', '#e4e4e7'],
        "10n": ['#040434', '#6d6d6d', '#a4a4b0'],
        "11d": ['#060c0c', '#10172d', '#8b9cc8'],
        "11n": ['#060c0c', '#10172d', '#8b9cc8'],
        "13d": ['#d0e7fb', '#c7f5fe', '#defffe'],
        "13n": ['#d0e7fb', '#c7f5fe', '#defffe'],
     /* Lista de degradês para background relacionados aos icones de condição climática*/
    };
    /* State */
    const [clima, setClima] = useState({weather:[{}], main:{}});
    const [icon, setIcon] = useState("");
    
    pegarPermissao = async () =>{
            
            var permitido = false;
            if(Platform.OS == 'android'){
                //Verifica ou pede permissão para localização de android
                var permission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Permissão para acesso à localização",
                        message:
                            "Gostariamos de acessar sua localização."+
                            "Sua localização será usada para determinar a previsão do tempo para sua área.",
                        buttonNeutral: "Perguntar mais tarde",
                        buttonNegative: "Não",
                        buttonPositive: "Sim"
                    }  
                );
                
                if(permission === PermissionsAndroid.RESULTS.GRANTED){
                    permitido = true;
                }
            }else{
                //Verifica permissão para localização de iOS
                check(PERMISSIONS.IOS.LOCATION_ALWAYS)
                    .then((result) => {
                        if(result === RESULTS.GRANTED){
                            permitido = true;
                        }
                    });
            }
            if(permitido){
                this.verificaTempo();
            }else{
                //Caso não tenha permissão limpa o State e manda uma mensagem, ativando o componente de erro.
                setClima({weather:[{}], main:{}, mensagem:"Não temos permissão para\n acessar sua localização.",});
            }

    }

    verificaTempo = async () =>{
        //Limpa estado para ativar o componente de loading
        setClima({weather:[{}], main:{}});

        //Pega geolocalização, longitude e latitude
        await Geolocation.getCurrentPosition(async info => {
            
            //Chamada de api de clima com latitude, longitude, língua, tipos de unidades(métrico, imperial, etc.),   
            var resTempo = await Get("weather?lat="+info.coords.latitude+"&lon="+info.coords.longitude+"&lang=pt_br&units=metric&appid=dfc63eaceb2c033f3f35e5e349ddafac");
        
            if(resTempo && resTempo.cod == "200"){
                //endereço dos icones da api
                var image = "http://openweathermap.org/img/wn/"+resTempo.weather[0].icon+"@4x.png";

                //preenche o state com uri da imagem
                setIcon({uri:image});

                //preenche state com informações do clima
                setClima(resTempo);

            }else{
                //Em caso de erro limpa o state e manda uma mensagem, ativando o componente de erro.
                setClima({weather:[{}], main:{}, mensagem:"Um erro ocorreu: \n"+resTempo.message});
            }
        
        });
    }

    useEffect(() =>{
        //Ativa função de permissão ao termino do carregamento da página.
        this.pegarPermissao();
    },[]);

    if(clima.weather[0].description){
        return (
        <LinearGradient colors={coresClima[clima.weather[0].icon]} style={{...styles.container, backgroundColor:"#87ceeb"}}>
          
            <View />
          
            <Text style={styles.cidade}>
                {clima.name != undefined?clima.name:""}
            </Text>

            <View style={styles.containerCentral}>
                <Text style={styles.temperatura}>
                    {clima.main.temp != undefined?clima.main.temp:""}
                    <Text style={styles.mini}>    
                        {clima.main.temp != undefined?"°C":""}
                    </Text>
                </Text>
                <Text style={styles.condicao}>
                    {clima.weather[0].description != undefined?clima.weather[0].description:""}
                </Text>
            </View>

            <View style={styles.containerInferior}>
                <View style={styles.lineIcons}>
                    <Image style={styles.icon} source={icon == ""?"":icon} />
                    <View style={styles.containerTxtInferior}>
                        <Text style={styles.minMax}>
                             {clima.main.temp_min != undefined?(clima.main.temp_min+"°"):""}/{clima.main.temp_max != undefined?clima.main.temp_max+"°":""}
                        </Text>
                        <Text style={styles.txtMiniInferior}>
                            Mín/Máx
                        </Text>
                        <Text style={styles.txtInferior}>
                            Sensação: {clima.main.feels_like != undefined?clima.main.feels_like+"°":""}
                        </Text>

                    </View>
                </View>
                <View style={styles.containerIcons}>
                    <View style={styles.lineIcons}>
                        <View style={{flexDirection: "row"}}>
                            <Image style={styles.iconSet} source={require("./assets/humidity.png")} />
                            <Text style={styles.iconTxt}>{clima.main.humidity}%</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Image style={styles.iconSet} source={require("./assets/wind.png")} />
                            <Text style={styles.iconTxt}>{(clima.wind.speed*3.6).toFixed(1)+"\n"}km/h</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Image style={styles.iconSet} source={require("./assets/pressure.png")} />
                            <Text style={styles.iconTxt}>{clima.main.pressure+"\n"}mbar</Text>
                        </View>
                    </View>
                </View>

            </View>
            <TouchableOpacity style={styles.containerInferior} onPress={() => {this.verificaTempo()}} >
                <Text style={styles.btAtualizar}>
                    Atualizar
                </Text>
            </TouchableOpacity>
            
            <View />
        </LinearGradient>
        );
    }else if(clima.mensagem){
        return(
            <Error {...{mensagem: clima.mensagem, verificaTempo:()=>this.verificaTempo()}} />
        )
    }else{
        return(
            <Loading />
        )
    }
}

