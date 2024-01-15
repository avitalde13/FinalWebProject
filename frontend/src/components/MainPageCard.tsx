import { Flex, Image, Box, Text, Button } from '@chakra-ui/react';

interface Props {
    imageUrl: string;
    purpose: string;
    title1: string;
    title2: string;

}
const MainPageCard = (props: Props) => {
    return (
        <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
            <Image src={props.imageUrl} width={500} height={300} alt="banner"></Image>
            <Box>
                <Text>{props.purpose}</Text>
                <Text>{props.title1}</Text>
                <Text>{props.title2}</Text>
            </Box>
        </Flex>
    )
}

export default MainPageCard;