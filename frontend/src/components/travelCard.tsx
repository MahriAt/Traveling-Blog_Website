import {type StoryProps } from "../data/StoryProps"
export default function travelCard({ image}: StoryProps){
    return (
        <div className="marquee-card">
            <img src={`http://localhost:3000${image[0]}`} alt="image" />
            
            
        </div>
    )
}