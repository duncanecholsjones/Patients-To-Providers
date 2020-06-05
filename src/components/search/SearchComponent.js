// Duncan Echols-Jones
// 4/3/2020
// React Search Component, used to render our Search page where a user will search for a condition

import React from 'react';
import UserService from '../../services/UserService';
import SearchService from '../../services/SearchService';
import './SearchComponentStyles.css';
import { getConditionsDispatch } from '../../actions/conditionActions';
import { connect } from "react-redux";

class SearchComponent extends React.Component {

    state = {
        user: {},
        conditionsArray: []
    }

    // Get logged in user and then user Redux to call SymptomChecker API and store all conditions
    // in the store (via getConditionsAction())
    componentDidMount() {
        UserService.getLoggedInUser().then(actualUser => this.setState({ user: actualUser }))
        this.props.getConditionsAction()
    }

    componentDidUpdate(prevProps, prevState) {
        // Push all conditions from store into local array to enable autocomplete functionality
        if (prevProps.conditions !== this.props.conditions) {
            this.props.conditions.forEach(element => {
                this.state.conditionsArray.push(element.Name)
            })
        }
        this.autocomplete(document.getElementById("myInput"), this.state.conditionsArray)
    }

    handleLogout() {
        UserService.logout().then(response =>
            this.setState(prevState => ({
                user: {}
            }))
        )
    }

    // Source: https://www.w3schools.com/howto/howto_js_autocomplete.asp
    autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode === 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode === 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode === 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt !== x[i] && elmnt !== inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    // User URL to send us to that conditions Details page
    handleSearch() {
        let searchId = this.props.conditions.find(condition => condition.Name === document.getElementById("myInput").value).ID
        this.props.history.push(`/search/${searchId}`)
    }


    render() {
        return (
            <div className="container-fluid">
                {!this.state.user.username &&
                    <div className="unlogged-message">
                        <h5>You are not logged in. <a href="/login">Go to login</a></h5>
                    </div>
                }
                {this.state.user.username &&
                    <div className="row top-row">
                        <button onClick={() => this.handleLogout()} className="btn btn-secondary">Logout</button>
                        <h1>Logged in as {this.state.user.username}</h1>
                    </div>
                }
                <div className="jumbotron">
                    <h1 className="display-4">Search your conditions</h1>
                    <p className="lead">Enter your condition, disease, or illness (ex. 'Diabetes Type 2')</p>
                    <hr className="my-4" />
                    <p>Searching for your condition allows us to show you other patients who suffer from that same condition as well as providers who specialize in that condition.</p>

                    <form autoComplete="off" action="/action_page.php">
                        <div className="autocomplete">
                            <input id="myInput" type="text" name="myCondition" placeholder="Search conditions" />
                        </div>
                        <input onClick={() => this.handleSearch()} type="submit" />
                    </form>

                </div>
            </div>
        )
    }
}

// Redux store mapper
const stateToPropertyMapper = (state) => {
    return {
        conditions: state.conditions.conditions
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        getConditionsAction: () =>
            SearchService.getConditions()
                .then(actualConditions =>
                    dispatch(getConditionsDispatch(actualConditions))
                )
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
    (SearchComponent)