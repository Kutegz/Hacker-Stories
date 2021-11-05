import React from "react";

const title = 'React';
const welcome = { greeting: 'Hey', title: 'React' };
const getWorld = world => world; 

const App = () => {

	const initialStories = [
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
			url: 'https://code.visualstudio.com/docs/languages/csharp',
			author: 'Pat McGee',
			num_comments: 1,
			points: 3,
			objectID: 2
		},
		{
			title: 'JavaScript', 
			url: 'https://js.org/',
			author: 'David Flanagan',
			num_comments: 10,
			points: 8,
			objectID: 3
		}
	];

	const getAsyncStories = () => new Promise((resolve) => 
		setTimeout( () => resolve({ data: { stories: initialStories }}), 1000
	));

	const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'C#');
	
	const handleSearch = event => setSearchTerm(event.target.value);
	const [stories, setStories] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	
	React.useEffect(() => { 
		setIsLoading(true);
		getAsyncStories().then(result => { 
			setStories(result.data.stories); 
			setIsLoading(false);
		}).catch(() => setIsError(true)); 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	// React.useEffect(() => { getAsyncStories().then(result => { setStories(result.data.stories); }); });

	const searchedStories = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()));
	const handleRemoveStories = (item) => { 
		const newStories = stories.filter((story) => item.objectID !== story.objectID); 
		setStories(newStories);
	};

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
			{ isError && <p>Something went wrong ...</p> }
			{ isLoading ? (<p>Loading ... </p>) : (<List list={ searchedStories } onRemoveItem={ handleRemoveStories } />) }
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
		if (isFocused && inputRef.current) { 
			inputRef.current.focus(); } }, [isFocused]); // D
		return(
			<>
				<label htmlFor={ id } >{ children }</label>
				&nbsp;
				{ /* B */ }
				<input ref={ inputRef } id={ id } type={ type } value={ value } onChange={ onInputChange } />
			</>
		);
	};

const List = ({ list, onRemoveItem }) => (
	<ul> 
		{ list.map((item) => (<Item key={ item.objectID } item={ item } onRemoveItem={ onRemoveItem } /> )) }
	</ul>);

const Item = ({item, onRemoveItem}) => ( 
	<li>
		<span>
			<a href={ item.url } > { item.title } </a>
		</span>
		<span>{ item.author } </span>
		<span>{ item.num_comments } </span>
		<span>{ item.points } </span>
		<span> 
			<button type="button" onClick={ () => onRemoveItem(item) } >  Dismiss </button>
		</span>
	</li>
);

export default App;
