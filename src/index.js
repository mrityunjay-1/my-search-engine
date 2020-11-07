import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SearchResultPage from './SearchResultPage';
import './css/index.css';

ReactDOM.render(
    <>
        <Router>
            <Switch>
                <Route path="/my-search-engine" exact>
                    <HomePage />
                </Route>
                <Route path="/searchbar_with_searchresults" exact>
                    <SearchResultPage />
                </Route>
                <Route path="/videos" exact>
                    <videos />
                </Route>
            </Switch>
        </Router>
    </>, document.getElementById("root")
);
