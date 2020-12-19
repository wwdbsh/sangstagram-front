import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { ADD_COMMENT, TOGGLE_LIKE } from "./PostQueries";
import { useMutation } from "react-apollo-hooks";
// import { useQuery } from "react-apollo-hooks";
// import { ME } from "../../SharedQueries";
import { toast } from "react-toastify";

const PostContainer = ({
    id, 
    user, 
    files, 
    likeCount, 
    isLiked, 
    comments, 
    createdAt,
    caption,
    location
}) => {
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const comment = useInput("");
    // const { data:meQuery } = useQuery(ME);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables:{ postId:id }
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables:{ postId:id, text:comment.value }
    });
    const slide = () => {
        const totalFiles = files.length;
        if(currentItem === totalFiles-1){
            setTimeout(() => setCurrentItem(0), 3000);
        }else{
            setTimeout(() => setCurrentItem(currentItem+1), 3000);
        }
    };
    useEffect(() => {
        slide();
    }, [currentItem]);
    const toggleLike = () => {
        toggleLikeMutation();
        if(isLikedS === true){
            setIsLiked(false);
            setLikeCount(likeCountS-1);
        }else{
            setIsLiked(true);
            setLikeCount(likeCountS+1);
        }
    };
    const onKeyPress = async (event) => {
        const { which } = event;
        if(which === 13){
            event.preventDefault();
            comment.setValue("");
            try{ // solution for waiting api response(much safer)
                setSpinner(true);
                const {data:{addComment}} = await addCommentMutation();
                setSpinner(false);
                setSelfComments([...selfComments, addComment]);
            }catch{
                toast.error("Can't send comment");
            }
            
            // solution for natural ui response(using fake data, applying to ui much faster and more natural, but not safe) 
            // addCommentMutation();
            // setSelfComments([
            //     ...selfComments,
            //     {
            //         id:Math.floor(Math.random()*100),
            //         text:comment.value,
            //         user:{username:meQuery.me.username}
            //     }
            // ]);
        }
    };
    const convertTime = (t) => {
        return t.split("T")[0]
    };
    return (
        <PostPresenter 
            user={user}
            files={files}
            likeCount={likeCountS}
            location={location}
            caption={caption}
            isLiked={isLikedS}
            comments={comments}
            createdAt={convertTime(createdAt)}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            currentItem={currentItem}
            toggleLike={toggleLike}
            onKeyPress={onKeyPress}
            selfComments={selfComments}
            spinner={spinner}
        />
    );
};

PostContainer.propTypes = {
    id:PropTypes.string.isRequired,
    user:PropTypes.shape({
        id:PropTypes.string.isRequired,
        avatar:PropTypes.string,
        username:PropTypes.string.isRequired
    }).isRequired,
    files:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.string.isRequired,
            url:PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount:PropTypes.number.isRequired,
    isLiked:PropTypes.bool.isRequired,
    comments:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.string.isRequired,
            text:PropTypes.string.isRequired,
            user:PropTypes.shape({
                id:PropTypes.string.isRequired,
                username:PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    caption:PropTypes.string.isRequired,
    location:PropTypes.string,
    createdAt:PropTypes.string.isRequired,
};

export default PostContainer;