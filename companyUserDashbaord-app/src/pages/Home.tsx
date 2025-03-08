import { useNavigate } from 'react-router-dom'
import { Button, Box, Heading } from '@chakra-ui/react'

const Home = () => {
    const navigation = useNavigate();

    const handOnClick = () => {
        navigation('/login');
    }

    return (
        <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgGradient="linear(to-br, blue.100, blue.300)">
            <Heading as="h1" size="2xl" color="gray.800" mb={8}>
                Welcome to the Home Page
            </Heading>
            <Button
                onClick={handOnClick}
                colorScheme="blue"
                size="lg"
                variant="solid"
                rounded="xl"
                shadow="md"
                _hover={{ bg: 'blue.700' }}
            >
                Login
            </Button>
        </Box>
    )
}

export default Home
