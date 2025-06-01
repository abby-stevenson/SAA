import './savedUniversity.css';
import Popup from 'reactjs-popup';
import PlanPopup from "../planPopup/planPopup";
import {useState} from "react";

interface UniversityInfo {
    universityName: string;
    coursesSaved: number;
    loc: string;
}

function SavedUniversity({ loc, universityName, coursesSaved }: UniversityInfo) {
    const urlPath = universityName.replace(/ /g, "") + ".png"
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popup trigger = {
            <div className={"saved-university-card"} onClick={() => setIsOpen(true)}>
                <img className={"circle-crop"} src={urlPath} alt="University Photo" />
                <h3 className={"university-header"}>{universityName}</h3>
                <div className="location-container">
                    <img src="Leading icon.png" />
                    <span>{loc}</span>
                </div>
                <p className={"courses-saved-text"}>{coursesSaved} Courses Saved</p>
            </div>}>

            <PlanPopup
                credits={20}
                universityName="Example University"
                savedCourses={[
                    {
                        courseName: "Object Oriented Design",
                        creditAmount: "4",
                        location: "yes",
                        nuCourse: "so true",
                        uniName: "uni"
                    },

                    {
                        courseName: "Object Oriented Programming",
                        creditAmount: "4",
                        location: "yes",
                        nuCourse: "so true",
                        uniName: "uni"
                    },
                    {
                        courseName: "Algo",
                        creditAmount: "4",
                        location: "yes",
                        nuCourse: "so true",
                        uniName: "uni"
                    }
                ]}
            />
            <button>Click here</button>
        </Popup>


    );
}
//<img src={"/UTS.jpg"} alt="University Photo" />;
export default SavedUniversity;