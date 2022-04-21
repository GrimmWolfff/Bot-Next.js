import React, { useState, useRef } from 'react';

import { Box, Container, Flex, Heading, Image} from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import TextMsg from './components/Text';

import { db } from '../firebase.js';

import { collection, getDocs } from 'firebase/firestore';

export default function Chatbot({ }) {
    const [MsgData, setMsgData] = useState([])
    const [BotResponse, setBotResponse] = useState('');
    const [UserText, setUserText] = useState('')
    const [IsTyping, setIsTyping] = useState(false);
    const Chat = useRef();
    const [LOGICDATA, SETLOGICDATA] = useState([]);

    const logicsCollectionRef = collection(db, 'logics');

    React.useEffect(async () => {
        const getLogics = async () => {
            const data = await getDocs(logicsCollectionRef);
            SETLOGICDATA(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        }    
        Chat.current.scrollTo(0, Chat.current.scrollHeight)
        await getLogics();
    }, []);
    const handleInput = e => setUserText(e.target.value)

    const handleLogic = (input) => {
        LOGICDATA.map(logic => {
            if(logic.req.includes(input)) {
                setBotResponse(logic.res[Math.floor(Math.random() * logic.res.length)])
            }
        })
    }

    const handleEnter = e => {
        handleLogic(UserText)
        if(e.key == 'Enter'){
            e.target.value = ''
            handleSubmit();
        }
    }
    const handleSubmit = () => {
        setMsgData(MsgData => [...MsgData, { sender: 'Me', text: UserText }])
        setIsTyping(true)
        const timer = function () {
            setTimeout(() => {
                setMsgData(MsgData => [...MsgData, { sender: 'bot', text: BotResponse }])
                setIsTyping(false)
            }, 3000)}
        timer()
        setUserText('')
    }
    return (
        <Container styles={{"height":"90vh", "width": '100%', 'borderRadius':'20px'}} maxW="container.xl" bgColor="#009B77" p="3" >
            <Heading as="h1" color="#ffd03d" bgColor="#009B77" m="1" p="2" borderRadius="1em" height="8vh" textAlign="center">
            კახა ბენდუქიძე</Heading>
            <br />

            <Flex flexDirection="column" height="75vh" overflowX="hidden" overflowY="scroll"
            ref={Chat}>
                {                    
                    MsgData.map(msg => (<TextMsg key={msg.id} sender={msg.sender} text={msg.text} />))
                }
                <Flex flexDirection="row" display={IsTyping ? 'flex' : 'none'}>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4b/KakhaBendukidze.jpg" 
                        w="8" 
                        h="8"
                        borderRadius='100%'
                    />
                    <Button
                        isLoading
                        colorScheme="transparent"
                        w="6%"
                        bgColor="transparent"
                        loadingText='Typing...'
                        spinnerPlacement=''
                    />
                </Flex>
            </Flex>
            {/* Input */}
            <Box p="5" position='fixed' bottom='0' width='80%' left="10%"    
            color='#ffffff' fontWeight='bolder'>
                <Flex flexDirection="row" alignItems="center" justifyContent="center">
                    <Input 
                        variant="filled"
                        color="black"
                        focusBorderColor="black.400"
                        value={UserText}
                        placeholder="Message..."
                        fontWeight="500"
                        onChange={handleInput}
                        onKeyUp={handleEnter}
                    />
                    &nbsp;
                    <Button colorScheme="teal" onClick={() => handleSubmit()}>Send</Button>
                </Flex>
            </Box>
        </Container>
    )
}