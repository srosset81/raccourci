import React from 'react';
import ReactDOM from 'react-dom';
import {Background, Title, TextField, Button, Message} from './styled';
import {isUrlValid} from './functions';

const backendUrl = 'http://localhost';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'http://',
            error: null,
            success: null,
        };
    }

    handleChange(event) {
        this.setState({url: event.target.value});
    }

    setErrorMessage(message) {
        this.setState({error:message, success: null});
    }

    setSuccessMessage(message) {
        this.setState({error:null, success: message});
    }

    handleSubmit(event) {
        event.preventDefault();
        if( this.state.url && isUrlValid(this.state.url) ) {
            fetch(backendUrl, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: this.state.url})
            }).then( response => {
                return response.text();
            }).then( response => {
                if( response!=="error" ) {
                    this.setSuccessMessage(`Voici votre URL raccourci: ${backendUrl}/${response}`);
                } else {
                    this.setErrorMessage("Nous n'avons pas pu générer l'URL raccourci.");
                }
            });
        } else {
            this.setErrorMessage("Veuillez soumettre une URL valide !");
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <Background>
                    <Title>Raccour.ci</Title>
                    <TextField value={this.state.url} onChange={this.handleChange.bind(this)}/>
                    <Button type="submit">Raccourcir l'URL</Button>
                    {this.state.error &&
                    <Message color="red">{this.state.error}</Message>
                    }
                    {this.state.success &&
                    <Message color="green">{this.state.success}</Message>
                    }
                </Background>
            </form>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));