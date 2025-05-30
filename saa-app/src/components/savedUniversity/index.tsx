import React, {useState} from 'react';
import './savedUniversity.css';
import Popup from 'reactjs-popup';
import Capetown from "../../home/discover/universitypage/cieecapetown";
import PlanPopup from "../planPopup/planPopup";

interface UniversityInfo {
    universityName: string;
    coursesSaved: number;
    loc: string;
}

function SavedUniversity({ loc, universityName, coursesSaved }: UniversityInfo) {
    const urlPath = universityName.replace(/ /g, "") + ".png"
    return (
        <Popup trigger =
                   {
                       <div className={"saved-university-card"}>
                       <img className={"circle-crop"} src={urlPath} alt="University Photo" />
                       <h3 className={"university-header"}>{universityName}</h3>
                       <div className="location-container">
                       <img src="Leading icon.png" />
                       <span>{loc}</span>
                       </div>
                       <p className={"courses-saved-text"}>{coursesSaved} Courses Saved</p>

                    </div>
                   }>
            <PlanPopup universityName={"University of Sydney"} credits={20} />
            <button>Click here</button>
        </Popup>


    );
}
//<img src={"/UTS.jpg"} alt="University Photo" />;
export default SavedUniversity;