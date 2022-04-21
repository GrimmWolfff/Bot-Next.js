import { Box, Flex, Image, Text } from "@chakra-ui/react"

const TextMsg = ({ id, sender, text }) => {
    return (
        <Box styles={{'width':'100%'}} marginRight="5%" key={id}>
            {
            sender.toLowerCase() !== 'me' ? (
                <Flex w="100%" m="3" p="1" flexDirection="row" alignItems="flex-start">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4b/KakhaBendukidze.jpg" 
                    w="50" 
                    h="50"
                    borderRadius='100%'
                    />
                    
                    <Box border="1px solid gray" borderRadius="0.2em"
                    minW="4rem"
                    maxW="20rem"
                    m="1"
                    textAlign="right"
                    p="3"
                    bgColor="#f1f1f1"
                    color="#111111"
                    border="none"
                    fontWeight="bold"
                    borderTopLeftRadius="1rem"
                    borderBottomRightRadius="1rem"
                    borderTopRightRadius="1rem"                    
                    >{text}</Box>
                </Flex>
            ) : (
                <Box float="right">
                    <Text 
                    minW="4rem"
                    maxW="20rem"
                    m="1"
                    textAlign="right"
                    p="3"
                    bgColor="#f1f1f1"
                    color="#111111"
                    border="none"
                    fontWeight="bold"
                    borderTopLeftRadius="1rem"
                    borderBottomLeftRadius="1rem"
                    borderTopRightRadius="1rem"
                    >{text}</Text>
                </Box>
            )
            }
        </Box>
    )
}


export default TextMsg;