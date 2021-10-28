import React from "react";

const title = 'React';
const welcome = { greeting: 'Hey', title: 'React' };
const getWorld = world => world; 

const App = () => {

	const stories = [
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

	const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search') || 'C#');
	React.useEffect(() => { localStorage.setItem('search', searchTerm); }, [searchTerm]);
	
	const handleSearch = event => setSearchTerm(event.target.value);
	const searchedStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

	return(
		<div>
			<h1>Hello {title}!</h1>
			<h1>{ welcome.greeting } { welcome.title }</h1>
			<h1>{ title } { getWorld('Hacker Stories') }!</h1>
			<hr />
			<Search search={ searchTerm } onSearch={ handleSearch } />
			<hr />
			<List list={ searchedStories } />
		</div>
	);
}

const Search = ({search, onSearch}) => (
	<>
		<label htmlFor="search" >Search: </label>
		<input id="search" type="text" value={ search } onChange={ onSearch } />
	</>
);

const List = ({list}) => (<ul> { list.map(({objectID, ...item}) => <Item key={ objectID } { ...item } /> ) } </ul>);

const Item = ({title, url, author, num_comments, points}) => ( 
	<li>
		<span>
			<a href={ url } > { title } </a>
		</span>
		<span>{ author } </span>
		<span>{ num_comments } </span>
		<span>{ points } </span>
	</li>
);

export default App;