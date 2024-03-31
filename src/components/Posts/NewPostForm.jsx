import { Flex, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiPoll } from "react-icons/bi"
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import { AiFillCloseCircle } from "react-icons/ai"
import TabItem from './TabItem'
import TextInputs from './TextInputs'
import ImageUpload from './ImageUpload/ImageUpload'
import axios from 'axios'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import usePostaddapi from '../../store/Authentication/postaddapi'
import PostItemsB from './PostItemsB'





//http://localhost:3000/communitypage/65858ff0b3b4cd6b7f5fe158
// http://localhost:3000/community/submit/

const formTabs = [
    {
        title: 'Post',
        icon: IoDocumentText
    },
    {
        title: 'Images & Video',
        icon: IoImageOutline
    },
    {
        title: 'Link',
        icon: BsLink45Deg
    },
    {
        title: 'Poll',
        icon: BiPoll
    },
    {
        title: 'Talk',
        icon: BsMic
    }

];
function NewPostForm({ userId }) {


    const { colorMode } = useColorMode();

    ///This is coming from community edit 
    const location = useLocation();
    const [fileImage, setFileImage] = useState();





    console.log(location);

    let send;
    let editedValue;
    let channelID;
    let editHome;



    function onSelectImage(event) {


        //Doing some different part getting file

        const selectedFile = event.target.files[0];
        setFileImage(selectedFile);
        console.log(selectedFile);


        //
        const reader = new FileReader();

        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result)
            }
        }
        //Image would be selected here 
    }


    //This I am writing to confirm whether its coming from edited place or not
    if (location.state !== null) {
        send = (location.state.send === 'sendToHome') ? "/" : "PostItemsB";
        editedValue = location.state.x;
        channelID = location.state.userId
        editHome = location.state.editHome;
    }

    console.log(channelID);
    console.log(editedValue);
    console.log(send);
    console.log(editHome);

    //This is the end of the community


    ///Key Points 

    // if userId === commmunityDirecting rahega and editedValue rahegi to wo update ke liye use kiya hu or use update post wala api run hoga 
    // or dusra agar userid === homeredirectiing hai to fir mai sidha usko home redirect karaunga 




    const { postaddapi, setPostAddApi } = usePostaddapi();
    const userName = JSON.parse(sessionStorage.getItem("userName"));



    console.log(userId);

    const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
    const [textInputs, setTextInput] = useState(
        {
            title: "",
            body: "",
            ...(userId === "Community Redirecting" ? { channel: channelID } : { channel: "65903e4eb076aef40a863d69" })
        }
    )

    const [selectedFile, setSelectedFile] = useState(<String>()</String>)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formData = new FormData();



    // This is for new creation of the post 
    async function handleCreatePost() {
        try {
            console.log(formData);
            console.log("hello");
            const token = JSON.parse(sessionStorage.getItem("userToken"))


            console.log(fileImage);

            formData.append("title", textInputs.title);
            formData.append("content", textInputs.body);
            formData.append("images", fileImage);

            console.log(formData);
            textInputs.channel && formData.append("channel", textInputs.channel)
            const response = await axios.post(`https://academics.newtonschool.co/api/v1/reddit/post`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                }

            )
            console.log(response);
            const send = response.data.data._id;
            console.log(send);
            // if (userId) {
            //     navigate(`../communitypage/${userId}`, { state: { send } })
            // }
            if (userId === "Community Redirecting") {
                getPostRandom();
            }
            else if (userId === "Direct Redirecting") {
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }


    // This is for the updated creation of the post
    async function handleUpdatePost() {
        try {
            console.log("hello");
            console.log(editedValue);
            const token = JSON.parse(sessionStorage.getItem("userToken"))

            const formData = new FormData();
            formData.append("title", textInputs.title);
            formData.append("content", textInputs.body);
            formData.append("images", fileImage);


            // formData.append("images", selectedFile);
            // textInputs.channel && formData.append("channel", textInputs.channel)
            const response = await axios.patch(`https://academics.newtonschool.co/api/v1/reddit/post/${editedValue}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                }

            )
            if (editHome) {
                navigate("/")
            } else {
                getPostRandom()

            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    //These are very very important function and this is the track we have to take care of 

    async function getPostRandom() {

        try {
            console.log("hello");
            const token = JSON.parse(sessionStorage.getItem("userToken"))

            console.log(token);
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/post?limit=20`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                }
            )
            console.log("this is the response of post", response.data.data);


            pushBackCommunity(response.data.data);
        } catch (error) {
            setLoading(false)
            console.log(error);
        }

    }
    // This is putting things in the community very very important

    async function pushBackCommunity(result) {
        try {
            const answer = await result;
            console.log(answer);
            console.log("hello");

            const filterd = answer.filter((details) => {
                if (details.author.name === userName && details.channel) {
                    return details.channel;
                }
            })

            console.log(filterd);

            setPostAddApi(filterd);
            if (filterd) {
                if (userId) {
                    navigate(`../communitypage/${channelID}`)

                } else {
                    navigate(`../communitypage/${channelID}`)
                }
            }
            console.log(postaddapi);
        } catch (error) {
            console.log(error);
        }
    }

    ///This is the end of the contrast 



    function onTextChange(event) {
        //Text change or content manipulation and things would be done here 
        const { name } = event.target;
        const { value } = event.target;
        setTextInput((prev) => (
            {
                ...prev,
                [name]: value,
            }
        ))
    }

    return (
        <Flex direction="column"
            bg={colorMode === "dark" ? "#161617" : "white"}
            borderRadius={4}
            mt={2}>
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItem item={item} selected={item.title === selectedTab} setSelectedTab={setSelectedTab} />
                ))}
            </Flex>

            <Flex p={4}>

                {selectedTab === "Post" && (
                    <TextInputs
                        textInputs={textInputs}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        handleUpdatePost={handleUpdatePost}
                        send={send}
                        editedValue={editedValue}
                        userId={userId}
                        loading={loading} />
                )}
                {selectedTab === "Images & Video" && <ImageUpload
                    selectedFile={selectedFile}
                    onSelectImage={onSelectImage}
                    setSelectedTab={setSelectedTab}
                    setSelectedFile={setSelectedFile} />}
            </Flex>
        </Flex>
    )
}

export default NewPostForm
