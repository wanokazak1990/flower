export const useUserName = (name) => {
    const shortName = name.split(' ');
    return shortName[0];
}
