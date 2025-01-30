import Buttons from "../Common/Buttons";
import Content from "../Content/Content";
import './MainPage.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Error from "../Content/Error";
import CircularSize from "../Common/Loader";
import NewList from "../Content/NewList";




export default function MainPage() {

    const [loading, setLoading] = useState(false);
    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);
    const [list3, setList3] = useState([]);
    const [tempList1, setTempList1] = useState([]);
    const [tempList2, setTempList2] = useState([]);
    const [tempList3, setTempList3] = useState([]);
    const [error, setError] = useState(null);
    const [retrying, setRetrying] = useState(false);
    const [newList, setNewList] = useState(false);
    const [checkedList1, setCheckedList1] = useState(false);
    const [checkedList2, setCheckedList2] = useState(false);
    const [checkError, setCheckError] = useState('');

    const fetchData = async () => {
        setLoading(true);  
        setError(null); 
    
        try {
          const response = await axios.get('https://apis.ccbp.in/list-creation/lists');
          const data = response.data.lists;
          const list1Data = data.filter(item => item.list_number === 1);
          const list2Data = data.filter(item => item.list_number === 2);
          setList1(list1Data);
          setList2(list2Data);
        } catch (err) {
          setError('Something went wrong, please try again later.');
        } finally {
          setLoading(false);
          setRetrying(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (retrying) {
          fetchData(); 
        }
    }, [retrying]);

    const handleClick = () => {
        if (checkedList1 && checkedList2) {
            setTempList1(list1);
            setTempList2(list2);
            setTempList3(list3);
            setNewList(true);
            setCheckError('');
        } else {
            setCheckError('You should select exactly 2 lists to create a new list');
        }
    };

    const moveToNewList = (item, fromList, setFromList, toList, setToList) => {
        setFromList(prevList => prevList.filter(i => i.id !== item.id));
        setToList(prevList => [...prevList, item]);
    };

    const handleCancel = () => {
        setList1(tempList1);
        setList2(tempList2);
        setList3(tempList3);
        setNewList(false);
        setCheckedList1(false);
        setCheckedList2(false);
    };

    const handleUpdate = () => {
        setNewList(false);
    };

    return(
        <>
            {loading && <p className="loader"><CircularSize /></p>}
            {error && (
                <Error setRetrying={setRetrying} />
            )}
            {!newList && list1 && !loading && !error && (
                <div className="mainpage">
                    <div className="mainpage-page">
                        <div className="mainpage-page-header">
                            <h1 className="mainpage-page-header-text">List Creation</h1>
                            <div className="mainpage-page-header-button">
                                <Buttons 
                                  name="Create a new list"
                                  variant = "contained"
                                  onClick = {handleClick}
                                  className= "mainpage-button"
                                />
                            </div>
                        </div>
                        {checkError && <p className="error-message">{checkError}</p>}
                        <div className="mainpage-page-content">
                            <div className={`mainpage-page-content-list${newList ? '-new': ''}`}>
                                <Content 
                                    list={list1} 
                                    listNumber={1} 
                                    newList={newList} 
                                    moveToNewList={moveToNewList} 
                                    setFromList={setList1} 
                                    toList={list3} 
                                    setToList={setList3} 
                                    direction="right"
                                    checked={checkedList1} 
                                    setChecked={setCheckedList1}  />
                            </div>
                            <div className="mainpage-page-content-list">
                                <Content 
                                    list={list2} 
                                    listNumber={2} 
                                    newList={newList} 
                                    moveToNewList={moveToNewList} 
                                    setFromList={setList2} 
                                    toList={list3} 
                                    setToList={setList3} 
                                    direction="left" 
                                    checked={checkedList2} 
                                    setChecked={setCheckedList2} />
                            </div>
                            {list3.length >0 && <div className="mainpage-page-content-list">
                                <Content list={list3} listNumber={3} />
                            </div>}
                        </div>
                    </div>
                </div>
            )}
            {newList && <NewList 
                            list1={list1} 
                            list2={list2} 
                            list3={list3} 
                            newList={newList} 
                            moveToNewList={moveToNewList} 
                            setList1={setList1} 
                            setList2={setList2} 
                            setList3={setList3} 
                            handleCancel={handleCancel} 
                            handleUpdate={handleUpdate} />}
        </>
    )
}