import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchForm = styled.form`
    margin: 30px auto;
    max-width: 640px;
    width: 100%;

    :hover{
        &>div>* {
            border-color: rgb(0, 106, 255);
        }
    }

    &>div>input:focus {    
        &, &~*{
            border-color: rgb(0, 106, 255);
            border-bottom-width: 2px;
        }
    }
`;

const SearchBox = styled.div `
    display: flex;
`;

const SearchInput = styled.input`
    padding: 15px 0;
    padding-left: 10px;
    border-radius: 3px 0 0 3px;
    border: 1px solid #fff;
    border-right: none;
    width: 100%;
    outline: none;
`;

const SearchIcon = styled.div`
    padding: 16px;
    border-radius: 0 3px 3px 0;
    background-color: #fff;
    border: 1px solid #fff;
    border-left: none;
`;

const Search = ({search, searchQuery}) => {
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if(searchQuery) {
            setSearchText(searchQuery)
        }
    }, [searchQuery])

    const onSubmit = e => {
        e.preventDefault();
        if(searchText !== '') {
            search(searchText)
        }
    }

    return (
        <SearchForm onSubmit={e => onSubmit(e)}>
            <SearchBox>
                <SearchInput type="text" name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                <SearchIcon className="icon-box" onClick={onSubmit}><FontAwesomeIcon icon='search'/></SearchIcon>
            </SearchBox>
        </SearchForm>
    )
}

export default Search
