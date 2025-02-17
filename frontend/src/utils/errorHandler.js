export const handleApiError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        return {
            message: error.response.data.error || 'An error occurred',
            status: error.response.status
        };
    } else if (error.request) {
        // The request was made but no response was received
        return {
            message: 'No response from server',
            status: 503
        };
    } else {
        // Something happened in setting up the request
        return {
            message: 'Request setup error',
            status: 500
        };
    }
};

export const displayError = (error, setError) => {
    const { message, status } = handleApiError(error);
    setError(`${message} (Status: ${status})`);
}; 