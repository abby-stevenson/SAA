import React, {useState} from 'react';
import './savedUniversity.css';

interface UniversityInfo {
    universityName: string;
    coursesSaved: number;
}

function SavedUniversity({ universityName, coursesSaved }: UniversityInfo) {
    const urlPath = universityName.replace(/ /g, "") + ".png"
    return (
        <div className={"saved-university-card"}>
            <img className={"circle-crop"} src={urlPath} alt="University Photo" />
            <h3 className={"university-header"}>{universityName}</h3>
            <p className={"courses-saved-text"}>{coursesSaved} Courses Saved</p>
        </div>
    );
}
//<img src={"/UTS.jpg"} alt="University Photo" />;
export default SavedUniversity;