import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            startDate: '',
            endDate: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',

            locations: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleMaxPresentations = this.handleMaxPresentations.bind(this);
        this.handleMaxAttendees = this.handleMaxAttendees.bind(this);
        this.handleLocation = this.handleLocation.bind(this);

    }

    async handleSubmit(event) {  //CHANGE THIS
        event.preventDefault();
        const data = { ...this.state };
        data.starts = data.startDate;
        data.ends = data.endDate;
        data.max_attendees = data.maxAttendees
        data.max_presentations = data.maxPresentations;
        delete data.locations;
        console.log(data);

        const conferenceUrl = "http://localhost:8000/api/conferences/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            const cleared = {
                name: '',
                startDate: '',
                endDate: '',
                description: '',
                maxPresentations: '',
                maxAttendees: '',
                locations: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleStartDate(event) {
        const value = event.target.value;
        this.setState({ startDate: value })
    }

    handleEndDate(event) {
        const value = event.target.value;
        this.setState({ endDate: value })
    }

    handleDescription(event) {
        const value = event.target.value;
        this.setState({ description: value })
    }

    handleMaxPresentations(event) {
        const value = event.target.value;
        this.setState({ maxPresentations: value })
    }

    handleMaxAttendees(event) {
        const value = event.target.value;
        this.setState({ maxAttendees: value })
    }

    handleLocation(event) {
        const value = event.target.value;
        this.setState({ location: value })
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data.locations)
            this.setState({ locations: data.locations });


        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new conference</h1>
                            <form onSubmit={this.handleSubmit} id="create-conference-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name"
                                        className="form-control" />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleStartDate} value={this.state.startDate} placeholder="start-date" required type="date" name="start-date" id="start-date"
                                        className="form-control" />
                                    <label htmlFor="start-date">Start-date</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleEndDate} value={this.state.endDate} placeholder="end-date" required type="date" name="end-date" id="end-date"
                                        className="form-control" />
                                    <label htmlFor="end-date">end-date</label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea onChange={this.handleDescription} value={this.state.description} placeholder="Enter description..." required className="form-control"
                                        name="description" id="description" rows="3"></textarea>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleMaxPresentations} value={this.state.maxPresentations} placeholder="max-present" required type="number" name="max-present"
                                        id="max-present" className="form-control" />
                                    <label htmlFor="max-present">max-presententations</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleMaxAttendees} value={this.state.maxAttendees} placeholder="max-attendees" required type="number" name="max-attendees"
                                        id="max-attendees" className="form-control" />
                                    <label htmlFor="max-attendees">max-attendees</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleLocation} value={this.state.location} required name="location" id="location" className="form-select">
                                        <option value="">Choose a location</option>
                                        {this.state.locations.map(location => {
                                            return (
                                                <option key={location.id} value={location.id}>{location.name} </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <button className="btn btn-primary">Create</button>
                                {/* <a className="btn btn-primary" href="new-conference.html">Attend!</a> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ConferenceForm;
