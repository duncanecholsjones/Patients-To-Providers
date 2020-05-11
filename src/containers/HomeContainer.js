import React from 'react';
import { Provider } from "react-redux";
import {Route} from "react-router-dom";
import {combineReducers, createStore} from "redux";
import HomeComponent from '../components/home/HomeComponent';
import RegisterComponent from '../components/register/RegisterComponent';
import LoginComponent from '../components/login/LoginComponent';
import SearchComponent from '../components/search/SearchComponent';

const rootReducer = combineReducers({

})

const store = createStore(rootReducer)

class HomeContainer extends React.Component {

    render() {
        return (

            <Provider store={store}>
                <div>
                    <Route path="/" exact={true} 
                        render={(props) =>
                        <div>
                            <HomeComponent
                                history={props.history} />
                        </div>
                    }>
                    </Route>
                    <Route path="/register" exact={true} 
                        render={(props) =>
                        <div>
                            <RegisterComponent
                                history={props.history} />
                        </div>
                    }>
                    </Route>
                    <Route path="/login" exact={true} 
                        render={(props) =>
                        <div>
                            <LoginComponent
                                history={props.history} />
                        </div>
                    }>
                    </Route>
                    <Route path="/search" exact={true} 
                        render={(props) =>
                        <div>
                            <SearchComponent
                                history={props.history} />
                        </div>
                    }>
                    </Route>
                </div>
            </Provider>

        )
    }
}

export default HomeContainer