import logo from './logo.svg';
import './homepage.css';

function header() {
    return (
        <header >
            <p>Header</p>
        </header>
    )
}

function footer() {
    return (
        <footer>
            <p>Footer</p>
        </footer>
    )
}

function body() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )

}

export default function Homepage() {
    return (
        <div>
            {header()}
            {body()}
            {footer()}
        </div>
    );

}
