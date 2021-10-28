import React from "react";

const title = 'React';
const welcome = { greeting: 'Hey', title: 'React' };
const getWorld = world => world; 
const list = [
	{ 
		title: 'React', 
		url: 'https://reactjs.org',
		author: 'Jordan Walke',
		num_comments: 3,
		points: 4,
		objectID: 0
	},
	{
		title: 'Redux', 
		url: 'https://redux.js.org',
		author: 'Dan Abramov, Andrew Clark',
		num_comments: 2,
		points: 5,
		objectID: 1
	},
	{
		title: 'C#', 
		url: 'https://csharp.org',
		author: 'Pat McGee',
		num_comments: 1,
		points: 3,
		objectID: 2
	}
];

function App() {
	return(
		<div>
			<h1>Hello {title}!</h1>
			<h1>{ welcome.greeting } { welcome.title }</h1>
			<h1>{ title } { getWorld('World') }!</h1>
			<Search />
			<List />
		</div>
	);
}

const Search = () => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const handleChange = event => { 
		setSearchTerm(event.target.value); 
	}
	return(
		<div>
		<label htmlFor="search" >Search: </label>
		<input id="search" type="text" onChange={ handleChange } />
		<p> Searching for: <strong>{ searchTerm }</strong> </p>
		</div>
	);
};

const List = () => (<ul> { list.map(item => <Item key={ item.objectID } item={ item } /> )} </ul>);

const Item = (props) => (
	<li>
		<span>
			<a href={ props.item.url } > { props.item.title } </a>
		</span>
		<span>{ props.item.author } </span>
		<span>{ props.item.num_comments } </span>
		<span>{ props.item.points } </span>
	</li>
);

export default App;