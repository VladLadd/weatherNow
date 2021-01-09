import React from 'react';
import sun from './33900.png';
import sky from './sky-svgrepo-com.svg'
import noimg from './no-image-icon-23492.png'
import './App.css';
import axios from 'axios';
import {IntlShape} from 'react-intl'

let zip = '350000';
class Controls extends React.Component{

    componentDidMount() {
    }
    render() {
        return(
            <div className="controls-block">
                <button className="button" onClick={()=> {zip = '350000'}}>KRD</button>
                <button className="button" onClick={()=> {zip = '357100'}}>NEV</button>
                <button className="button" onClick={()=> {zip = '125009'}}>MSK</button>
            </div>
            );

    }
}

class Weather extends React.Component{
    state = {
        city: '',
        temperature: '',
        sky: ''
    };
    getWeather() {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=` + zip + `&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric`).then(res => {
            const city = res.data.name ;
            const temperature = res.data.main.temp;
            const sky = res.data.weather[0];
            this.setState({city, temperature, sky});
        });
    }
    componentDidMount() {
        this.getWeather();
        this.timerID = setInterval(
            () => this.getWeather(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        let imageSrc;
        if (this.state.sky){
            imageSrc = <img src={ 'http://openweathermap.org/img/wn/' + this.state.sky.icon + '@2x.png'} className="sky-logo" />
        } else {
            imageSrc = <img src={noimg} className="sky-logo" alt="sky" />
        }
        return (
            <div>
                <h1 className="title-shadow"> weather from {this.state.city} </h1>

                {imageSrc}

                <p> air temperature {this.state.temperature} &#8451; </p>
                <p>Sky {this.state.sky.main}</p>
            </div>

        );
    }
}
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                You are on the site for {this.state.seconds} seconds
            </div>
        );
    }
}



function App() {
  return (
    <div className="App">
      <header className="App-header main_bg">
          <Controls/>
          <Weather/>
          <div className="timer">
              <Timer/>
          </div>
      </header>

    </div>
  );
}

export default App;
