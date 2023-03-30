export async function fetchAndParse(input, init) {
    const response = await fetch(input, init);
    if (response.status !== 200) {
        throw {
            status: response.status,
            data: await response.json()
        };
    }
    return response.json();
}

export const headers = {

};

