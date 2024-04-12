export const prepareUserData = (userData: any) => {
    if (userData) {
        return {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            isActive: userData.isActive,
            aboutMe: userData.aboutMe,
            role: userData.role,
        };
    } else {
        return null
    }
}