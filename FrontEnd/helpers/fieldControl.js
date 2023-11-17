
export function suppressSpecialChar (value) {
    /**
     * @function
     * @description Suppress special char and useless space at the beginning and the end
     * @param {string} string to clean
     * @return {string} string cleaned
     */
    const valueToClean = value

    if (typeof valueToClean === 'number') {
        const valueClean = valueToClean
        return valueClean
    }
    const valueClean = valueToClean.replace(/\<|\>|\?|\$|\&|\"|\!|\|\=/g, "").trim()

    return valueClean
}

