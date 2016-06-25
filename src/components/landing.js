import React from 'react';
import { Link } from 'react-router';
// import FlatButton from 'material-ui/FlatButton';
import {
  // Code,
  CustomerQuote, CustomerQuotes,
  // DropdownMenu, DropdownToggle,
  Footer,
  // FooterAddress,
  Hero,
  HorizontalSplit,
  ImageList,
  // ImageListItem,
  Navbar,
  // NavItem,
  Page,
  // PricingPlan,
  // PricingTable,
  Section,
  // SignupInline, SignupModal,
  // Stripe,
  Team,
  TeamMember,
} from 'neal-react';

const brandName = 'ColdForge';

const businessAddress = (
	<address>
		<strong>{brandName}</strong><br />
		1337 Market Street, Suite 1337<br />
		San Francisco, CA 94103<br />
		+1 (123) 456-7890
	</address>
);

const Landing = () => (
	<Page>
		<Navbar>
			<Link to="/" className="nav-brand">Home</Link>
			<Link to="signup" className="nav-link">Sign Up</Link>
			<Link to="signin" className="nav-link">Sign In</Link>
		</Navbar>

		<Hero
			backgroundImage="../../assets/background.jpeg"
			className="text-xs-center banner-display"
		>
			<div className="banner-text">
				<div className="display-4 banner-title"> Icebox </div>
				<p className="lead"> The complete refrigerator companion that helps you minimize waste
				by putting you in control </p>
			</div>
		</Hero>

		<div className="spacer"></div>

		<Section>
			<HorizontalSplit padding="md">
				<div className="bar1-text">
					<p className="lead">Input Items by Voice</p>
					<p> Neal is based on <a href="http://v4-alpha.getbootstrap.com/" target="_blank">
					Bootstrap 4</a> and ships with navbar, hero, footer, sections, horizontal split,
					pricing tables, customer quotes and other components you need for a landing page.
					No more repetitive coding! Oh, and it's easy to extend.
					</p>
				</div>
				<div className="bar1-text">
					<p className="lead">Keeps Track of Expiration Dates</p>
					<p>External integrations like &nbsp;
						<a href="http://www.google.com/analytics/">Google Analytics</a>,&nbsp;
						<a href="https://segment.com/">Segment</a>,&nbsp;
						<a href="https://stripe.com/">Stripe</a> and&nbsp;
						<a href="http://typeform.com">Typeform</a> are included.
						No more copying & pasting integration code, all you need is your API keys.
						We automatically track events when visitors navigate to different parts of your page.
					</p>
				</div>
				<div className="bar1-text">
					<p className="lead">Sends you Smart Recipies</p>
					<p>Because you are relying on react.js and third-party integration you don't
					need a server to host your landing page. Simply upload it to an Amazon S3 bucket,
					enable website hosting, and it's ready to go!</p>
				</div>
			</HorizontalSplit>
		</Section>
		<div className="spacer"></div>
		<hero className="hero2">
			<div className="bar2">
				<div className="large-text-wrapper">
					<div className="large-text-1">Because you are relying on react.js and third-party integration</div>
					<div className="large-text-2"></div>
					<div className="large-text-3">The most important task at first is to build something people want</div>
				</div>
			</div>
		</hero>
		<div className="spacer"></div>

		<Section>
			<CustomerQuotes>
				<CustomerQuote name="Paul Graham" title="YC">
					<p>What I tell founders is not to sweat the business model too much at first.
					The most important task at first is to build something people want.
					If you don't do that, it won't matter how clever your business model is.
					</p>
				</CustomerQuote>
				<CustomerQuote name="Elon Musk">
					<p>I came to the conclusion that we should aspire to increase the scope and
					scale of human consciousness in order to better understand what questions to ask.
					Really, the only thing that makes sense is to strive for greater collective enlightenment.
					</p>
				</CustomerQuote>
				<CustomerQuote name="Reid Hoffman" title="Linkedin">
					<p>
					If you are not embarrassed by the first version of your product, you've launched too late.
					</p>
				</CustomerQuote>
			</CustomerQuotes>
		</Section>

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

		<Section>
			<Team>
				<TeamMember
					className="profile"
					name="Colin Zarnegar"
					title="Product Manager"
					imageUrl="../../assets/landing/profiles/colin.png"
    />
				<TeamMember
					className="profile"
					name="Austin Sefton"
					title="Front End"
					imageUrl="../../assets/landing/profiles/austin.jpeg"
    />
				<TeamMember
					className="profile"
					name="Nathaniel Schwab"
					title="Scrum Master"
					imageUrl="../../assets/landing/profiles/nate.jpeg"
    />
				<TeamMember
					className="profile"
					name="Andrew J Yao"
					title="Full Stack"
					imageUrl="../../assets/landing/profiles/andy.jpeg"
    />
			</Team>
		</Section>

		<Footer
			brandName={brandName}
			facebookUrl="http://www.facebook.com"
			twitterUrl="http://www.twitter.com/dennybritz"
			githubUrl="https://github.com/dennybritz/neal-react"
			address={businessAddress}
		/>
	</Page>
);

export default Landing;
