import styled from 'styled-components';

export const Background = styled.div`
    height: 100vh;
    width: 100%;
    background-image: url('/img/background.jpg');
    background-size: cover;
    background-position: center;
    text-align: center;
    padding: 20px;
`;

export const Title = styled.p`
    text-align: center;
    color: white;
    font-family: 'Verdana', sans-serif;
    font-size: 46pt;
    padding: 80px 20px 60px;
`;

export const Message = styled.p`
    text-align: center;
    color: ${props => props.color || 'white'};
    font-family: 'Verdana', sans-serif;
    font-size: 18pt;
    padding: 20px 0;
`;

export const TextField = styled.input.attrs({
    type: 'text',
})`
    font-family: 'Verdana', sans-serif;
    font-size: 18pt; 
    padding: 5px 10px;
    max-width: 500px;
    border: 1px blue solid;
    width: 100%;
    margin: 10px 0px;
`;

export const Button = styled.button`
    font-family: 'Verdana', sans-serif;
    font-size: 18pt; 
    color: white;
    background-color: blue;
    padding: 5px 10px;
    border: 1px blue solid;
    margin: 10px 0px;
`;