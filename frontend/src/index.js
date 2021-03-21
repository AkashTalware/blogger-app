import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux'
import reducer from './Components/Reducer/reducer'
import {Provider} from 'react-redux'
import { Container } from 'react-bootstrap';

const initial = {
	blogs: [],
	detailBlog: {id : null, edit: false},
	authdetails: {},
	token: "",
	userDetails:{}
}

const store = createStore(reducer, initial)

ReactDOM.render(
	<React.StrictMode>
		<Container>
			<Provider store = {store}>
				<App />
			</Provider>
		</Container>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
