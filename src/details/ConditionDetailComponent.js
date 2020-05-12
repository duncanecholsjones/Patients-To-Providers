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
                    <div className="container-fluid">
                        <p>{this.state.conditionDetails.ProfName} (also known as {this.state.conditionDetails.Name})</p>
                        <br/>
                        <h5>Description</h5>
                        <p>{this.state.conditionDetails.DescriptionShort}</p>
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