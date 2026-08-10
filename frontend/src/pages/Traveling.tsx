import { useState } from "react";
import { type StoryProps } from "../data/StoryProps"
import '../styles/Traveling.css'

import { AUTHOR } from "../data/constants";


import UploadStories from "../components/UploadStories";


//const stories = travelStories as StoryProps[];



function TravelingCard({
    stories,
    onEdit,
    onDelete
}: {
    stories: StoryProps;
    onEdit: (story: StoryProps) => void;
    onDelete: (id: string) => void;
}) {
    const[showMore, setShowMore] = useState(false);
    const formattedDate = new Date(stories.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    
        
    const [activeStory, setActiveStory] = useState<string | null>(null);
    
    return (
        <>
        <div className="story-card" >
            <div className="StoryTitle" onClick={() => {
            setShowMore(!showMore)
            setActiveStory(stories.title)}}>
            <h3>{stories.title}</h3>
            </div>
            <div className="story-card-edit-date">
                {AUTHOR.isAuthenticated &&
                <div className="story-card-author-edits">
                    <button type="button" onClick={() => onEdit(stories)}><img src="./src/assets/edit.png" alt="edit" /></button>
                    <button type="button" onClick={() => onDelete(stories._id)}><img src="./src/assets/delete.png" alt="delete" /></button>
                </div>}
            <p className="date">{formattedDate}</p>
            </div>
            {showMore &&(
            <div className="travel-card-popOut">
                <h2>{stories.title}</h2>
                <p>{stories.description}</p>
                
               <div className="travel-card-popOut-images">{stories.image.map((src, i) => {
                    return  <img src={`http://localhost:3000${src}`} key={i}/>
                })}</div>
                <button onClick={() => {setShowMore(!showMore)
                    setActiveStory(null)
                }}>Back</button>
            </div>
        )}

        </div>
        
        </> 
    )
}

export default function Traveling({ travels }: { travels: StoryProps[] }){
    const [uploadForm, setUploadForm] = useState(false);
    const [editingStory, setEditingStory] = useState<StoryProps | null>(null);
    const [stories, setStories] = useState<StoryProps[]>(travels);
    const handleEdit = (story: StoryProps) => {
        setEditingStory(story);
        setUploadForm(false);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/travel/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete story");
            }

            // Remove the story from the frontend
            setStories((prevStories) =>
                prevStories.filter((story) => story._id !== id)
            );

        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div className="traveling-container">
            {travels.map((story) =>(
                <TravelingCard key={story._id}
                    stories={story}
                    onEdit={handleEdit}
                    onDelete={handleDelete} />
            ))}
            {AUTHOR.isAuthenticated &&
                <div className="upload">
                    <button onClick={() => {
                        setUploadForm(!uploadForm); 
                        setEditingStory(null);}}><img src="./src/assets/plus.png" /></button>
                </div>
            }
            
            {(editingStory || uploadForm) && (
                <div className="upload-container">
                    <button onClick={() => {setUploadForm(!uploadForm)}}><img src="./src/assets/closeX.png" alt="close"/></button>
                    <UploadStories 
                        storyToEdit={editingStory}
                        onClose={() => setEditingStory(null)}
                        onUpdated={(updatedStory) => {
                            setStories((prev) =>
                                prev.map((story) =>
                                    story._id === updatedStory._id
                                        ? updatedStory
                                        : story
                                )
                            );

                            setEditingStory(null);
                            setUploadForm(false);
                        }}

                    />
                </div>
            )}
        </div>
    )
}