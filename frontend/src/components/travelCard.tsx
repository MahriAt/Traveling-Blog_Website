import {type StoryProps } from "../data/StoryProps"
export default function travelCard({ image}: StoryProps){
    return (
        <div className="marquee-card">
            <img src={image[0]} alt="image" />
            
            
        </div>
    )
}