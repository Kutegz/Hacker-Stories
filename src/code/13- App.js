import * as React from 'react';
import axios from 'axios';

const title = 'React';
const welcome = { greeting: 'Hey', title: 'React' };
const getWorld = world => world; 
const STORIES_FETCH_INIT = 'STORIES_FETCH_INIT';
const STORIES_FETCH_SUCCESS = 'STORIES_FETCH_SUCCESS';
const STORIES_FETCH_FAILURE = 'STORIES_FETCH_FAILURE';
const REMOVE_STORY = 'REMOVE_STORY';

const storiesReducer = (state, action) => {

    switch (action.type) {

        case STORIES_FETCH_INIT: 
            return { ...state, isLoading: true, isError: false };

		case STORIES_FETCH_SUCCESS: 
			return { ...state, isLoading: false, isError: false, data: action.payload };

		case STORIES_FETCH_FAILURE: 
			return { ...state, isLoading: false, isError: true };

        case REMOVE_STORY: 
            return { ...state, data: state.data.filter(story => action.payload.objectID !== story.objectID) }

        default: throw new Error(); 
    }
};

const API_ENSPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {

	const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'react');
	const [url, setUrl] = React.useState(`${ API_ENSPOINT }${ searchTerm }`);
	const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false});
		
	const handleSearchInput = event => setSearchTerm(event.target.value);
	const handleSearchSubmit = () => setUrl(`${ API_ENSPOINT }${ searchTerm }`);

	const handleFetchStories = React.useCallback(() => {		// B	

		dispatchStories({ type: STORIES_FETCH_INIT });

		axios
		.get(url)
		.then(result => { 
			dispatchStories({
				type: STORIES_FETCH_SUCCESS,
				payload: result.data.hits
			});
		}).catch(() => dispatchStories({ type: STORIES_FETCH_FAILURE })); 
	}, [url]);
	
	React.useEffect(() => { handleFetchStories(); }, [handleFetchStories]);	// C, D

	const handleRemoveStories = item => { 
		dispatchStories({
			type: REMOVE_STORY,
			payload: item
		});
	};

	return(
		<div>
			<h1>Hello {title}!</h1>
			<h1>{ welcome.greeting } { welcome.title }</h1>
			<h1>{ title } { getWorld('Hacker Stories') }!</h1>
			<hr />
			<InputWithLabel id = "search" value={ searchTerm } isFocused onInputChange={ handleSearchInput }>
				<strong>Searh:</strong>
			</InputWithLabel>
			<button type="button" disabled={!searchTerm} onClick={ handleSearchSubmit }>Submit</button>
			<hr />
			{ stories.isError && <p>Something went wrong ...</p> }
			{ stories.isLoading ? (<p>Loading ... </p>) : (<List list={ stories.data } onRemoveItem={ handleRemoveStories } />) }
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