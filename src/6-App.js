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

	const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'C#');
	
	const handleSearch = event => setSearchTerm(event.target.value);
	const searchedStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

	return(
		<div>
			<h1>Hello {title}!</h1>
			<h1>{ welcome.greeting } { welcome.title }</h1>
			<h1>{ title } { getWorld('Hacker Stories') }!</h1>
			<hr />
			<InputWithLabel id = "search" value={ searchTerm } isFocused onInputChange={ handleSearch }>
				<strong>Searh:</strong>
			</InputWithLabel>
			<hr />
			<List list={ searchedStories } />
		</div>
	);
}

const useSemiPersistentState = (key, initialState) => {
	const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
	React.useEffect(() => { localStorage.setItem(key, value); }, [value, key]);
	return [value, setValue];
};

const InputWithLabel = ({ id, value, type = 'text', onInputChange, isFocused, children }) => {
	// A
	const inputRef = React.useRef();
	// C
	React.useEffect(() => {
		if (isFocused && inputRef.current) { inputRef.current.focus(); } }, [isFocused]); // D
	return(
		<>
			<label htmlFor={ id } >{ children }</label>
			&nbsp;
			{ /* B */ }
			<input ref={ inputRef } id={ id } type={ type } value={ value } onChange={ onInputChange } />
		</>
	);
};

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