import React from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Talker from 'material-ui/svg-icons/action/record-voice-over';
import Calendar from 'material-ui/svg-icons/editor/insert-invitation';
import Silverware from 'material-ui/svg-icons/maps/restaurant';
import { green50, deepOrange800 } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import {
	Footer,
	HorizontalSplit,
	ImageList,
	Page,
	Section,
} from 'neal-react';

const styles = {
	landingImage: {
		height: 1000,
		backgroundImage: "url('../../assets/landing-image1.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
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
	whiteText: {
		color: 'white',
	},
};

const brandName = 'ColdForge';


const githubPath = 'M8,0 C3.58,0 0,3.58 0,8 C0,11.54 2.29,14.53 5.47,15.59'
	+ ' C5.87,15.66 6.02,15.42 6.02,15.21 C6.02,15.02 6.01,14.39 6.01,13.72'
	+ ' C4,14.09 3.48,13.23 3.32,12.78 C3.23,12.55 2.84,11.84 2.5,11.65 C2.22,11.5'
	+ ' 1.82,11.13 2.49,11.12 C3.12,11.11 3.57,11.7 3.72,11.94 C4.44,13.15 5.59,12.81'
	+ ' 6.05,12.6 C6.12,12.08 6.33,11.73 6.56,11.53 C4.78,11.33 2.92,10.64 2.92,7.58'
	+ ' C2.92,6.71 3.23,5.99 3.74,5.43 C3.66,5.23 3.38,4.41 3.82,3.31 C3.82,3.31 4.49,3.1'
	+ ' 6.02,4.13 C6.66,3.95 7.34,3.86 8.02,3.86 C8.7,3.86 9.38,3.95 10.02,4.13 C11.55,3.09'
	+ ' 12.22,3.31 12.22,3.31 C12.66,4.41 12.38,5.23 12.3,5.43 C12.81,5.99 13.12,6.7 13.12,7.58'
	+ ' C13.12,10.65 11.25,11.33 9.47,11.53 C9.76,11.78 10.01,12.26 10.01,13.01'
	+ ' C10.01,14.08 10,14.94 10,15.21 C10,15.42 10.15,15.67 10.55,15.59 C13.71,14.53'
	+ ' 16,11.53 16,8 C16,3.58 12.42,0 8,0 L8,0 Z';

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
								<h4>Full Stack Engineer</h4>
								<IconButton
									linkButton
									href="https://github.com/czarnega"
									target="_blank"
									iconStyle={{ width: 48, height: 48 }}
								>
									<SvgIcon color="black">
										<path d={githubPath} />
									</SvgIcon>
								</IconButton>
							</div>
						</div>
						<div className="col-md-3">
							<div className="profile">
								<img className="profile-photo" src="../../assets/landing/profiles/austin.jpeg" alt="Austin Sefton" />
								<h2>Austin Sefton</h2>
								<h4>Front End Engineer</h4>
								<h4 style={styles.whiteText}>white text</h4>
								<IconButton
									linkButton
									href="https://github.com/sefton419"
									target="_blank"
									iconStyle={{ width: 48, height: 48 }}
								>
									<SvgIcon color="black">
										<path d={githubPath} />
									</SvgIcon>
								</IconButton>
							</div>
						</div>
						<div className="col-md-3">
							<div className="profile">
								<img className="profile-photo" src="../../assets/landing/profiles/nate.jpeg" alt="Nathaniel Schwab" />
								<h2>Nathaniel Schwab</h2>
								<h4>Scrum Master</h4>
								<h4>Full Stack Engineer</h4>
								<IconButton
									linkButton
									href="https://github.com/natesMI"
									target="_blank"
									iconStyle={{ width: 48, height: 48 }}
								>
									<SvgIcon color="black">
										<path d={githubPath} />
									</SvgIcon>
								</IconButton>
							</div>
						</div>
						<div className="col-md-3">
							<div className="profile">
								<img className="profile-photo" src="../../assets/landing/profiles/andy.jpeg" alt="Andrew Yao" />
								<h2>Andrew Yao</h2>
								<h4>Full Stack Engineer</h4>
								<h4 style={styles.whiteText}>white text</h4>
								<IconButton
									linkButton
									href="https://github.com/yaoandrew"
									target="_blank"
									iconStyle={{ width: 48, height: 48 }}
								>
									<SvgIcon color="black">
										<path d={githubPath} />
									</SvgIcon>
								</IconButton>
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
				All photographs designed by Onlyyouqj - Freepik.com
			</a>
		</div>

		<Footer
			brandName={brandName}
			githubUrl="https://github.com/ColdForge/icebox"
		/>

	</Page>
);

export default Landing;
