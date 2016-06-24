import React from 'react';
import { Link } from 'react-router';
import { StickyContainer /* Sticky */ } from 'react-sticky';
import FlatButton from 'material-ui/FlatButton';
// import { Parallax, Background } from 'react-parallax';

const styles = {
	tile1: {
		backgroundColor: 'white',
		zIndex: 1000,
	},
	textWhite: {
		fontSize: 65,
		color: '#1A3C1C',
	},
	barTop: {
		background: 'transparent',
	},
	navbar: {
		background: '#293C2A',
	},
	barProfile: {
		background: '#7CAA7F',
		color: '#293C2A',
	},
	barTech: {
		background: '#7CAA7F',
	},
	profileTile: {
		flex: 2,
	},
	button: {
		color: '#556270',
		fontSize: '2em',
		marginLeft: 'auto',
		marginRight: 'auto',
		height: 100,
		width: 400,
	},
	landingBackdrop: {
		'background-image': '../../assets/background.jpeg',
	},
};

const Landing = () => (
	<div>
		<Link to="/signup" style={styles.tile1}>
			<FlatButton
				className="dev-button"
				style={styles.button}
				onTouchTap={() => { console.log('signup button pressed'); }}
			>
			Signup
			</FlatButton>
		</Link>
		<Link to="/signin" style={styles.tile1}>
			<FlatButton
				className="dev-button"
				style={styles.button}
			>
			Signin
			</FlatButton>
		</Link>
		<div className="background-image"></div>
		<div className="landing-backdrop">
			<div className="hero-unit bar" id="bar-top" style={styles.barTop}>
				<div className="bar-top-text">
				</div>
			</div>

			<StickyContainer topOffset={0}>
				<div className="sticky-nav navbar navbar-default navbar-fixed-top affix-top" style={styles.navbar}>
					<h1 className="bar-top-title">Icebox</h1>

				</div>
			</StickyContainer>

			<div className="hero-unit bar" id="bar-second">
				<h1 className="bar-second-title"></h1>
			</div>

			<StickyContainer>
				<div className="hero-unit bar" id="bar-third" style={styles.barProfile}>
					<h1 className="bar-third-title" style={styles.textWhite}>Team ColdForge</h1>
					<div className="profile-container">
						<div className="profile" id="colin">
							<h3 className="profile-name">Colin Zarnegar</h3>
							<img
								className="profile-img"
								src={'../../assets/landing/profiles/colin.png'}
								role="presentation"
								height={100}
							/>
							<div className="profile-text">Product Manager</div>
						</div>
						<div className="profile" id="austin">
							<h3 className="profile-name">Austin Sefton</h3>
							<img
								className="profile-img"
								src={'../../assets/landing/profiles/austin.jpeg'}
								role="presentation"
								height={100}
							/>
							<div className="profile-text">Front End</div>
						</div>
						<div className="profile" id="nate">
							<h3 className="profile-name">Nathaniel Schwab</h3>
							<img
								className="profile-img"
								src={'../../assets/landing/profiles/nate.jpeg'}
								role="presentation"
								height={100}
							/>
							<div className="profile-text">Scrum Master</div>
						</div>
						<div className="profile" id="and">
							<h3 className="profile-name">Andrew J Yao</h3>
							<img
								className="profile-img"
								src={'../../assets/landing/profiles/andy.jpeg'}
								role="presentation"
								height={100}
							/>
							<div className="profile-text">Full Stack</div>
						</div>
					</div>
				</div>
			</StickyContainer>

			<div className="hero-unit bar" id="bar-fourth" style={styles.barTech}>
				<h1 className="bar-third-title">Technologies</h1>
				<div className="container tech-container">
					<img className="tech" id="react" src={"../../assets/landing/technologies/react.png"} role="presentation" />
					<img className="tech" id="redux" src={"../../assets/landing/technologies/redux.png"} role="presentation" />
					<img className="tech" id="node" src={"../../assets/landing/technologies/node.png"} role="presentation" />
					<img className="tech" id="mysql" src={"../../assets/landing/technologies/mysql.png"} role="presentation" />
					<img className="tech" id="html5" src={"../../assets/landing/technologies/html5.png"} role="presentation" />
					<img className="tech" id="css3" src={"../../assets/landing/technologies/css3.png"} role="presentation" />
				</div>
			</div>

			<div className="hero-unit bar" id="bar-last">
			</div>

		</div>
	</div>
);

export default Landing;
