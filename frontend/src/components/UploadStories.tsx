import { useState } from "react";
import { type StoryProps } from "../data/StoryProps"

interface UploadStoriesProps {
    storyToEdit?: StoryProps | null;
    onClose: () => void;
    onUpdated: (updatedStory: StoryProps) => void;
}

export default function UploadStories({storyToEdit, onClose, onUpdated}: UploadStoriesProps){
    const [storyData, setStoryData] = useState({
        title: storyToEdit?.title ?? "",
        country: storyToEdit?.country ?? "",
        date: storyToEdit?.date
            ? storyToEdit.date.substring(0, 10)
            : "",
        description: storyToEdit?.description ?? ""
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [files, setFiles] = useState<File[] | null>(null);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setStoryData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    console.log("Selected file:", files);
    

    try {
        const formData = new FormData(); 
        formData.append("title", storyData.title); 
        formData.append("country", storyData.country); 
        formData.append("date", storyData.date); 
        formData.append("description", storyData.description); 
        console.log("FormData:");
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        files?.forEach((file) => { formData.append("image", file); });

        const url = storyToEdit
            ? `http://localhost:3000/api/travel/${storyToEdit._id}`
            : "http://localhost:3000/api/travel";

        const response = await fetch(url, {
            method: storyToEdit ? "PATCH" : "POST",
            body: formData
        });
        const responseText = await response.text();
        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Backend response:", responseText);

        if (!response.ok) {
            throw new Error(responseText || "Failed to send");
        }
        if (storyToEdit) {
            onUpdated(data.updatedTravel);
        }
        onClose();

        setStatus("sent");
        setStoryData({ title: '', country: '', date: '',description: '' });
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };
    return(
        <div className="upload-story-form">
            <form className="upload-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={storyData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Country"
                    value={storyData.country}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    value={storyData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Story</label>
                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    placeholder="Your Story"
                    value={storyData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="image">Upload Image</label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        if (e.target.files) {
                            setFiles(Array.from(e.target.files));
                        }
                    }}
                />
            </div>

            <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Submit"}
            </button>

            {status === "sent" && <p className="form-success">Message sent!</p>}
            {status === "error" && <p className="form-error">Something went wrong. Try again.</p>}
        </form>
        </div>
    )
}