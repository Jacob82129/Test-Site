import React from 'react';
import CardList from '../components/CardList';

import SearchBox from '../components/SearchBox';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary'

import Scroll from '../components/Scroll'



class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users}));
        
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
        
    }
    render() {

        const { robots, searchfield } = this.state;

        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        if (robots.length === 0) {
            return <h1>Loading</h1>
        } else {

        

            return (
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filterRobots}/>
                        </ErrorBoundary>
                        
                    </Scroll>
                    
                </div>
                
            );

        }
    }
    
}

export default App;