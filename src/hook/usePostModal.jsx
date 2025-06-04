/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";

// const usePostModal = (initialContent = "") => {
//     const [content, setContent] = useState(initialContent);
//     const [showPicker, setShowPicker] = useState(false);
//     const [isDisabled, setDisable] = useState(false);
//     const [imagePosts, setImagePosts] = useState([]);
//     const [firstTimeAddImage, setFirstTimeAddImage] = useState(false);    const textareaRef = useRef(null);

//     const autoResize = () => {
//         const textarea = textareaRef.current;
//         if (textarea) {
//             textarea.style.height = "auto";
//             textarea.style.height = textarea.scrollHeight + "px";
//         }
//     };

//     useEffect(() => {
//         setDisable(content.trim() === "");
//     }, [content]);

//     const handleEmojiClick = (emojiData) => {
//         setContent((prevContent) => prevContent + emojiData.emoji);
//         setShowPicker(false);
//     };

//     const handleTextareaChange = (e) => {
//         setContent(e.target.value);
//         autoResize();
//     };

//     return {
//         content,
//         setContent,
//         showPicker,
//         setShowPicker,
//         isDisabled,
//         setDisable,
//         textareaRef,
//         autoResize,
//         handleEmojiClick,
//         handleTextareaChange,
//         imagePosts,
//         setImagePosts,
//         firstTimeAddImage,
//         setFirstTimeAddImage
//     };
// };

// export default usePostModal;



const usePostContent = (initialContent = "") => {
    const [content, setContent] = useState(initialContent);
    const [showPicker, setShowPicker] = useState(false);
    const [isDisabled, setDisable] = useState(false);
    const textareaRef = useRef(null);

    const autoResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    };

    useEffect(() => {
        setDisable(content.trim() === "");
    }, [content]);

    const handleEmojiClick = (emojiData) => {
        setContent((prev) => prev + emojiData.emoji);
        setShowPicker(false);
    };

    const handleTextareaChange = (e) => {
        setContent(e.target.value);
        autoResize();
    };

    return {
        content,
        setContent,
        showPicker,
        setShowPicker,
        isDisabled, setDisable,
        textareaRef,
        autoResize,
        handleEmojiClick,
        handleTextareaChange,
    };
};


const usePostImages = (initialImages = []) => {
    const [imagePosts, setImagePosts] = useState(initialImages);
    const [firstTimeAddImage, setFirstTimeAddImage] = useState(false);


    useEffect(() => {
        // หาก initialImages เปลี่ยน จะอัปเดต imagePosts และ firstTimeAddImage ด้วย
        setImagePosts(initialImages);
        setFirstTimeAddImage(initialImages.length === 0);
    }, [])
    const handleImageUrlChange = (index, url) => {
        const updated = [...imagePosts];
        updated[index] = url;
        setImagePosts(updated);
    };

    const handleImageClick = (index) => {
        const updated = [...imagePosts];
        updated[index] = ""; // แก้กลับให้กรอกใหม่
        setImagePosts(updated);
    };

    const deleteImage = (index) => {
        const updated = [...imagePosts];
        updated.splice(index, 1);
        setImagePosts(updated);

        if (updated.length === 0) {
            setFirstTimeAddImage((prev) => !prev);
        }
    };

    return {
        imagePosts,
        setImagePosts,
        firstTimeAddImage,
        setFirstTimeAddImage,
        handleImageUrlChange,
        handleImageClick,
        deleteImage,
    };
};



export { usePostContent, usePostImages };
