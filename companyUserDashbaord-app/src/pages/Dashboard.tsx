import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Heading, Text, Spinner, SimpleGrid, Icon, Flex, Button, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, } from '@chakra-ui/react';
import { useAuthStore } from '../store/authStore';
import { FaUsers, FaBuilding, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Navbar from '../components/Navbar';

const fetchUsers = async () => {
    const response = await axios.get('https://json-placeholder.mock.beeceptor.com/users');
    return response.data.length;
};

const fetchCompanies = async () => {
    const response = await axios.get('https://json-placeholder.mock.beeceptor.com/companies');
    return response.data.length;
};

const fetchRoles = async () => {
    const response = await axios.get('https://json-placeholder.mock.beeceptor.com/roles');
    return response.data.length;
};

const Dashboard = () => {
    const username = useAuthStore((state) => state.username);

    const { data: totalUsers, isLoading: loadingUsers, isError: errorUsers } = useQuery({
        queryKey: ['totalUsers'],
        queryFn: fetchUsers,
    });

    const { data: totalCompanies, isLoading: loadingCompanies, isError: errorCompanies } = useQuery({
        queryKey: ['totalCompanies'],
        queryFn: fetchCompanies,
    });

    const { data: totalRoles, isLoading: loadingRoles, isError: errorRoles } = useQuery({
        queryKey: ['totalRoles'],
        queryFn: fetchRoles,
    });

    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)

    if (loadingUsers || loadingCompanies || loadingRoles) {
        return (
            <Flex justify="center" align="center" minH="100vh" bgGradient="linear(to-r, blue.50, purple.50)">
                <Spinner size="xl" color="blue.500" />
            </Flex>
        );
    }

    if (errorUsers || errorCompanies || errorRoles) {
        return (
            <Flex justify="center" align="center" minH="100vh" bgGradient="linear(to-r, red.50, yellow.50)">
                <Text fontSize="xl" color="red.500">Error fetching dashboard data.</Text>
            </Flex>
        );
    }

    return (
        <>
            <Navbar />
            <Button
                colorScheme='red'
                position="absolute"
                top={4}
                right={4}
                mb={4}
                onClick={onOpen}>
                Log Out
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You want to Log Out?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                onClose();
                                navigate('/');
                            }} ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Box
                p={10}
                bgGradient="linear(to-r, blue.50, purple.50)"
                minH="100vh"
            >
                <Box maxW="1200px" mx="auto" textAlign="center">
                    <Heading mb={2} size="2xl" color="gray.700">
                        Welcome, {username}
                    </Heading>
                    <Text fontSize="lg" mb={8} color="gray.500">
                        Here's your overview
                    </Text>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                        <div onClick={() => { navigate('/users') }}>
                            <StatCard
                                icon={FaUsers}
                                title="Total Users"
                                value={totalUsers}
                                color="blue.500"

                            />
                        </div>
                        <div onClick={() => { navigate('/companies') }}>
                            <StatCard
                                icon={FaBuilding}
                                title="Total Companies"
                                value={totalCompanies}
                                color="green.500"
                            />
                        </div>
                        <StatCard
                            icon={FaUserShield}
                            title="Total Roles"
                            value={totalRoles}
                            color="purple.500"
                        />
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
};

const StatCard = ({ icon, title, value, color }: { icon: any, title: string, value: number, color: string }) => (
    <Box
        p={6}
        bg="white"
        rounded="2xl"
        boxShadow="xl"
        _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
        transition="all 0.3s ease"
        textAlign="center"
    >
        <Icon as={icon} w={12} h={12} color={color} mb={4} />
        <Text fontSize="2xl" fontWeight="semibold" color="gray.700">
            {title}
        </Text>
        <Text fontSize="4xl" fontWeight="bold" color={color}>
            {value}
        </Text>
    </Box>
);

export default Dashboard;
