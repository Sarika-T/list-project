import React from 'react';
import './Content.scss';
import CheckBoxLabel from '../Common/CheckBox';
import { LeftArrow, RightArrow } from '../../assets/icon';


const Content = (props) => {
    const { list, listNumber, newList, moveToNewList, setFromList, toList, setToList, direction, checked, setChecked } = props;

    const handleCheck = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <>
            {list && (
                <div className="content">
                    <div className="content-page">
                        <div className={`content-page-head${newList ? '-new': ''}`}>
                            {!newList && <CheckBoxLabel checked={checked} onChange={handleCheck}/>}
                            <span className={`content-page-head-text${newList ? '-new': ''}`}>List {listNumber} {newList ? `(${list.length})` : ''}</span>
                        </div>
                        <div className='content-page-body'>
                            {list.map((item) => (
                                <div className={`content-page-body-box${newList ? '-new' : ''}`} key={item.id}>
                                    <span className='content-page-body-box-title'>{item.name}</span>
                                    <span className='content-page-body-box-text'>{item.description}</span>
                                    {newList && (
                                        <div className='content-page-body-box-icon' onClick={() => moveToNewList(item, list, setFromList, toList, setToList)}>
                                            {direction === "right" ? <RightArrow /> : <LeftArrow />}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Content;