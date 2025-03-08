import { Box, Heading, Text, FormControl, FormLabel, Input, FormErrorMessage, Button, Link, } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordSchema } from "./ForgotPasswordSchema";
import toast from "react-hot-toast";

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        toast.success("Password changed successfully");
        navigate('/');
    };


    return (
        <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
            <Box w="full" maxW="md" p={8} bg="white" rounded="2xl" shadow="lg">
                <Heading mb={4} textAlign="center">
                    Reset Password
                </Heading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl mb={5} isInvalid={!!errors.password} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl mb={5} isInvalid={!!errors.confirmPassword} isRequired>

                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Enter your password"
                            {...register("confirmPassword")}
                        />
                        <FormErrorMessage>
                            {errors.confirmPassword && errors.confirmPassword.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="blue"
                        width="full"
                        isLoading={isSubmitting}
                    >
                        Set Password
                    </Button>

                    <Text mt={4} textAlign="center">
                        <Link color="blue.500" onClick={() => navigate("/")}>
                            Back to Login
                        </Link>
                    </Text>
                </form>
            </Box>
        </Box>
    );
}
