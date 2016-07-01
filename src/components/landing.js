import React from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Talker from 'material-ui/svg-icons/action/record-voice-over';
import Calendar from 'material-ui/svg-icons/editor/insert-invitation';
import Silverware from 'material-ui/svg-icons/maps/restaurant';
import { green50, deepOrange800 } from 'material-ui/styles/colors';
import {
	Footer,
	Hero,
	HorizontalSplit,
	ImageList,
	Page,
	Section,
} from 'neal-react';

const styles = {
	landingImage: {
		height: 1000,
		backgroundImage: "url('../../assets/veggieDrop.jpg')"
	},
	navButtons: {
		color: green50,
		height: 50,
		width: 75,
		fontSize: 20,
		backgroundColor: deepOrange800,
		margin: 10,
	},
	talker: {
		width: 75,
		height: 75,
	},
	lead: {
		marginLeft: 35,
	},
	bannerBox: {
		margin: 'auto',
	},
};

const brandName = 'ColdForge';

const Landing = () => (
	<Page>
		<div className="banner-box" style={styles.bannerBox}>
			<div className="large-text-title">
				<div className="banner-title"> Icebox </div>
				<div className="banner-text">
					<p className="lead">"The complete refrigerator companion"</p>
				</div>
				<Link to="signin" className="nav-link">
					<FlatButton
						style={styles.navButtons}
					>
						Sign In
					</FlatButton>
				</Link>
				<Link to="signup" className="nav-link">
					<FlatButton
						style={styles.navButtons}
					>
						Sign Up
					</FlatButton>
				</Link>
			</div>
		</div>
		<div
			className="banner-display"
			style={styles.landingImage}
		/>

		<div className="spacer"></div>

		<Section>
			<HorizontalSplit padding="md">
				<div className="bar1-text" style={styles.lead}>
					<Talker style={styles.talker} />
					<p className="lead">Input Items by Voice</p>
					<p>
						Add items to your icebox as you unload your groceries with
						the sound of your voice. Icebox goes hands-free in the kitchen
						so that you can spend more time gettings things done and less
						time playing with an app.
					</p>
				</div>
				<div className="bar1-text" style={styles.lead}>
					<Calendar style={styles.talker} />
					<p className="lead">Track Food Expiration Dates</p>
					<p>
						Keep track of how long your food will last so that you can better
						plan your grocery shopping and what meals you cook. With Icebox
						mobile, take what is in your refriegerator with you and never buy
						something you already have.
					</p>
				</div>
				<div className="bar1-text" style={styles.lead}>
					<Silverware style={styles.talker} />
					<p className="lead">Sends you Smart Recipies</p>
					<p>
						Icebox will suggest recipes to you based on the food that is
						expiring in your fridge. Choose your recipe and forget about
						having to decide what is for dinner or finding creative ways
						to use up the food you have.
					</p>
				</div>
			</HorizontalSplit>
		</Section>

		<div className="spacer"></div>

		<div className="bar2">
			<div className="large-text-1">
				<p>"...nearly 40% of the food produced in the United States
				winds up in a landfill..."
				</p>
				<p>–fastcoexist.com</p>
			</div>
		</div>

		<div className="spacer"></div>

		<Section>
			<div className="team-wrapper">
				<div className="container">
					<h1 className="team-header">The Engineering Team</h1>
					<div className="row">
						<div className="col-md-3">
							<div className="profile">
								<img className="profile-photo" src="../../assets/landing/profiles/colin.png" alt="Colin Zarnegar" />
								<h2>Colin Zarnegar</h2>
								<h4>Product Owner</h4>
							</div>
						</div>
						<div className="col-md-3">
							<div className="profile">
								<img className="profile-photo" src="../../assets/landing/profiles/austin.jpeg" alt="Austin Sefton" />
								<h2>Austin Sefton</h2>
								<h4>Front End</h4>
							</div>
						</div>
						<div className="col-md-3">
							<div className="profile">
								<img className="profile-photo" src="../../assets/landing/profiles/nate.jpeg" alt="Nathaniel Schwab" />
								<h2>Nathaniel Schwab</h2>
								<h4>Scrum Master</h4>
							</div>
						</div>
						<div className="col-md-3">
							<div className="profile">
								<img className="profile-photo" src="../../assets/landing/profiles/andy.jpeg" alt="Andrew Yao" />
								<h2>Andrew Yao</h2>
								<h4>Full Stack</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>

		<div className="spacer"></div>

		<Section className="subhero">
			<ImageList centered>
				<img className="tech" id="react" src={"../../assets/landing/technologies/react.png"} role="presentation" />
				<img className="tech" id="redux" src={"../../assets/landing/technologies/redux.png"} role="presentation" />
				<img className="tech" id="node" src={"../../assets/landing/technologies/node.png"} role="presentation" />
				<img className="tech" id="mysql" src={"../../assets/landing/technologies/mysql.png"} role="presentation" />
				<img className="tech" id="html5" src={"../../assets/landing/technologies/html5.png"} role="presentation" />
				<img className="tech" id="css3" src={"../../assets/landing/technologies/css3.png"} role="presentation" />
			</ImageList>
		</Section>

		<div className="credit">
			<a href="http://www.freepik.com/free-photos-vectors/food">
				First food photograph designed by Onlyyouqj - Freepik.com
			</a>
		</div>
		<div className="credit">
			<a href="http://www.freepik.com/free-photos-vectors/food">
				Second food photograph designed by Kstudio - Freepik.com
			</a>
		</div>

		<Footer
			brandName={brandName}
			githubUrl="https://github.com/ColdForge/icebox"
		/>

	</Page>
);

export default Landing;
