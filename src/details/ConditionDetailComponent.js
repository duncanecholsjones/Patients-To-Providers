import React from 'react';
import UserService from '../services/UserService';
import SearchService from '../services/SearchService';

class ConditionDetailComponent extends React.Component {

    state = {
        user: {},
        // Gives 'Description', 'DescriptionShort', 'MedicalCondition', 'Name', 'PossibleSymptoms',
        // 'ProfName', 'Synonyms', 'TreatmentDescription'
        conditionDetails: {},
        learnMore: false
    }

    componentDidMount() {
        UserService.getLoggedInUser().then(actualUser => this.setState({ user: actualUser }))
        SearchService.getConditionDetails(this.props.conditionId).then(details => this.setState({ conditionDetails: details }))
    }

    handleJoin() {
        let condition = this.state.conditionDetails
        condition['apiConditionId'] = this.props.conditionId
        UserService.addConditionForUser(condition)
        // then maybe we want to update our page so that when the user clicks 
        // "join community", it shows in their profile with other suggested
        // people with that health problem
    }

    handleLogout() {
        UserService.logout().then(response =>
            this.setState(prevState => ({
                user: {}
            }))
        )
    }

    render() {
        return (
            <div className="container-fluid">
                {this.state.user.username &&
                    <div className="row top-row">
                        <button onClick={() => this.handleLogout()} className="btn btn-secondary">Logout</button>
                        <h1>Logged in as {this.state.user.username}</h1>
                    </div>
                }
                {this.state.conditionDetails.Description &&
                    <div className="jumbotron">
                        <p className="lead">{this.state.conditionDetails.ProfName} (also known as {this.state.conditionDetails.Name})</p>
                        <br/>
                        <h5>Description</h5>
                        <p>{this.state.conditionDetails.DescriptionShort}</p>
                        <button onClick={() => this.handleJoin()} className="btn btn-primary">Join this community</button>
                        {!this.state.learnMore &&
                            <button onClick={() => this.setState({ learnMore: true })} className="btn btn-primary">Learn more</button>
                        }
                        {this.state.learnMore &&
                            <div>
                                <h5>Description cont.</h5>
                                <p>{this.state.conditionDetails.Description}</p>
                                <h5>Who is affected?</h5>
                                <p>{this.state.conditionDetails.MedicalCondition}</p>
                                <h5>Possible Symtpoms</h5>
                                <p>{this.state.conditionDetails.PossibleSymptoms}</p>
                                <h5>Treatment</h5>
                                <p>{this.state.conditionDetails.TreatmentDescription}</p>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }

}

export default ConditionDetailComponent