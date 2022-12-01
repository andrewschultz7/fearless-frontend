import React from 'react';

class AttendConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            conference: '',
            conferences: [],
        };
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log("🚀 ", this.state.conferences)
        const data = { ...this.state };
        delete data.conferences;


        // const conferenceUrl = `"http://localhost:8001/api/${this.state.conferences.href}attendees/"`;
        const conferenceUrl = "http://localhost:8001/api/attendees/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const aConference = await response.json();


            const cleared = {
                name: '',
                email: '',
                conference: '',
                success: true,
            };
            this.setState(cleared);


        }
    }

    handleFullNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({ conference: value })
    }

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({ email: value })
    }


    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data.conferences)
            this.setState({ conferences: data.conferences });

        }
    }

    render() {
        let spinnerClasses = 'd-flex justify-content-center mb-3';
        let dropdownClasses = 'form-select d-none';
        let allSignedUp = "alert alert-success d-none mb-0";
        let formDisappear = ""

        if (this.state.conferences.length > 0) {
            console.log(this.state.conferences.length)
            spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
            dropdownClasses = 'form-select';


        }
        if (this.state.success) {
            console.log("TTTTTTTTTTTTTTTTTTTTT")
            allSignedUp = "alert alert-success mb-0";
            formDisappear = 'd-none';
        }

        return (
            <div className="my-5 container">
                <div className="my-5">
                    <div className="row">
                        <div className="col col-sm-auto">
                            <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
                        </div>
                        <div className="col">
                            <div className="card shadow">
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit} id="create-attendee-form" className={formDisappear}>
                                        <h1 className="card-title">It's Conference Time!</h1>
                                        <p className="mb-3">
                                            Please choose which conference
                                            you'd like to attend.
                                        </p>
                                        <div className={spinnerClasses} id="loading-conference-spinner">
                                            <div className="spinner-grow text-secondary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <select onChange={this.handleConferenceChange} value={this.state.conference} name="conference" id="conference" className={dropdownClasses} required>
                                                <option value="">Choose a conference</option>
                                                {this.state.conferences.map(conference => {
                                                    return (
                                                        <option key={conference.href} value={conference.href}>{conference.name}</option>)
                                                })}

                                            </select>
                                        </div>
                                        <p className="mb-3">
                                            Now, tell us about yourself.
                                        </p>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-floating mb-3">
                                                    <input onChange={this.handleFullNameChange} value={this.state.name} required placeholder="Your full name" type="text" id="name"
                                                        name="name" className="form-control" />
                                                    <label htmlFor="name">Your full name</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating mb-3">
                                                    <input onChange={this.handleEmailChange} value={this.state.email} required placeholder="Your email address" type="email" id="email"
                                                        name="email" className="form-control" />
                                                    <label htmlFor="email">Your email address</label>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-lg btn-primary">I'm going!</button>
                                    </form>
                                    <div className={allSignedUp} id="success-message">
                                        Congratulations! You're all signed up!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AttendConferenceForm;
