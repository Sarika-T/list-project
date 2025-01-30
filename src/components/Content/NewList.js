import { LeftArrow, RightArrow } from "../../assets/icon";
import Buttons from "../Common/Buttons";
import Content from "./Content";




export default function NewList(props) {

    const { list1, list2, list3, newList, moveToNewList, setList1, setList2, setList3, handleCancel, handleUpdate} = props;

    return(
        <div className="newlist">
            <div className={`mainpage-page-content${newList ? '-new': ''}`}>
                <div className={`mainpage-page-content-list${newList ? '-new': ''}`}>
                <Content list={list1} listNumber={1} newList={newList} moveToNewList={moveToNewList} setFromList={setList1} toList={list3} setToList={setList3} direction="right" />
                </div>
                <div className="mainpage-page-content-list">
                    <div className="content">
                        <div className="content-page">
                            <div className={`content-page-head${newList ? '-new': ''}`}>
                                <span className='content-page-head-text-new'>{`List 3 (${list3.length})`}</span>
                            </div>
                            <div className='content-page-body'>
                                {list3.map((item) => (
                                    <div className="content-page-body-box-new" key={item.id}>
                                        <span className='content-page-body-box-title'>{item.name}</span>
                                        <span className='content-page-body-box-text'>{item.description}</span>
                                        {item.list_number === 1 && (
                                            <div className='content-page-body-box-icon' onClick={() => moveToNewList(item, list3, setList3, list2, setList2)}>
                                                <RightArrow />
                                            </div>
                                        )}
                                        {item.list_number === 2 && (
                                            <div className='content-page-body-box-icon' onClick={() => moveToNewList(item, list3, setList3, list1, setList1)}>
                                                <LeftArrow />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`mainpage-page-content-list${newList ? '-new': ''}`}>
                <Content list={list2} listNumber={2} newList={newList} moveToNewList={moveToNewList} setFromList={setList2} toList={list3} setToList={setList3} direction="left" />
                </div>
            </div>
            <div className="newlist-page-bottom">
                <Buttons
                name="Cancel"
                variant="contained"
                onClick= {handleCancel}
                className= "newlist-button"
                />
                <Buttons
                name="Update"
                variant="contained"
                onClick= {handleUpdate}
                className="newlist-update"
                />
            </div>
        </div>
    )
}