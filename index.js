import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import './index.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: null,
            errorMessage: '',
            time: ''
        };
    }
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position)=>{
                this.setState({
                    lat: position.coords.latitude
                })
            },
            (err)=>{
                this.setState({
                    errorMessage: err.message
                })
            }
        );
        setInterval(()=>{
            this.setState({
                time: new Date().toLocaleTimeString()
            })
        },1000);
    }
    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }else if(!this.state.errorMessage && this.state.lat){
            return(
                <div>
                    <SeasonDisplay lat={this.state.lat}/>
                    <h3 className="ui time big">{this.state.time}</h3>
                </div>
            );
        }else{
            return(
                <div className="ui active dimmer">
                    <div className="ui big text loader">Please accept location request</div>
                </div>
            );
        }
    }
    render(){
        return(
            <div>{this.renderContent()}</div>
        );
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));