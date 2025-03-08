import {
    Box,
    Button,
    Card,
    CardHeader,
    Heading,
    Text,
    useColorModeValue,
    Spinner,
    VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const fetchPostDetails = async (id: number) => {
    const { data } = await axios.get(
        `https://json-placeholder.mock.beeceptor.com/posts/${id}`
    );
    return data;
};

const fetchComment = async (commentId: number) => {
    const { data } = await axios.get(
        `https://json-placeholder.mock.beeceptor.com/comments/${commentId}`
    );
    return data;
};

const PostDetails = () => {
    const { post_id } = useParams<{ post_id: string }>();
    const navigate = useNavigate();
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);

    const {
        data: postDetails,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["postDetail", post_id],
        queryFn: () => fetchPostDetails(Number(post_id)),
    });

    const {
        data: comment, 
        isLoading: isCommentLoading,
        isError: isCommentError,
    } = useQuery({
        queryKey: ["comment", post_id],
        queryFn: () => fetchComment(Number(post_id)), 
        enabled: isCommentsVisible, 
    });

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Spinner size="lg" color="blue.500" />
            </Box>
        );
    }

    if (isError || !postDetails) {
        return (
            <Box textAlign="center" mt={10}>
                <Text fontSize="xl" color="red.500">
                    Failed to fetch post details.
                </Text>
            </Box>
        );
    }

    return (
        <Box>
            <Button
                onClick={() => navigate("/posts")}
                position="absolute"
                top={4}
                left={4}
                mb={4}
                colorScheme="blue"
                variant="solid"
                shadow="sm"
            >
                Back
            </Button>

            <Card
                mt={12}
                mx="auto"
                maxW="lg"
                p={8}
                borderRadius="lg"
                shadow="xl"
                bg={useColorModeValue("white", "gray.800")}
            >
                <CardHeader textAlign="center">
                    <Heading size="lg">{postDetails.title}</Heading>
                    <Text fontSize="md" color="gray.500" mt={2}>
                        {postDetails.body}
                    </Text>
                </CardHeader>
            </Card>

            <Box textAlign="center" mt={6}>
                <Button
                    colorScheme="teal"
                    onClick={() => setIsCommentsVisible((prev) => !prev)}
                >
                    {isCommentsVisible ? "Hide Comment" : "Show Comment"}
                </Button>

                {isCommentsVisible && (
                    <>
                        {isCommentLoading ? (
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Spinner size="lg" color="blue.500" />
                            </Box>
                        ) : isCommentError ? (
                            <Text fontSize="xl" color="red.500" mt={4}>
                                Failed to load comment.
                            </Text>
                        ) : comment ? (
                            <VStack mt={4} spacing={4}>
                                <Box
                                    key={comment.id}
                                    border="1px"
                                    borderColor="gray.200"
                                    p={4}
                                    borderRadius="md"
                                    boxShadow="sm"
                                    w="full"
                                >
                                    <Text fontWeight="bold">{comment.name}</Text>
                                    <Text>{comment.body}</Text>
                                </Box>
                            </VStack>
                        ) : (
                            <Text fontSize="xl" color="red.500" mt={4}>
                                No comment found.
                            </Text>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default PostDetails;
