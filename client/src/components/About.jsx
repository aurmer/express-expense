import React from 'react';
import { Card } from 'react-bootstrap';

const About = () => {

	return (
		<>
        <br></br>
			<Card>
                    <Card.Header><h2>About Express Expense</h2></Card.Header>
				<Card.Body className="justify-content-center">
					<Card.Text >
                        <h5>
						Express Expense is a web app indeded to make documenting and compiling your expenses fast and easy.
                        </h5>
					</Card.Text>
                    <Card.Text><h6>Here are some basic steps to using this app:</h6></Card.Text>
                       <ul>
                        <li>Load the <Card.Link href="/new-expense">New Expense</Card.Link> Page and upload a photo of your receipt.</li>
                        <li>Input your Expense Description, Expense Amount, and Date.</li>
                        <li>Select or create a catagory to store your expense under. These catagories save to your profile and can be used again in the future depending on your needs.</li>
                        <li>Save the expense!</li>
                        <li>Now your expenses will be visible on your <Card.Link href="/dashboard">Dashboard</Card.Link> for you to keep track of.</li>
                        <li>On the dashboard you can edit, delete, and change the status of your previously uploaded items.</li>
                        <li>When you have a group of expenses you would like to send you will select each item you want grouped into one report and click the Generate Report button at the top of the <Card.Link href="/dashboard">Dashboard</Card.Link>page.</li>
                        <li>WHen you generate a report it will provide you with a link you can send to your intended recipient for them to print or view from their computer!</li>
                        <li>You can view and/or delete your previously compiled reports from your dashboard as well. When you delete the report, the link is no longer active.</li>
                        <li>We hope you enjoy using our web app!</li>
                       </ul>
                
				</Card.Body>
			</Card>
		</>
	);
};

export default About;
